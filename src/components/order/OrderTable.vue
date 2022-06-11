<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th id="product-index" scope="col">#</th>
          <th id="product-name" scope="col">상품명</th>
          <th id="product-price" scope="col">가격</th>
          <th id="product-stock" scope="col">주문수량</th>
        </tr>
      </thead>
      <tbody>
        <order-product-row
          v-for="(product, index) in order.orderProducts"
          :key="product.id"
          :index="index"
          :product="product"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import OrderProductRow from "@/components/order/OrderProductRow.vue";

const orderHelper = createNamespacedHelpers("order");

export default {
  props: {
    order: Object,
  },
  components: {
    OrderProductRow,
  },
  computed: {
    ...orderHelper.mapState({
      orders: (state) => state.orders,
    }),
  },
};
</script>
