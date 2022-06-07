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
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["stockLeft", "addableQuantity"]),
    cartAddSuccessDismissCountDown: {
      get() {
        return this.$store.state.cartAddSuccessDismissCountDown;
      },
      set(value) {
        this.$store.commit("SHOW_CART_ADD_SUCCESS_ALERT", value);
      },
    },
    quantityExceededStockDismissCountDown: {
      get() {
        return this.$store.state.quantityExceededStockDismissCountDown;
      },
      set(value) {
        this.$store.commit("SHOW_QUANTITY_EXCEEDED_ALERT", value);
      },
    },
  },
  methods: {
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
