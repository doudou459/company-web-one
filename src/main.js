import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ajax from 'axios';
import dataModel from "./js/dataModel";
Vue.prototype.$ajax = ajax
Vue.prototype.$dataModel=dataModel
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
