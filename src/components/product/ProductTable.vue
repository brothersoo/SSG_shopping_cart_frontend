<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">상품명</th>
          <th scope="col">가격</th>
          <th scope="col">재고수</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <product-row
          v-for="(product, index) in products"
          :key="product.id"
          :index="index"
          :product="product"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductRow from "./ProductRow.vue";

export default {
  props: {
    products: Array,
  },
  components: { ProductRow },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.products.length;
    },
  },
};
</script>
