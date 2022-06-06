<template>
  <div class="product">
    <b-modal
      id="existing-product-alert-modal"
      @ok="addConfirmed"
      @hidden="removeCheckingProduct"
      >이미 장바구니에 포함되어있는 상품입니다.<br />선택한 수량만큼
      추가하시겠습니까?</b-modal
    >

    <filter-bar :onFilterChange="onFilterChange"></filter-bar>

    <product-table :products="products.content"></product-table>

    <pagination-bar
      :totalPages="products.totalPages"
      :currentPage="products.currentPage"
      :pageSize="products.pageSize"
    ></pagination-bar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ProductTable from "@/components/product/ProductTable.vue";
import PaginationBar from "@/components/common/PaginationBar.vue";
import FilterBar from "@/components/common/FilterBar.vue";

export default {
  components: { ProductTable, PaginationBar, FilterBar },
  computed: {
    ...mapState(["products", "checkingProduct"]),
    ...mapGetters(["filterParam"]),
  },
  methods: {
    ...mapActions([
      "getProducts",
      "getCartProducts",
      "addToCart",
      "setCheckingProduct",
      "setProductFilter",
    ]),
    addConfirmed() {
      this.addToCart();
    },
    removeCheckingProduct() {
      this.setCheckingProduct({ id: null, quantity: null });
    },
    onFilterChange() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
    this.getCartProducts();
    this.setProductFilter({
      priceSliders: {
        simple: 30,
        rangeSlider: [0, 1000000],
        range: {
          min: 0,
          max: 1000000,
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
    });
  },
};
</script>
