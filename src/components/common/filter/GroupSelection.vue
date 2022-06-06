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
      this.buttons.push({ data: group, caption: group.name, state: true });
    }
  },
  computed: {
    selectedProductGroups() {
      return this.buttons.filter((btn) => btn.state).map((btn) => btn.data);
    },
  },
  methods: {
    ...mapActions(["setSelectedProductGroup", "getProducts"]),
    productGroupToggle() {
      this.setSelectedProductGroup(this.selectedProductGroups);
      this.getProducts();
    },
  },
};
</script>
