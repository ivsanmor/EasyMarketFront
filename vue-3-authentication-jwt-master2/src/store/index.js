import { createStore } from "vuex";
import { auth } from "./module/auth/auth.module";
import { productoModule } from "./module/producto/producto.module";
import { cestaModule } from "./module/cesta/cesta.module";
import { usuarioModule } from "./module/usuario/usuario.module";
import { categoriaModule } from "./module/categoria/categoria.module";

const store = createStore({
  modules: {
    auth,
    productoModule,
    cestaModule,
    usuarioModule,
    categoriaModule
  },
});

export default store;
