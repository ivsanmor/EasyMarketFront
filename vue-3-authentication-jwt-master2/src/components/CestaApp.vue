<template>
<div>
<div v-if="currentUser.authorities[0].authority == 'ROLE_ADMIN'">
<DataTable :value="cestas" :paginator="true" :rows="10">
            <Column field="precioTotal" header="Precio" sortable>
                        <template #body="slotProps">
                            {{formatCurrency(slotProps.data.precioTotal)}}
                        </template>
              </Column>
            <Column field="observaciones" header="Observaciones"></Column>
            <Column field="usuarioId" header="Usuario ID" sortable></Column>
            <Column  style="min-width:8rem">
            <template #body="slotProps">
            <Button label="Mostrar Productos" class="p-button-rounded" @click="mostrarProductosByCesta(slotProps.data.id)"/>
            <Button label="Ocultar Productos" class="p-button-secondary p-button-outlined p-button-raised p-button-rounded" @click="desmostrarProductosByCesta"/>
            </template>
        </Column>
</DataTable>
<div v-if="displayProductos"> 
<DataTable :value="productosByCesta" responsiveLayout="scroll" :paginator="true" :rows="10">
            <Column field="cantidad" header="Cantidad" sortable></Column>
            <Column field="producto" header="Producto" sortable></Column>
</DataTable>
</div>
</div>
<div v-if="currentUser.authorities[0].authority != 'ROLE_ADMIN'">
  <!-- <div> 
  </div> -->
 <div class="row mt-2" >
      <table class="table  text-center">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto) in carro" :key="producto.id">        
            <th scope="row">
              <div v-if="producto.imagen != null">
                  <img :src="require('../assets/' + producto.imagen + '.jpg')" :alt="producto.imagen" class="product-image" style="width: 4rem;" />
              </div>
              
            </th>
            <td>{{ producto.nombre }}</td>
            <td>
              {{ producto.precio }}
            </td>
            <td>
              <button
                @click="decreaseQ(producto.id)"
                class="btn btn-primary btn-sm"
              >
                -
              </button>
              {{producto.cantidad}}
              <button
                @click="increaseQ(producto.id)"
                class="btn btn-primary btn-sm"
                size="sm"
              >
                +
              </button>
            </td>

            <td>
              <button @click="eliminarHandler(producto.id)" class="btn btn-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col text-center">
        <h4>TOTAL: {{ formatCurrency(this.total)}}</h4>
        
      </div>
      <Button icon="pi pi-paypal" label="Hacer Pedido" @click="guardarCesta"/>
      
    </div>
    <!-- v-model="producto.descripcion" required="true" -->
    <div class="row">
      <label for="observaciones">Observaciones</label> <br/>
      <Textarea id="observaciones" cols="180" @input="updateTheVariable($event.target.value)"/>
      
    </div>
</div>

</div> 
</template>

<script>
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
export default {
    name: "CestaApp",
    data() { 
      return{
        displayProductos: false,
        productosByCesta2: [],
        expandedRows: [],
        total: 0,
        cesta: {
          id: null,
          precioTotal: null,
          observaciones: null,
          cancelar: null,
          activo: null,
          usuarioId: null
        },
        cestaProducto: {
          id: null,
          cesta: 0,
          producto: 0,
          cantidad: 0
        }
      }
      
    },
     computed: {
      ...mapGetters([
      'carro', 'cestas', 'usuario', 'cestaModule','productosByCesta', 'productoNombre', 'productoById'
    ]), 
      currentUser() {
      return this.$store.state.auth.user;
    },
    
    
    
    
  },
  methods: {
    ...mapActions(["removeProducto", "increase", "decrease", "saveCesta", "saveCestaProducto", "getUsuarioByNombre"
    , "saveProducto", "getProductosByCesta", "getProductoById"]),

    calcularPrecioTotal(){
    
    for (const p of this.carro){
      
      this.total += p.cantidad * p.precio;

    }

    //console.log(this.total);
     
  },

  increaseQ(value){
    this.increase(value);
    this.total = 0;
    this.calcularPrecioTotal();
  },
  decreaseQ(value){
    this.decrease(value);
    this.total = 0;
    this.calcularPrecioTotal();
  },
  
  eliminarHandler(value){
    this.removeProducto(value);
    this.total = 0;
    this.calcularPrecioTotal();
  },

  formatCurrency(value) {
            if(value)
				return value.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'});
			return 0;
    },
    updateTheVariable(value){
         this.cesta.observaciones = value;
    },

  guardarCesta(){
    
    this.cesta.precioTotal = this.total;
    this.cesta.usuarioId = this.usuario.id;
    this.cesta.activo = true;
    //this.cestaProductos = this.carro;

    //console.log(this.cestaProductos);


    //console.log(this.cesta);
    //this.$store.dispatch('saveCesta', this.cesta);
    this.saveCesta(this.cesta);
    this.carro.forEach(p => {
      this.cestaProducto.producto = p.id;
      this.cestaProducto.cesta = this.cestaModule.id +1;
      this.cestaProducto.cantidad = p.cantidad;

      let productoAux = this.productoById(p.id);
      
      //Quitamos el stock del producto
      productoAux.cantidad = productoAux.cantidad - p.cantidad;

      this.saveProducto(productoAux);
    
      this.saveCestaProducto(this.cestaProducto);

    });
  },
  
  mostrarProductosByCesta(value){
    this.displayProductos = true;
    this.getProductosByCesta(value);
    //console.log("productos 1",this.productosByCesta);
    this.productosByCesta = this.getProductosByCesta(value);
  },
  desmostrarProductosByCesta(){
    this.displayProductos = false;
  },
    expandAll() {
            this.expandedRows = this.cestas.filter(c => c.id);
    },
    collapseAll() {
            this.expandedRows = null;
    },
  },
  created() {
    this.$store.dispatch('getCestas');
    this.cesta.usuarioId = 1;
    this.cesta.activo = false;
    this.$store.dispatch('saveCesta', this.cesta);
    this.cesta.usuarioId = null;
    this.cesta.activo = null;

    this.getUsuarioByNombre(this.currentUser);

  },
  mounted(){
    this.calcularPrecioTotal();
    this.getUsuarioByNombre(this.currentUser);
    
  },

  
}
</script>

<style>

</style>