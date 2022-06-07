export default {
  namespaced: true,
  state: {
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
    filterParam(state, getters, rootState) {
      return {
        page: rootState.product.products.currentPage,
        size: rootState.product.products.pageSize,
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
};
