import axios from 'axios';
import authHeader from './auth-header';

class CestaService {

    url = "http://localhost:8080/api/cestas/";

    getAll() {
        return axios.get(this.url, { headers: authHeader() });
    }

    getCestaById(id){
        return axios.get(this.url + id, { headers: authHeader() });
    }

    save(cesta) {
        return axios.post(this.url + "saveOrUpdate", cesta, { headers: authHeader() })
    }

    delete(cesta){
        return axios.delete(this.url + cesta.id, { headers: authHeader() });
    }

    saveCestaProducto(cestaProducto){
        return axios.post(this.url + "cestaProducto/saveOrUpdate", cestaProducto, { headers: authHeader() });
    }

    getProductosCesta(idCesta){
        return axios.get(this.url + "cestaProducto/" + idCesta, { headers: authHeader() });
    }
}

export default new CestaService();