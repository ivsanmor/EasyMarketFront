import axios from 'axios';
import authHeader from './auth-header';

class CategoriaService {

    url = "http://localhost:8080/api/categorias/";

    getAll() {
        return axios.get(this.url, { headers: authHeader() });
    }

    getCategoriaById(id){
        return axios.get(this.url + id, { headers: authHeader() });
    }

    getCategoriaByNombre(nombre){
        return axios.post(this.url + 'nombre' ,nombre, { headers: authHeader() });
    }

    save(categoria) {
        return axios.post(this.url + "saveOrUpdate", categoria, { headers: authHeader() })
    }

    delete(categoria){
        return axios.delete(this.url + categoria.id, { headers: authHeader() });
    }

    getNombresCategorias(){
        return axios.get(this.url + 'nombres', { headers: authHeader() })
    }


}

export default new CategoriaService();