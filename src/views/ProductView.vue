<template>
  <div class="product">
    <b-modal
      id="existing-product-alert-modal"
      @ok="addConfirmed"
      @hidden="removeCheckingProduct"
      >이미 장바구니에 포함되어있는 상품입니다.<br />선택한 수량만큼
      추가하시겠습니까?</b-modal
    >

    <div style="width: 500px">
      <base-slider
        v-model="sliders.rangeSlider"
        type="warning"
        :connect="true"
        :range="sliders.range"
        :options="sliders.options"
      ></base-slider>
    </div>

    <product-table :products="products.content"></product-table>

    <pagination-bar
      :totalPages="products.totalPages"
      :currentPage="products.currentPage"
      :pageSize="products.pageSize"
    ></pagination-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductTable from "@/components/product/ProductTable.vue";
import PaginationBar from "@/components/common/PaginationBar.vue";

import BaseSlider from "@/components/common/BaseSlider.vue";

export default {
  components: { ProductTable, PaginationBar, BaseSlider },
  computed: {
    ...mapState(["products", "checkingProduct"]),
  },
  data() {
    return {
      sliders: {
        simple: 30,
        rangeSlider: [0, 180000],
        range: {
          min: 0,
          max: 180000,
        },
        options: {
          step: 1000,
          tooltips: [true, true],
        },
      },
    };
  },
  methods: {
    ...mapActions([
      "getProducts",
      "getCartProducts",
      "addToCart",
      "setCheckingProduct",
    ]),
    addConfirmed() {
      this.addToCart();
    },
    removeCheckingProduct() {
      this.setCheckingProduct({ id: null, quantity: null });
    },
  },
  created() {
    this.getProducts({ page: 1, size: 10 });
    this.getCartProducts();
  },
};
</script>
