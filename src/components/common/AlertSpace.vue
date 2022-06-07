<template>
  <div id="alert_space">
    <b-alert
      :show="cartAddSuccessDismissCountDown"
      dismissible
      fade
      variant="success"
      @dismiss-count-down="cartAddSuccessDismissCountDownChanged"
    >
      장바구니에 추가되었습니다.
    </b-alert>

    <b-alert
      :show="quantityExceededStockDismissCountDown"
      dismissible
      fade
      variant="danger"
      @dismiss-count-down="quantityExceededStockDismissCountDownChanged"
    >
      {{ stockLeft }}개 이상 추가할 수 없습니다.<br />최대
      {{ addableQuantity }}개 더 추가할 수 있습니다.
    </b-alert>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const alertHelper = createNamespacedHelpers("alert");

export default {
  computed: {
    ...alertHelper.mapState({
      stockLeft: (state) => state.stockLeft,
      addableQuantity: (state) => state.addableQuantity,
    }),
    cartAddSuccessDismissCountDown: {
      get() {
        return this.$store.state.alert.cartAddSuccessDismissCountDown;
      },
      set(value) {
        this.SHOW_CART_ADD_SUCCESS_ALERT(value);
      },
    },
    quantityExceededStockDismissCountDown: {
      get() {
        return this.$store.state.alert.quantityExceededStockDismissCountDown;
      },
      set(value) {
        this.SHOW_QUANTITY_EXCEEDED_ALERT(value);
      },
    },
  },
  methods: {
    ...alertHelper.mapMutations([
      "SHOW_CART_ADD_SUCCESS_ALERT",
      "SHOW_QUANTITY_EXCEEDED_ALERT",
    ]),
    cartAddSuccessDismissCountDownChanged(dismissCountDown) {
      this.cartAddSuccessDismissCountDown = dismissCountDown;
    },
    quantityExceededStockDismissCountDownChanged(dismissCountDown) {
      this.quantityExceededStockDismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style>
#alert_space {
  height: 80px;
}
</style>
