<template>
  <div class="product">
    <b-modal
      id="existing-product-alert-modal"
      @ok="addConfirmed"
      @hidden="removeCheckingProduct"
      >이미 장바구니에 포함되어있는 상품입니다.<br />선택한 수량만큼
      추가하시겠습니까?</b-modal
    >

    <product-table :products="products.content"></product-table>

    <pagination-bar
      :totalPages="products.totalPages"
      :currentPage="products.currentPage"
      :pageSize="products.pageSize"
    ></pagination-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PaginationBar from "@/components/PaginationBar.vue";
import ProductTable from "@/components/product/ProductTable.vue";

export default {
  components: { ProductTable, PaginationBar },
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
    this.getProducts({ page: 1, size: 10 });
    this.getCartProducts();
  },
};
</script>
