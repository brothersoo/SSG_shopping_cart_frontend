import Vue from "vue";
import Vuex from "vuex";

import * as productAPI from "@/api/product";
import * as cartAPI from "@/api/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: {
      content: [],
      currentPage: 1,
      numberOfElements: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0,
    },
    cartProducts: {},
    checkingProduct: {
      id: null,
      quantity: null,
    },
    checkedCartProducts: {
      쓱배송: [],
      새벽배송: [],
      택배: [],
    },

    cartAddSuccessDismissCountDown: 0,
    quantityExceededStockDismissCountDown: 0,
    stockLeft: 0,

    productFilter: {
      priceSlider: {
        rangeSlider: [null, null],
      },
      orderSelection: {
        selected: "createdAt",
      },
    },
  },
  getters: {
    userEmail() {
      return "moistybro@gmail.com";
    },
    productGroups() {
      return ["쓱배송", "새벽배송", "택배"];
    },
    checkedCartProductsPrice(state, getters) {
      let checkedCartProductsPrice = 0;
      for (let productGroup of getters.productGroups) {
        for (let cartProduct of state.checkedCartProducts[productGroup]) {
          checkedCartProductsPrice +=
            cartProduct.product.price * cartProduct.quantity;
        }
      }
      return checkedCartProductsPrice;
    },
    everyCartProductsPrice(state, getters) {
      let everyCartProductsPrice = 0;
      for (let productGroup of getters.productGroups) {
        if (productGroup in state.cartProducts) {
          for (let cartProduct of state.cartProducts[productGroup]) {
            everyCartProductsPrice +=
              cartProduct.product.price * cartProduct.quantity;
          }
        }
      }
      return everyCartProductsPrice;
    },
    checkedCartProductIds(state, getters) {
      let checkedCartProductIds = [];
      for (let productGroup of getters.productGroups) {
        for (let cartProduct of state.checkedCartProducts[productGroup]) {
          checkedCartProductIds.push(cartProduct.id);
        }
      }
      return checkedCartProductIds;
    },
    everyCartProductIds(state, getters) {
      let everyCartProductIds = [];
      for (let productGroup of getters.productGroups) {
        if (productGroup in state.cartProducts) {
          for (let cartProduct of state.cartProducts[productGroup]) {
            everyCartProductIds.push(cartProduct.id);
          }
        }
      }
      return everyCartProductIds;
    },
    filterParam(state) {
      return {
        page: state.products.currentPage,
        size: state.products.pageSize,
        fromPrice: state.productFilter.priceSlider.rangeSlider[0],
        toPrice: state.productFilter.priceSlider.rangeSlider[1],
        sort: state.productFilter.orderSelection.selected,
      };
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

    SET_PRODUCT_PRICE_SLIDER(state, slider) {
      state.productFilter.priceSlider = slider;
    },
    SET_PRODUCT_ORDER_SELECTION(state, selection) {
      state.productFilter.orderSelection = selection;
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
    updateCartProduct({ commit }, { cartProductId, quantity }) {
      cartAPI
        .updateCartProduct(cartProductId, quantity)
        .then((response) => {
          commit("UPDATE_CART_PRODUCT", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    setProductFilter({ commit }, { priceSliders, orderSelection }) {
      commit("SET_PRODUCT_PRICE_SLIDER", priceSliders);
      commit("SET_PRODUCT_ORDER_SELECTION", orderSelection);
    },
  },
  modules: {},
});
