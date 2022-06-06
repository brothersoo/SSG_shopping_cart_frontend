<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th id="product-index" scope="col">#</th>
          <th id="product-name" scope="col">상품명</th>
          <th id="product-price" scope="col">가격</th>
          <th id="product-stock" scope="col">재고수</th>
          <th id="quantity-selection" scope="col">추가 수량</th>
          <th id="add-to-cart-button" scope="col">장바구니 담기</th>
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
};
</script>

<style>
#product-index {
  width: 10%;
}
#product-name {
  width: 40%;
}
#product-price {
  width: 10%;
}
#product-stock {
  width: 20%;
}
#quantity-selection {
  width: 10%;
}
#add-to-cart-button {
  width: 10%;
}
</style>
