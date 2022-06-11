<template>
  <div class="product">
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
const userHelper = createNamespacedHelpers("user");

export default {
  components: { ProductTable, PaginationBar, FilterBar },
  computed: {
    ...productHelper.mapState({
      products: (state) => state.products,
      checkingProduct: (state) => state.checkingProduct,
    }),
    ...filterHelper.mapGetters(["filterParam"]),
    ...userHelper.mapState({
      access_token: (state) => state.access_token,
    }),
  },
  methods: {
    ...productHelper.mapActions(["getProducts"]),
    ...cartHelper.mapActions(["getCartProducts"]),
    ...filterHelper.mapActions(["setPriceRangeFilter"]),
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
    if (this.access_token) {
      this.getCartProducts();
    }
  },
};
</script>
