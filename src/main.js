import Vue from 'vue';
import VueQrcodeReader from 'vue-qrcode-reader';
import ElementUI from 'element-ui';
import device from 'vue-device-detector';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import Default from './layouts/default.vue';
import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css';
import './scss/custom.scss';
import 'vue-material-design-icons/styles.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueQrcodeReader);
Vue.use(device);
Vue.use(require('vue-moment'));

Vue.component('default-layout', Default);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
