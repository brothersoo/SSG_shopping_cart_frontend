<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th id="product-index" scope="col"></th>
          <th id="product-name" scope="col">상품명</th>
          <th id="product-price" scope="col">가격</th>
          <th id="product-stock" scope="col">재고수</th>
          <th id="quantity-selection" scope="col"></th>
          <th id="add-to-cart-button" scope="col"></th>
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

<style>
#product-index {
  width: 10em;
}
#product-name {
  width: 40em;
}
#product-price {
  width: 10em;
}
#product-stock {
}
#quantity-selection {
  width: 10em;
}
#add-to-cart-button {
  width: 20em;
}
</style>
