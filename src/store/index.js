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
    cartProducts: {
      쓱배송: [],
      새벽배송: [],
      택배: [],
    },
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
        key: 0,
        value: [null, null],
        range: {
          min: null,
          max: null,
        },
        options: {
          step: 1000,
          tooltips: [true, true],
          format: {
            from(value) {
              return parseInt(value);
            },
            to(value) {
              return parseInt(value);
            },
          },
        },
      },
      orderSelection: {
        selected: "createdAt",
        options: [
          {
            value: "createdAt",
            text: "신상품순",
          },
          {
            value: "price",
            text: "낮은가격순",
          },
          {
            value: "price,DESC",
            text: "높은가격순",
          },
        ],
      },
      productGroupSelection: [
        { id: 1, name: "쓱배송" },
        { id: 2, name: "새벽배송" },
        { id: 3, name: "택배" },
      ],
    },
  },
  getters: {
    userEmail() {
      return "moistybro@gmail.com";
    },
    productGroups() {
      return [
        { id: 1, name: "쓱배송" },
        { id: 2, name: "새벽배송" },
        { id: 3, name: "택배" },
      ];
    },
    productGroupNames(state, getters) {
      return getters.productGroups.map((group) => group.name);
    },
    checkedCartProductsPrice(state, getters) {
      let checkedCartProductsPrice = 0;
      for (let productGroup of getters.productGroupNames) {
        for (let cartProduct of state.checkedCartProducts[productGroup]) {
          checkedCartProductsPrice +=
            cartProduct.product.price * cartProduct.quantity;
        }
      }
      return checkedCartProductsPrice;
    },
    everyCartProductsPrice(state, getters) {
      let everyCartProductsPrice = 0;
      for (let productGroup of getters.productGroupNames) {
        for (let cartProduct of state.cartProducts[productGroup]) {
          everyCartProductsPrice +=
            cartProduct.product.price * cartProduct.quantity;
        }
      }
      return everyCartProductsPrice;
    },
    checkedCartProductIds(state, getters) {
      let checkedCartProductIds = [];
      for (let productGroup of getters.productGroupNames) {
        for (let cartProduct of state.checkedCartProducts[productGroup]) {
          checkedCartProductIds.push(cartProduct.id);
        }
      }
      return checkedCartProductIds;
    },
    everyCartProductIds(state, getters) {
      let everyCartProductIds = [];
      for (let productGroup of getters.productGroupNames) {
        for (let cartProduct of state.cartProducts[productGroup]) {
          everyCartProductIds.push(cartProduct.id);
        }
      }
      return everyCartProductIds;
    },
    filterParam(state) {
      return {
        page: state.products.currentPage,
        size: state.products.pageSize,
        fromPrice: state.productFilter.priceSlider.value[0],
        toPrice: state.productFilter.priceSlider.value[1],
        sort: state.productFilter.orderSelection.selected,
        groupIds: state.productFilter.productGroupSelection
          .map((group) => group.id)
          .join(","),
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
      let group = addedCartProduct.product.productGroup.name;
      if (!(group in state.cartProducts)) {
        state.cartProducts[group] = [];
      }

      for (let cartProduct of state.cartProducts[group]) {
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

    SET_PRODUCT_GROUP_SELECTION(state, productGroupSelection) {
      state.productFilter.productGroupSelection = productGroupSelection;
    },
    SET_PRICE_RANGE_FILTER(state, { value, range }) {
      state.productFilter.priceSlider.value = value;
      state.productFilter.priceSlider.range = range;
    },
    RELOAD_PRICE_SLIDER(state) {
      state.productFilter.priceSlider.key += 1;
    },
  },
  actions: {
    getProducts({ commit, state, getters }, page) {
      state.products.currentPage = page;
      productAPI
        .getProducts(getters.filterParam)
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
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

    setSelectedProductGroup({ commit }, productGroupSelection) {
      commit("SET_PRODUCT_GROUP_SELECTION", productGroupSelection);
    },
    setPriceRangeFilter({ commit }, data) {
      commit("SET_PRICE_RANGE_FILTER", data);
    },
    reloadPriceSlider({ commit }) {
      commit("RELOAD_PRICE_SLIDER");
    },
  },
  modules: {},
});
