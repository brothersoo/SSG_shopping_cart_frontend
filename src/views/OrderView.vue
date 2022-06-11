<template>
  <div>
    <div v-if="orders.length !== 0">
      <order-info
        v-for="order in orders"
        :key="order.id"
        :order="order"
      ></order-info>
    </div>
    <h2>주문 내역이 없습니다</h2>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import OrderInfo from "@/components/order/OrderInfo.vue";

const orderHelper = createNamespacedHelpers("order");

export default {
  components: { OrderInfo },
  methods: {
    ...orderHelper.mapActions(["getOrders"]),
  },
  created() {
    this.getOrders();
  },
  computed: {
    ...orderHelper.mapState({
      orders: (state) => state.orders,
    }),
  },
};
</script>
