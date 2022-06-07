<template>
  <b-button-group size="lg">
    <b-button
      v-for="(button, idx) in buttons"
      :key="idx"
      :pressed.sync="button.state"
      variant="outline-secondary"
      @click="productGroupToggle"
    >
      {{ button.caption }}
    </b-button>
  </b-button-group>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import * as productAPI from "@/api/product";

const filterHelper = createNamespacedHelpers("filter");
const productHelper = createNamespacedHelpers("product");

export default {
  props: {
    groups: Array,
  },
  data() {
    return {
      buttons: [],
    };
  },
  created() {
    for (let group of this.groups) {
      this.buttons.push({ data: group, caption: group.name, state: true });
    }
  },
  computed: {
    ...filterHelper.mapGetters(["filterParam"]),
    selectedProductGroups() {
      return this.buttons.filter((btn) => btn.state).map((btn) => btn.data);
    },
  },
  methods: {
    ...filterHelper.mapActions([
      "setPriceRangeFilter",
      "reloadPriceSlider",
      "setSelectedProductGroup",
    ]),
    ...productHelper.mapActions(["getProducts"]),
    productGroupToggle() {
      this.setSelectedProductGroup(this.selectedProductGroups);
      productAPI
        .getPriceRange({ groupIds: this.filterParam.groupIds })
        .then(({ data }) => {
          this.setPriceRangeFilter({
            value: [data.minPrice, data.maxPrice],
            range: {
              min: data.minPrice,
              max: data.maxPrice,
            },
          });
          this.reloadPriceSlider();
          this.getProducts(1);
        });
    },
  },
};
</script>
