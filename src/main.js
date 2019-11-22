import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueQrcodeReader from 'vue-qrcode-reader';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight, faArrowsAltH, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import Default from './layouts/default.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './scss/custom.scss';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueQrcodeReader);

library.add(faCaretRight, faArrowsAltH, faHome);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('default-layout', Default);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
