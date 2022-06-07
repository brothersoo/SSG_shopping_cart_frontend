<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination pagination-lg justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        :class="{ 'page-item': true, active: index === currentPage }"
        v-for="index in totalPages"
        :key="index"
      >
        <a class="page-link" @click="getPage(index)">{{ index }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const productHelper = createNamespacedHelpers("product");

export default {
  props: {
    totalPages: Number,
    currentPage: Number,
    pageSize: Number,
  },
  methods: {
    ...productHelper.mapActions(["getProducts"]),
    getPage(index) {
      if (index !== this.currentPage) {
        this.getProducts(index);
      }
    },
  },
};
</script>

<style scoped>
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  background: #ffc107;
  border-color: #ffc107;
}
.page-link {
  color: #ffc107;
}
</style>
