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
import { mapActions } from "vuex";

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
      this.buttons.push({ caption: group, state: true });
    }
  },
  computed: {
    selectedProductGroupNames() {
      return this.buttons.filter((btn) => btn.state).map((btn) => btn.caption);
    },
  },
  methods: {
    ...mapActions(["setProductFilter", "getProducts"]),
    productGroupToggle() {
      this.setProductFilter({
        productGroupSelection: this.selectedProductGroupNames,
      });
      this.getProducts();
    },
  },
};
</script>
