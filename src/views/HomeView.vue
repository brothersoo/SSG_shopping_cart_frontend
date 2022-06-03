<template>
  <div class="home">
    <product-list></product-list>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  name: "HomeView",
  components: {
    ProductList,
  },
};
</script>
