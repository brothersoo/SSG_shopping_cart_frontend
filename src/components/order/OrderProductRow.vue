<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ product.productName }}</td>
    <td>{{ product.price | moneyFormat }}</td>
    <td>{{ product.quantity }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    index: Number,
    product: Object,
  },
  filters: {
    moneyFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    },
  },
};
</script>
