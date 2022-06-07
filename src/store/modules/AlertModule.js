export default {
  namespaced: true,
  state: {
    cartAddSuccessDismissCountDown: 0,
    quantityExceededStockDismissCountDown: 0,
    stockLeft: 0,
    addableQuantity: 0,
  },
  mutations: {
    SHOW_CART_ADD_SUCCESS_ALERT(state, second) {
      state.cartAddSuccessDismissCountDown = second;
    },
    SHOW_QUANTITY_EXCEEDED_ALERT(state, second) {
      state.quantityExceededStockDismissCountDown = second;
    },
    SET_STOCK_LEFT(state, stock) {
      state.stockLeft = stock;
    },
    SET_ADDABLE_QUANTITY(state, quantity) {
      state.addableQuantity = quantity;
    },
  },
};
