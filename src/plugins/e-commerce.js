import VueCookies from "vue-cookies";
import { BootstrapVue, IconsPlugin, TablePlugin } from "bootstrap-vue";

import "@/assets/scss/e-commerce.scss";

export default {
  install(Vue) {
    Vue.use(VueCookies);
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(TablePlugin);

    Vue.$cookies.config("7d");
  },
};
