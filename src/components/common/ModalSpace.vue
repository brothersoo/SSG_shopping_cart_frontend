<template>
  <div>
    <b-modal id="login-require-modal" ok-only>
      로그인이 필요한 기능입니다.
    </b-modal>
    <b-modal id="refund-fail-modal" ok-only> 환불에 실패했습니다.</b-modal>
    <b-modal id="order-fail-modal" ok-only> 주문에 실패했습니다. </b-modal>

    <b-modal
      id="existing-product-alert-modal"
      @ok="addConfirmed"
      @hidden="removeCheckingProduct"
      >이미 장바구니에 포함되어있는 상품입니다.<br />선택한 수량만큼
      추가하시겠습니까?</b-modal
    >
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const productHelper = createNamespacedHelpers("product");
const cartHelper = createNamespacedHelpers("cart");

export default {
  methods: {
    ...productHelper.mapActions(["setCheckingProduct"]),
    ...cartHelper.mapActions(["addToCart"]),
    addConfirmed() {
      this.addToCart();
    },
    removeCheckingProduct() {
      this.setCheckingProduct({ id: null, quantity: null });
    },
  },
};
</script>
