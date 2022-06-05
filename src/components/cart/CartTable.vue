<template>
  <div>
    <h2>{{ type }}</h2>

    <b-form-checkbox-group
      id="cart-product-checkbox-group"
      v-model="checkedCartProducts[type]"
      name="checkedCartProducts"
    >
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">선택</th>
            <th scope="col">상품명</th>
            <th scope="col">판매가</th>
            <th scope="col">구매수량</th>
            <th scope="col">구매금액</th>
            <th scope="col">장바구니에서 제거</th>
          </tr>
        </thead>
        <tbody>
          <product-row
            v-for="(cartProduct, index) in cartProducts"
            :key="cartProduct.id"
            :index="index"
            :cartProduct="cartProduct"
          />
        </tbody>
      </table>
    </b-form-checkbox-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductRow from "@/components/cart/CartProductRow.vue";

export default {
  props: {
    cartProducts: Array,
    type: String,
  },
  components: {
    ProductRow,
  },
  computed: {
    ...mapState(["checkedCartProducts"]),
  },
};
</script>
