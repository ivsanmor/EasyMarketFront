import ProductoService from "../../../services/productoService";


const state = {
    productos: [],
    carro: [] ,
    productoCarro: null,
    productoNombre: null
  }

const mutations = {
    UPDATE_PRODUCT_ITEMS (state, payload) {
      state.productos = payload;
    },

    PRODUCT_ITEMS(state, payload){
      state.producto = payload;
      window.location.reload();
    },

    NOMBRE_PRODUCT(state, payload){
      console.log("payload", payload.nombre);
      state.productoNombre = payload;
      console.log("productoNombre" , state.productoNombre.nombre);
      //window.location.reload();
    },

    addProduct(state,producto){
      let aux = Object.create(producto);
      aux.cantidad=1;
      state.carro.push(aux);
      state.productos.map((p)=>{
         if ( p.id == aux.id) {
           p.carro= true;
         } 
       })
      
      //  if (producto.carro != true){
        
      //  }

    },
    removeProduct(state,id){
      state.carro = state.carro.filter((p)=> p.id != id );

      state.productos.map((p)=>{
         if ( p.id == id) {
           p.carro= false
         }
       })
    },
    increase(state,id){
      let tope= null;
      state.productos.map((p)=>{
        if ( p.id == id) {
         tope= p.cantidad;
        }
      })
      state.carro.map((p)=>{
        if ( p.id == id && p.cantidad < tope) {
          p.cantidad += 1
        }
      })

    },
    decrease(state,id){
      state.carro.map((p)=>{
        if ( p.id == id && p.cantidad > 1) {
          p.cantidad -= 1
        }
      })
    }
}

const actions = {
    getProductos({commit}){
        return ProductoService.getAll().then((response) => {
            commit('UPDATE_PRODUCT_ITEMS', response.data)
        });
    },

    getProductoById({commit}, id){
      return ProductoService.getById(id).then((response) => {
        commit('NOMBRE_PRODUCT', response.data)
    });
    },

    saveProducto({commit}, producto){
      
      return ProductoService.save(producto).then((response) => {
            commit('PRODUCT_ITEMS',response.data)
      });
    },

    deleteProducto({commit}, producto){
      return ProductoService.delete(producto).then((response) => {
            commit('PRODUCT_ITEMS', response.data)
      });
    },

    addProducto({commit},producto){
      commit('addProduct',producto)
    },
    removeProducto({commit},id){
      commit('removeProduct',id)
    },
    increase({commit},id){
      commit('increase',id)
    },
    decrease({commit},id){
      commit('decrease',id)
    }
}

const getters = {
    productos: state => state.productos,
    productoById: (state) => (id) => {
        return state.productos.find(producto => producto.id === id)
      },
    carro: state => state.carro,
    productoNombre: state => state.productoNombre
}

export const productoModule = {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
  };