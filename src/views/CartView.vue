<template>
  <div class="cart">
    <div>
      <div v-for="(productGroupName, index) in productGroupNames" :key="index">
        <cart-table
          v-if="cartProducts[productGroupName].length > 0"
          :cartProducts="cartProducts[productGroupName]"
          :type="productGroupName"
        ></cart-table>
        <br />
      </div>
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

      <b-button size="lg" variant="warning" @click="order">구매하기</b-button>
    </template>
    <h2 v-else>장바구니가 비어있습니다</h2>
  </div>
</template>

<script>
import CartTable from "@/components/cart/CartTable.vue";
import { createNamespacedHelpers } from "vuex";

const cartHelper = createNamespacedHelpers("cart");
const productGroupHelper = createNamespacedHelpers("productGroup");

import * as orderAPI from "@/api/order";

export default {
  components: {
    CartTable,
  },
  computed: {
    ...cartHelper.mapState({
      cartProducts: (state) => state.cartProducts,
    }),
    ...cartHelper.mapGetters([
      "checkedCartProductsPrice",
      "everyCartProductsPrice",
      "checkedCartProductIds",
      "everyCartProductIds",
    ]),
    ...productGroupHelper.mapGetters(["productGroupNames"]),
  },
  methods: {
    ...cartHelper.mapActions(["getCartProducts"]),
    order() {
      orderAPI
        .order(
          this.checkedCartProductIds.length !== 0
            ? this.checkedCartProductIds
            : this.everyCartProductIds
        )
        .then((response) => {
          console.log(response);
          this.$bvModal.show("order-success-modal");
          this.$router.push("order");
        })
        .catch((err) => {
          console.error(err);
          this.$bvModal.show("order-fail-modal");
        });
    },
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
