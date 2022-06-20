import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from 'primevue/config';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome'

import 'primevue/resources/themes/lara-light-indigo/theme.css'; 
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue)
  .use(router)
  .use(store)
  .use(PrimeVue)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('Panel', Panel)
  .component('Menubar', Menubar)
  .component('Dialog', Dialog)
  .component('InputText', InputText)
  .component('Textarea', Textarea)
  .component('InputNumber', InputNumber)
  .component('Button', Button)
  .component('RadioButton', RadioButton)
  .component('Password', Password)
  .component('Dropdown', Dropdown)
  .mount("#app");
