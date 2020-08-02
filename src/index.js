import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueX from 'vuex';
import VueRouter from 'vue-router';

import App from 'src/App.vue';
import { storeOpts } from 'src/store';
import { routeOpts } from 'src/routes';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin); // Maybe not necessary
Vue.use(VueX);
Vue.use(VueRouter);

const store = new VueX.Store(storeOpts);
export const router = new VueRouter(routeOpts);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
