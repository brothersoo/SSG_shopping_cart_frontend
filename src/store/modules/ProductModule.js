import * as productAPI from "@/api/product";

export default {
  namespaced: true,
  state: {
    products: {
      content: [],
      currentPage: 1,
      numberOfElements: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0,
    },
    checkingProduct: {
      id: null,
      quantity: null,
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
    SET_CHECKING_PRODUCT(state, payload) {
      state.checkingProduct = payload;
    },
  },
  actions: {
    getProducts({ commit, state, rootGetters }, page) {
      if (page) state.products.currentPage = page;
      productAPI
        .getProducts(rootGetters["filter/filterParam"])
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setCheckingProduct({ commit }, data) {
      commit("SET_CHECKING_PRODUCT", data);
    },
  },
};
