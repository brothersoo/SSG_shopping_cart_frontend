<template>
  <table id="filter-bar">
    <tr>
      <td>가격</td>
      <td>정렬</td>
      <td>상품 그룹</td>
    </tr>
    <tr>
      <td v-if="productFilter.priceSlider.value[0]">
        <base-slider
          v-model="productFilter.priceSlider.value"
          :key="productFilter.priceSlider.key"
          type="warning"
          :connect="true"
          :range="productFilter.priceSlider.range"
          :options="productFilter.priceSlider.options"
          @change="onFilterChange"
          style="width: 250px"
        ></base-slider>
      </td>
      <td>
        <order-selection :onFilterChange="onFilterChange"></order-selection>
      </td>
      <td style="width: 500px">
        <group-selection :groups="productGroups"></group-selection>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BaseSlider from "@/components/common/filter/BaseSlider.vue";
import OrderSelection from "@/components/common/filter/OrderSelection.vue";
import GroupSelection from "@/components/common/filter/GroupSelection.vue";

export default {
  props: {
    onFilterChange: Function,
  },
  computed: {
    ...mapState(["productFilter"]),
    ...mapGetters(["productGroups"]),
  },
  components: { BaseSlider, OrderSelection, GroupSelection },
};
</script>

<style scoped>
#filter-bar {
  margin: auto;
  width: 50%;
  padding: 10px;
}
#filter-bar > tr > td {
  padding-left: 35px;
  padding-right: 35px;
}
</style>
