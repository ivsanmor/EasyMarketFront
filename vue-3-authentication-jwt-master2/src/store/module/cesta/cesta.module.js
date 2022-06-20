import CestaService from "../../../services/cestaService";


const state = {
    cestas: [],
    carros: [],
    cestaModule: {
          id: null,
          precioTotal: null,
          observaciones: null,
          cancelar: null,
          activo: null,
          usuarioId: null
        },
    productosByCesta: []
  }

const mutations = {
    UPDATE_CESTA_ITEMS (state, payload) {
      state.cestas = payload;
      
    },

    CESTA_ITEMS(state, payload){
      state.cestaModule = payload;
      //window.location.reload();
    },

    CESTA_PRODUCTO_ITEMS(state, payload){
      state.cesta = payload;
      //window.location.reload();
    },

    PRODUCTO_BY_CESTA_ITEMS(state, payload){
      //console.log("payload", payload);
      state.productosByCesta = payload;
      //window.location.reload();
    },

}

const actions = {
    getCestas({commit}){
        return CestaService.getAll().then((response) => {
            commit('UPDATE_CESTA_ITEMS', response.data)
        });
    },

    saveCesta({commit}, cesta){

      return CestaService.save(cesta).then((response) => {
            commit('CESTA_ITEMS',response.data)
      });
    },

    deleteCesta({commit}, cesta){
      return CestaService.delete(cesta).then((response) => {
            commit('CESTA_ITEMS', response.data)
      });
    },

    saveCestaProducto({commit}, cestaProducto){
      
      return CestaService.saveCestaProducto(cestaProducto).then((response) => {
            commit('CESTA_PRODUCTO_ITEMS',response.data)
      });
    },

    getProductosByCesta({commit}, idCesta){
      
      return CestaService.getProductosCesta(idCesta).then((response) => {
            commit('PRODUCTO_BY_CESTA_ITEMS',response.data)
      });
    }


}

const getters = {
    cestas: state => state.cestas,
    cestaById: (state) => (id) => {
        return state.cestas.find(cesta => cesta.id === id)
      },
    carros: state => state.carros,
    cestaModule: state => state.cestaModule,
    productosByCesta: state => state.productosByCesta
}

export const cestaModule = {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
  };