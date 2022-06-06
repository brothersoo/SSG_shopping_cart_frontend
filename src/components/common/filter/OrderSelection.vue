<template>
  <div id="order-selection">
    <b-form-select
      v-model="productFilter.orderSelection.selected"
      :options="productFilter.orderSelection.options"
      class="mb-3"
      @change="onFilterChange"
    >
      <template #first>
        <b-form-select-option :value="null" disabled
          >정렬 기준</b-form-select-option
        >
      </template>
    </b-form-select>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    onFilterChange: Function,
  },
  computed: {
    ...mapState(["productFilter"]),
  },
};
</script>

<style scoped>
#order-selection {
  width: 100px;
  display: inline-block;
}
</style>
