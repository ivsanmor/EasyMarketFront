import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        nombreUsuario: user.nombreUsuario,
        password: user.password
      })
      .then(response => {
        console.log('', JSON.stringify(response.data))
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      nombre: user.nombre,
      nombreUsuario: user.nombreUsuario,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
