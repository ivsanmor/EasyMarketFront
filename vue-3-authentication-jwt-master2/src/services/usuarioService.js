import axios from 'axios';
import authHeader from './auth-header';

class UsuarioService {

    url = "http://localhost:8080/api/usuarios/";

    getAll() {
        return axios.get(this.url, { headers: authHeader() });
    }

    getById(usuario){
        return axios.get(this.url + "id/" + usuario.id, { headers: authHeader() });
    }

    getByNombre(usuario){
        return axios.get(this.url + "nombre/" + usuario.nombreUsuario, { headers: authHeader() });
    }

    updateUsuario(usuario){
        return axios.post(this.url + "usuario/update", usuario, { headers: authHeader() })
    }

}

export default new UsuarioService();