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
import { createNamespacedHelpers } from "vuex";
import ProductTable from "@/components/product/ProductTable.vue";
import PaginationBar from "@/components/common/PaginationBar.vue";
import FilterBar from "@/components/common/FilterBar.vue";
import * as productAPI from "@/api/product";

const productHelper = createNamespacedHelpers("product");
const cartHelper = createNamespacedHelpers("cart");
const filterHelper = createNamespacedHelpers("filter");

export default {
  components: { ProductTable, PaginationBar, FilterBar },
  computed: {
    ...productHelper.mapState({
      products: (state) => state.products,
      checkingProduct: (state) => state.checkingProduct,
    }),
    ...filterHelper.mapGetters(["filterParam"]),
  },
  methods: {
    ...productHelper.mapActions(["getProducts", "setCheckingProduct"]),
    ...cartHelper.mapActions(["getCartProducts", "addToCart"]),
    ...filterHelper.mapActions(["setPriceRangeFilter"]),
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
    // TODO : call filter param here??
    productAPI
      .getPriceRange({ groupIds: this.filterParam.groupIds })
      .then(({ data }) => {
        this.setPriceRangeFilter({
          value: [data.minPrice, data.maxPrice],
          range: {
            min: data.minPrice,
            max: data.maxPrice,
          },
        });
      });
    this.getProducts();
    this.getCartProducts();
  },
};
</script>
