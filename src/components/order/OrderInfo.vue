<template>
  <div>
    <order-status-bar :order="order"></order-status-bar>
    <order-table :key="order.id" :order="order"></order-table>
    <br />
    <br />
  </div>
</template>

<script>
import OrderStatusBar from "./OrderStatusBar.vue";
import OrderTable from "./OrderTable.vue";

export default {
  props: {
    order: Object,
  },
  components: { OrderTable, OrderStatusBar },
};
</script>
