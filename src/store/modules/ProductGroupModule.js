export default {
  namespaced: true,
  state: {
    productGroups: [
      { id: 1, name: "쓱배송" },
      { id: 2, name: "새벽배송" },
      { id: 3, name: "택배" },
    ],
  },
  getters: {
    productGroupNames(state) {
      return state.productGroups.map((group) => group.name);
    },
  },
};
