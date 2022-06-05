import Vue from "vue";
import Vuex from "vuex";

import * as productAPI from "@/api/product";
import * as cartAPI from "@/api/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: {},
    cartProducts: {},
    checkingProduct: {
      id: null,
      quantity: null,
    },

    cartAddSuccessDismissCountDown: 0,
    quantityExceededStockDismissCountDown: 0,
    stockLeft: 0,
  },
  getters: {
    userEmail() {
      return "moistybro@gmail.com";
    },
  },
  mutations: {
    SET_PRODUCTS(
      state,
      { content, totalPages, totalElements, numberOfElements, size, number }
    ) {
      state.products = {
        content,
        totalPages,
        totalElements,
        numberOfElements,
        pageSize: size,
        currentPage: number + 1,
      };
    },
    SET_CART_PRODUCTS(state, payload) {
      state.cartProducts = payload;
    },
    SET_CHECKING_PRODUCT(state, payload) {
      state.checkingProduct = payload;
    },
    UPDATE_CART_PRODUCT(state, addedCartProduct) {
      let group = addedCartProduct.product.productGroupName;
      if (!(group in state.cartProducts)) {
        state.cartProducts[group] = [];
      }

      for (let cartProduct of state.cartProducts[group]) {
        console.log(cartProduct, addedCartProduct.product.id);
        if (cartProduct.product.id === addedCartProduct.product.id) {
          cartProduct.quantity = addedCartProduct.quantity;
          return;
        }
      }
      state.cartProducts[group].push(addedCartProduct);
    },
    SHOW_CART_ADD_SUCCESS_ALERT(state, second) {
      state.cartAddSuccessDismissCountDown = second;
    },
    SHOW_QUANTITY_EXCEEDED_ALERT(state, second) {
      state.quantityExceededStockDismissCountDown = second;
    },
    SET_STOCK_LEFT(state, stock) {
      state.stockLeft = stock;
    },
  },
  actions: {
    getProducts(context, filter) {
      productAPI
        .getProducts(filter)
        .then((response) => {
          context.commit("SET_PRODUCTS", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCartProducts({ commit, getters }) {
      cartAPI
        .getCartProducts(getters.userEmail)
        .then((response) => {
          commit("SET_CART_PRODUCTS", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setCheckingProduct(context, data) {
      context.commit("SET_CHECKING_PRODUCT", data);
    },
    addToCart({ commit, state, getters }) {
      // TODO: change to JWT
      let userEmail = getters.userEmail;
      cartAPI
        .addToCart(
          state.checkingProduct.id,
          userEmail,
          state.checkingProduct.quantity
        )
        .then((response) => {
          if (response.status === 201) {
            commit("UPDATE_CART_PRODUCT", response.data);
            commit("SHOW_CART_ADD_SUCCESS_ALERT", 3);
            commit("SET_CHECKING_PRODUCT", { id: null, quantity: null });
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  modules: {},
});
