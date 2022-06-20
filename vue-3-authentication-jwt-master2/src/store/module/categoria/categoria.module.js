import CategoriaService from "../../../services/categoriaService";


const state = {
    categorias: [],
    nombreCategorias: []
  }

const mutations = {
    UPDATE_CATEGORIAS_ITEMS (state, payload) {
      state.categorias = payload;
    },

    CATEGORIAS_ITEMS(state, payload){
      state.categoria = payload;
      window.location.reload();
    },

    NOMBRE_CATEGORIA(state, payload){
      state.categoriaNombre = payload;
      //window.location.reload();
    },

    NOMBRES_CATEGORIA(state, payload){
        state.nombreCategorias = payload;
        //window.location.reload();
      },

}

const actions = {
    getCategorias({commit}){
        return CategoriaService.getAll().then((response) => {
            commit('UPDATE_CATEGORIAS_ITEMS', response.data)
        });
    },

    getCategoriaById({commit}, id){
      return CategoriaService.getById(id).then((response) => {
        commit('NOMBRE_CATEGORIA', response.data)
    });
    },

    getCategoriaByNombre({commit}, nombre){
        return CategoriaService.getCategoriaByNombre(nombre).then((response) => {
          commit('NOMBRE_CATEGORIA', response.data)
      });
      },

    getNombresCategorias({commit}){
        return CategoriaService.getNombresCategorias().then((response) => {
            commit('NOMBRES_CATEGORIA', response.data)
        });
    },

    saveCategoria({commit}, categoria){
      
      return CategoriaService.save(categoria).then((response) => {
            commit('CATEGORIAS_ITEMS',response.data)
      });
    },

    deleteCategoria({commit}, categoria){
      return CategoriaService.delete(categoria).then((response) => {
            commit('CATEGORIAS_ITEMS', response.data)
      });
    },

  
}

const getters = {
    categorias: state => state.categorias,
    categoriaById: (state) => (id) => {
        return state.categorias.find(categoria => categoria.id === id)
      },
    nombreCategorias: state => state.nombreCategorias
}

export const categoriaModule = {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
  };