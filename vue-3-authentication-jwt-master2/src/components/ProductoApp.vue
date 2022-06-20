<template>
<div>
<div style="margin: 0 auto; width: 100%"  v-if="currentUser.authorities[0].authority != 'ROLE_ADMIN'">
  <DataTable :value="productos" v-model:expandedRows="expandedRows" dataKey="id" @row-expand="onRowExpand" @row-collapse="onRowCollapse" :paginator="true" :rows="5" 
  :globalFilterFields="['nombre']" v-model:filters="filters" filterDisplay="menu">
                    <template #header>
                        <div class="table-header-container">
                            <Button icon="pi pi-plus" label="Expandir todo" @click="expandAll" class="mr-2" />
                            <Button icon="pi pi-minus" label="Encoger todo" @click="collapseAll" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscador"/>
                            </span>
                        </div>
                    </template>
                     <Column :expander="true" headerStyle="width: 3rem"></Column>
                     <Column header="Producto">
                         <template #body="slotProps">
                            <div v-if="slotProps.data.imagen != null">
                            <img :src="require('../assets/' + slotProps.data.imagen + '.jpg')" :alt="slotProps.data.image" class="product-image" style="width: 10rem;" />
                            </div>
                        </template>
                    </Column>
                    <Column field="nombre" header="Nombre" sortable></Column>
                    <Column field="precio" header="Precio" sortable>
                        <template #body="slotProps">
                            {{formatCurrency(slotProps.data.precio)}}
                        </template>
                    </Column>
                  
                    <Column field="cantidad" header="Cantidad" sortable>
                        <template #body="slotProps">
                            <span>{{this.setStock(slotProps.data.cantidad)}}</span>
                        </template>
                    </Column>
                    <Column field="nombreCategoria" header="Categoria" sortable></Column>
                    <Column  style="min-width:8rem">
                        <template #body="slotProps">
                        <button
                        :disabled="slotProps.data.carro || slotProps.data.cantidad<1"
                        @click="addProducto(slotProps.data)"
                        href="#"
                        class="btn btn-block"
                        :class="{
                            'btn-primary': !slotProps.data.carro,
                            'btn-success': slotProps.data.carro,
                        }"
                        >
                          {{ !slotProps.data.carro ? "Añadir" : "Añadido" }}
                         </button>
                        </template> 
                    </Column>
                    <template #expansion="slotProps">
                        <div class="orders-subtable">
                            <h5>{{slotProps.data.descripcion}}</h5>
                        </div>
                    </template>
                </DataTable>

</div>

  <div style="margin: 0 auto; width: 100%" v-if="currentUser.authorities[0].authority == 'ROLE_ADMIN'">
  <div><CategoriaApp/></div>
  
    <Panel header="PRODUCTOS" >
      <Menubar :model="items" />
      <br />
      <DataTable :value="productos" :paginator="true" :rows="8" :globalFilterFields="['nombre']" v-model:filters="filters" filterDisplay="menu">
      
       <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscador"/>
                            </span>
                        </div>
        </template>
        <Column field="nombre" header="Nombre" sortable></Column>
        <Column field="precio" header="Precio" sortable>
          <template #body="slotProps">
            {{formatCurrency(slotProps.data.precio)}}
          </template>
        </Column>
        <Column field="cantidad" header="Cantidad" sortable></Column>
        <Column field="descripcion" header="Descripcion"></Column>
        <Column field="nombreCategoria" header="Categoria" sortable></Column>

        
        <Column  style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-fw pi-pencil" class="p-button-rounded  mr-2" @click="editProducto(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>
      </DataTable>
    </Panel>

    <Dialog :visible="displayModal" :style="{width: '450px'}" header="Detalles del Producto" :modal="true" class="p-fluid">
<!-- <img :src="'demo/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
      <div class="field">
          <label for="nombre">Nombre</label>
          <InputText id="nombre" v-model.trim="producto.nombre" required="true" autofocus :class="{'p-invalid': submitted && !producto.nombre}" />
          <small class="p-error" v-if="submitted && !producto.nombre">El nombre es obligatorio.</small>
      </div>
      <div class="field">
          <label for="descripcion">Descripcion</label>
          <Textarea id="descripcion" v-model="producto.descripcion" required="true" rows="3" cols="20" />
      </div>

      <div class="field">
          <label class="mb-3">Categorias</label>
            <div class="formgrid grid">
              <Dropdown v-model="producto.nombreCategoria" :options="nombreCategorias" placeholder="Selecciona Categoria" />
            </div>
      </div>
      
      <div class="field">
          <label for="precio">Precio</label>
              <InputNumber id="precio" v-model="producto.precio" mode="currency" currency="EUR" locale="de-DE" />
      </div>

      <div class="field">
          <label for="cantidad">Cantidad</label>
              <InputNumber id="cantidad" v-model="producto.cantidad" integeronly />
      </div>

      <div class="field">
          <label for="imagen">Imagen</label>
          <InputText id="imagen" v-model.trim="producto.imagen" />
      </div>
        
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarProducto(this.producto)" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeModal"/>     
      </template>
    </Dialog>


    <Dialog :visible="displayModalDelete" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="producto">¿Quieres borrar el producto  <b>{{producto.nombre}}</b>?</span>
        </div>
          <template #footer>
            <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteProducto(this.producto)" />
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="displayModalDelete = false"/>
          </template>
    </Dialog>
   
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import CategoriaApp from './CategoriaApp.vue'

export default {
  name: "ProductoApp",
  components: {
    CategoriaApp
  },
  data() {
    return {
      expandedRows: [],
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]}
      },
      producto: {
        id: null,
        nombre: null,
        precio: null,
        cantidad: null,
        descripcion: null,
        imagen: null,
        activo: null,
        carro: null,
        idCategoria: null,
        idOferta: null
      },
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          }
        },
        {
          label: "Refrescar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            window.location.reload();
          }
        }
      ],
      items2: [
         {
          label: "Editar",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showSaveModalEdit();
          }
        },
        {
          label: "Eliminar",
          icon: "pi pi-fw pi-trash"
        }
      ],
      displayModal: false,
      displayModalDelete: false
    };
  },

  computed: {
    ...mapGetters([
      'productos', 'nombreCategorias'
    ]), 
      currentUser() {
      return this.$store.state.auth.user;
    }
  },

  created() {
    this.$store.dispatch('getProductos');
    this.$store.dispatch('getNombresCategorias');

  },
  mounted() {
    this.$store.dispatch('getProductos');
    this.$store.dispatch('getNombresCategorias');
  },
  methods: {
    showSaveModal() {
      this.displayModal = true;
    },
    ...mapActions(["saveProducto", "deleteProducto", "addProducto", "getNombresCategorias", "getCategoriaByNombre"]),
    editProducto(producto) {
      this.producto = {...producto};
      this.displayModal= true;
    },

    guardarProducto(producto){
      this.saveProducto(producto);
    },

    confirmDeleteProduct(producto) {
      this.producto = producto;
      this.displayModalDelete = true;
    },    

    closeModal() {
      this.producto = {
        id: null,
        nombre: null,
        precio: null,
        cantidad: null,
        descripcion: null,
        imagen: null,
        activo: null,
        idCategoria: null,
        idOferta: null
      };
      this.displayModal = false;
    },
    formatCurrency(value) {
            if(value)
				return value.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
			return;
    },
    onRowExpand() {
            //this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
        },
        onRowCollapse() {
            //this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
        },
    expandAll() {
            this.expandedRows = this.productos.filter(p => p.id);
    },
    collapseAll() {
            this.expandedRows = null;
    },
    setStock(value){
      if(value<1){
        return "AGOTADO";
      } else if(value<10){
        return "STOCK BAJO --> (" + value + ")";
      } else{
        return "EN STOCK";
      }
    }
  }
};
</script>



<style>

</style>