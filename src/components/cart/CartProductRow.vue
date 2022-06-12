<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <b-form-checkbox :value="cartProduct"></b-form-checkbox>
    </td>
    <td>{{ cartProduct.product.name }}</td>
    <td>{{ cartProduct.product.price | moneyFormat }}</td>
    <td>
      <b-form-spinbutton
        class="sb-cart-product-quantity"
        v-model="selectedQuantity"
        :min="1"
        :max="cartProduct.product.stock"
        @input="quantityUpdated"
      />
    </td>
    <td>
      {{ totalPrice | moneyFormat }}
    </td>
    <td>
      <b-icon
        icon="trash-fill"
        scale="2"
        variant="danger"
        @click="removeCartProduct(cartProduct)"
      ></b-icon>
    </td>
  </tr>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const cartHelper = createNamespacedHelpers("cart");

export default {
  props: {
    index: Number,
    cartProduct: Object,
  },
  data() {
    return {
      selectedQuantity: this.cartProduct.quantity,
    };
  },
  computed: {
    ...cartHelper.mapState({
      checkedCartProducts: (state) => state.checkedCartProducts,
    }),
    totalPrice() {
      return this.cartProduct.product.price * this.cartProduct.quantity;
    },
  },
  methods: {
    ...cartHelper.mapActions(["updateCartProduct", "removeCartProduct"]),
    quantityUpdated(quantity) {
      this.updateCartProduct({
        cartProductId: this.cartProduct.id,
        quantity,
      });
    },
  },
  filters: {
    moneyFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    },
  },
};
</script>
