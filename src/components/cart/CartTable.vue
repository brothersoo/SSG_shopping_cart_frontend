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
            <th id="cart-product-index" scope="col">#</th>
            <th id="cart-product-selection" scope="col">선택</th>
            <th id="cart-product-name" scope="col">상품명</th>
            <th id="cart-product-price" scope="col">판매가</th>
            <th id="cart-product-quantity" scope="col">구매수량</th>
            <th id="cart-product-total-price" scope="col">구매금액</th>
            <th id="cart-product-remove-button" scope="col">
              장바구니에서 제거
            </th>
          </tr>
        </thead>
        <tbody>
          <cart-product-row
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
import { createNamespacedHelpers } from "vuex";
import CartProductRow from "@/components/cart/CartProductRow.vue";

const cartHelper = createNamespacedHelpers("cart");

export default {
  props: {
    cartProducts: Array,
    type: String,
  },
  components: {
    CartProductRow,
  },
  computed: {
    ...cartHelper.mapState({
      checkedCartProducts: (state) => state.checkedCartProducts,
    }),
  },
};
</script>

<style>
#cart-product-index {
  width: 5%;
}
#cart-product-selection {
  width: 10%;
}
#cart-product-name {
  width: 35%;
}
#cart-product-price {
  width: 15%;
}
#cart-product-quantity {
  width: 10%;
}
#cart-product-total-price {
  width: 10%;
}
#cart-product-remove-button {
  width: 10%;
}
</style>
