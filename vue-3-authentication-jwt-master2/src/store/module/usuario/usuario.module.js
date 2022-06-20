import UsuarioService from "../../../services/usuarioService";

const state = {
    usuarios: [],
    usuario: null
  }

const mutations = {
    UPDATE_USUARIO_ITEMS (state, payload) {
      state.usuarios = payload;
      
    },

    USUARIO_ITEMS(state, payload){
      state.usuario = payload;
      
      //window.location.reload();
    },

}

const actions = {
    getUsuarios({commit}){
        return UsuarioService.getAll().then((response) => {
            commit('UPDATE_USUARIO_ITEMS', response.data)
        });
    },

    deleteUsuario({commit}, usuario){
      return UsuarioService.delete(usuario).then((response) => {
            commit('USUARIO_ITEMS', response.data)
      });
    },

    getUsuarioByNombre({commit}, usuario){
        return UsuarioService.getByNombre(usuario).then((response) => {
            commit('USUARIO_ITEMS', response.data)
      });
    },

    updateUsuario({commit}, usuario){
      
      return UsuarioService.updateUsuario(usuario).then((response) => {
            commit('PRODUCT_ITEMS',response.data)
      });
    }
}

const getters = {
    usuarios: state => state.usuarios,
    usuarioById: (state) => (id) => {
        return state.usuarios.find(usuario => usuario.id === id)
      },
    usuario: state => state.usuario,
}

export const usuarioModule = {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
  };