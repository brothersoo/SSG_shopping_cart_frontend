import Vue from "vue";
import { BootstrapVue, IconsPlugin, TablePlugin } from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ECommerce from "./plugins/e-commerce-plugin.scss";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(TablePlugin);
Vue.use(ECommerce);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
