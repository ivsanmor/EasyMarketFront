<template>
<div>
  <div v-if="currentUser.authorities[0].authority == 'ROLE_ADMIN'">
       <Panel header="CATEGORÍAS" >
      <Menubar :model="items" />
      <br />
      <DataTable :value="categorias" :paginator="true" :rows="10">
        <Column field="nombre" header="Nombre" sortable></Column>
        
        <Column  style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-fw pi-pencil" class="p-button-rounded  mr-2" @click="editCategoria(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteCategoria(slotProps.data)" />
            </template>
        </Column>
      </DataTable>
    </Panel>

    <Dialog :visible="displayModal" :style="{width: '450px'}" header="Detalles de la Categoría" :modal="true" class="p-fluid">
<!-- <img :src="'demo/images/product/' + product.image" :alt="product.image" class="product-image" v-if="product.image" /> -->
      <div class="field">
          <label for="nombre">Nombre</label>
          <InputText id="nombre" v-model.trim="categoria.nombre" required="true" autofocus :class="{'p-invalid': submitted && !categoria.nombre}" />
          <small class="p-error" v-if="submitted && !categoria.nombre">El nombre es obligatorio.</small>
      </div>
     
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveCategoria(this.categoria)" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="closeModal"/>     
      </template>
    </Dialog>

    <!-- <Dialog header="Crear Categoria" :visible="displayModal2" :modal="true">
      <span class="p-float-label">
        <InputText id="nombre" type="text" v-model="categoria.nombre" style="width: 100%" />
        <label for="nombre">Nombre</label>
      </span>
      <br />
      <span class="p-float-label">
        <input id="precio" type="Number" v-model="categoria.precio" style="width: 100%" />
        <label for="precio">Precio</label>
      </span>
      <br />
      <span class="p-float-label">
        <input id="cantidad" type="Number" v-model="categoria.cantidad" style="width: 100%" />
        <label for="cantidad">Cantidad</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="descripcion" type="text" v-model="categoria.descripcion" style="width: 100%" />
        <label for="descripcion">Descripcion</label>
      </span>
      <br />
      <span class="p-float-label">
        <InputText id="imagen" type="text" v-model="categoria.imagen" style="width: 100%" />
        <label for="imagen">Imagen</label>
      </span>
      <br />
      <template #footer>
        <Button label="Guardar" icon="pi pi-check" @click="save" />
        <Button label="Cancelar" icon="pi pi-times" @click="closeModal" class="p-button-secondary" />
      </template>
    </Dialog> -->

      <Dialog :visible="displayModalDelete" :style="{width: '450px'}" header="Confirm" :modal="true">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="categoria">¿Quieres borrar la categoría  <b>{{categoria.nombre}}</b>?</span>
        </div>
          <template #footer>
            <Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteCategoria(this.categoria)" />
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="displayModalDelete = false"/>
          </template>
      </Dialog>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
export default {
  name: "CategoriaApp",
  data() {
    return {
      expandedRows: [],
      categoria: {
        id: null,
        nombre: null
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
      displayModal: false,
      displayModalDelete: false
    };
  },
 computed: {
    ...mapGetters([
      'categorias'
    ]), 
      currentUser() {
      return this.$store.state.auth.user;
    }
  },
  //categoriaService: null,
  created() {
    this.$store.dispatch('getCategorias');
    //this.categoriaService = new CategoriaService();
    //this.categoriaService = new CategoriaService();
  },
  mounted() {
    this.$store.dispatch('getCategorias');
    //this.getAll();
    //this.getAllCategorias();
  },

  methods: {
    showSaveModal() {
      this.displayModal = true;
    },
    ...mapActions(["saveCategoria", "deleteCategoria"]),
    editCategoria(categoria) {
      this.categoria = {...categoria};
      this.displayModal= true;
    },

    confirmDeleteCategoria(categoria) {
      this.categoria = categoria;
      this.displayModalDelete = true;
    }, 
    closeModal() {
      this.categoria = {
        id: null,
        nombre: null
      };
      this.displayModal = false;
    }
}
}

</script>

<style>

</style>