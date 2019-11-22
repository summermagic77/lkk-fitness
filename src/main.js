import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import VueQrcodeReader from 'vue-qrcode-reader';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import './scss/custom.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);
Vue.use(VueQrcodeReader);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
