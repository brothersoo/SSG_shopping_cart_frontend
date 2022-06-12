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
    >
      이미 장바구니에 포함되어있는 상품입니다.<br />
      선택한 수량만큼 추가하시겠습니까?
    </b-modal>

    <b-modal id="order-success-modal" ok-only> 주문되었습니다. </b-modal>

    <b-modal
      v-model="cartProductRequiresQuantityUpdateModal"
      @ok="handleCartProductQuantityExceededStock('reset')"
      @cancel="handleCartProductQuantityExceededStock('remove')"
      @hidden="handleCartProductQuantityExceededStock('reset')"
    >
      재고가 부족한 상품이 존재합니다.<br />
      상품을 장바구니에서 제외하거나 수량을 최대로 맞출 수 있습니다.
      <template #modal-footer="{ ok, cancel }">
        <b-button variant="danger" @click="cancel()"> 상품 제외 </b-button>
        <b-button variant="success" @click="ok()"> 수량 변경 </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import * as cartAPI from "@/api/cart";

const productHelper = createNamespacedHelpers("product");
const cartHelper = createNamespacedHelpers("cart");

export default {
  computed: {
    ...cartHelper.mapState({
      cartProductRequiresQuantityUpdateModal: (state) =>
        state.cartProductRequiresQuantityUpdateModal,
    }),
    cartProductRequiresQuantityUpdateModal: {
      get() {
        return this.$store.state.cart.cartProductRequiresQuantityUpdateModal;
      },
      set(value) {
        this.SET_CART_PRODUCT_REQUIRES_QUANTITY_UPDATE_MODAL(value);
      },
    },
  },
  methods: {
    ...productHelper.mapActions(["setCheckingProduct"]),
    ...cartHelper.mapActions(["addToCart", "getCartProducts"]),
    ...cartHelper.mapMutations([
      "SET_CART_PRODUCT_REQUIRES_QUANTITY_UPDATE_MODAL",
    ]),
    addConfirmed() {
      this.addToCart();
    },
    removeCheckingProduct() {
      this.setCheckingProduct({ id: null, quantity: null });
    },
    handleCartProductQuantityExceededStock(type) {
      cartAPI
        .handleCartProductQuantityExceededStock(type)
        .then((response) => {
          console.log(response);
          this.getCartProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
