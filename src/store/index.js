import Vue from "vue";
import Vuex from "vuex";

import alertModule from "@/store/modules/AlertModule";
import cartModule from "@/store/modules/CartModule";
import filterModule from "@/store/modules/FilterModule";
import productGroupModule from "@/store/modules/ProductGroupModule";
import productModule from "@/store/modules/ProductModule";
import userModule from "@/store/modules/UserModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    productGroup: productGroupModule,
    product: productModule,
    cart: cartModule,
    filter: filterModule,
    alert: alertModule,
    user: userModule,
  },
});
