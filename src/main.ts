import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;

Vue.use(VueResource);
//Vue.http.options.root = 'https://stock-trading-vue.firebaseio.com/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
