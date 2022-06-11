import * as orderAPI from "@/api/order";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
  },
  actions: {
    getOrders({ commit }) {
      orderAPI
        .orderList()
        .then((response) => {
          console.log(response);
          commit("SET_ORDERS", response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
