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
import { mapGetters, mapActions } from "vuex";
import * as productAPI from "@/api/product";

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
    ...mapGetters(["filterParam"]),
    selectedProductGroups() {
      return this.buttons.filter((btn) => btn.state).map((btn) => btn.data);
    },
  },
  methods: {
    ...mapActions([
      "setSelectedProductGroup",
      "getProducts",
      "setPriceRangeFilter",
      "reloadPriceSlider",
    ]),
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
        });
      this.getProducts();
    },
  },
};
</script>
