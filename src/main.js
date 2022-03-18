import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// ADICIONALES

// Bootstrap, iconos, vuelidate
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use (BootstrapVueIcons)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

//SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

import 'sweetalert2/dist/sweetalert2.min.css';
// import '@/scss/style.scss';

//Vuelidate
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
