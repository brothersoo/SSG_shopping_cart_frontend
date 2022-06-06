<template>
  <table id="filter-bar">
    <tr>
      <td style="width: 200px">가격</td>
      <td style="width: 70px"></td>
      <td>정렬</td>
    </tr>
    <tr>
      <td>
        <base-slider
          v-model="productFilter.priceSlider.rangeSlider"
          type="warning"
          :connect="true"
          :range="productFilter.priceSlider.range"
          :options="productFilter.priceSlider.options"
          @input="onFilterChange"
        ></base-slider>
      </td>
      <td></td>
      <td>
        <order-selection :onFilterChange="onFilterChange"></order-selection>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
import BaseSlider from "./BaseSlider.vue";
import OrderSelection from "@/components/common/OrderSelection.vue";

export default {
  props: {
    onFilterChange: Function,
  },
  computed: {
    ...mapState(["productFilter"]),
  },
  components: { BaseSlider, OrderSelection },
};
</script>

<style scoped>
#filter-bar {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>
