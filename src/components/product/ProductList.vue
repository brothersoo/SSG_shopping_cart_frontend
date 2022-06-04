<template>
  <div>
    <b-modal
      id="existing-product-alert-modal"
      @ok="addConfirmed"
      @hidden="removeCheckingProduct"
      >이미 장바구니에 포함되어있는 상품입니다.<br />선택한 수량만큼
      추가하시겠습니까?</b-modal
    >

    <product-table :products="products"></product-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductTable from "./ProductTable.vue";

export default {
  components: { ProductTable },
  computed: {
    ...mapState(["products", "checkingProduct"]),
  },
  methods: {
    ...mapActions([
      "getProducts",
      "getCartProducts",
      "addToCart",
      "setCheckingProduct",
    ]),
    addConfirmed() {
      this.addToCart();
    },
    removeCheckingProduct() {
      this.setCheckingProduct({ id: null, quantity: null });
    },
  },
  created() {
    this.getProducts({});
    this.getCartProducts();
  },
};
</script>
