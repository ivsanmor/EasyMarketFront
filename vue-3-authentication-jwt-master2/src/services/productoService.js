import axios from 'axios';
import authHeader from './auth-header';

class ProductoService {

    url = "http://localhost:8080/api/productos/";

    getAll() {
        return axios.get(this.url, { headers: authHeader() });
    }

    getById(id){
        return axios.get(this.url + id, { headers: authHeader() });
    }

    save(producto) {
        return axios.post(this.url + "saveOrUpdate", producto, { headers: authHeader() })
    }

    delete(producto){
        return axios.delete(this.url + producto.id, { headers: authHeader() });
    }
}

export default new ProductoService();