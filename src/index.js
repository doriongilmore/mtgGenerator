// import Vue from 'vue';
// import { CardPlugin, DropdownPlugin, LayoutPlugin, ModalPlugin, TablePlugin } from 'bootstrap-vue';

function loadApp() {
  import(/* webpackChunkName: "modules" */ './modules.js')
    .then(({ default: modules }) => {
      const { Vue, IconComponentList, VueUseList, VueX, VueRouter, App, storeOpts, routeOpts } = modules;

      for (let i = 0, l = IconComponentList.length; i < l; i++) {
        const icon = IconComponentList[i];
        Vue.component(icon.name, icon.module);
      }
      for (let i = 0, l = VueUseList.length; i < l; i++) {
        Vue.use(VueUseList[i]);
      }
      Vue.use(VueX);
      Vue.use(VueRouter);

      const store = new VueX.Store(storeOpts);
      const router = new VueRouter(routeOpts);

      const loader = document.getElementById('loader');
      loader && loader.classList.add('d-none');

      new Vue({
        store,
        router,
        render: h => h(App),
      }).$mount('#app');
    })
    .catch(e => console.error('Error while loading App', e));
}

loadApp();
