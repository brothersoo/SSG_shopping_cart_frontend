<template>
  <div class="cart">
    <div v-for="(productGroup, index) in productGroups" :key="index">
      <cart-table
        v-if="
          productGroup in cartProducts && cartProducts[productGroup].length > 0
        "
        :cartProducts="cartProducts[productGroup]"
        :type="productGroup"
      ></cart-table>
      <br />
    </div>

    <template v-if="everyCartProductIds.length > 0">
      <h3>
        결제 예정금액:
        {{
          checkedCartProductsPrice !== 0
            ? checkedCartProductsPrice
            : everyCartProductsPrice | moneyFormat
        }}
      </h3>

      <br />

      <b-button size="lg" variant="warning">구매하기</b-button>
    </template>
    <h2 v-else>장바구니가 비어있습니다</h2>
  </div>
</template>

<script>
import CartTable from "@/components/cart/CartTable.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    CartTable,
  },
  computed: {
    ...mapState(["cartProducts"]),
    ...mapGetters([
      "productGroups",
      "checkedCartProductsPrice",
      "everyCartProductsPrice",
      "checkedCartProductIds",
      "everyCartProductIds",
    ]),
  },
  methods: {
    ...mapActions(["getCartProducts"]),
  },
  created() {
    this.getCartProducts();
  },
  filters: {
    moneyFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    },
  },
};
</script>
