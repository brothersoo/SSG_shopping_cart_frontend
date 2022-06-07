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
        id="sb-cart-product-quantity"
        v-model="selectedQuantity"
        :min="minQuantityToCart"
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
        @click="removeCartProduct"
      ></b-icon>
    </td>
  </tr>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import * as cartAPI from "@/api/cart";

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
    minQuantityToCart() {
      return this.cartProduct.product.stock !== 0 ? 1 : 0;
    },
    totalPrice() {
      return this.cartProduct.product.price * this.cartProduct.quantity;
    },
  },
  methods: {
    ...cartHelper.mapActions(["updateCartProduct", "getCartProducts"]),
    quantityUpdated(quantity) {
      this.updateCartProduct({ cartProductId: this.cartProduct.id, quantity });
    },
    removeCartProduct() {
      cartAPI
        .deleteCartProduct(this.cartProduct.id)
        .then((response) => {
          console.log(response.status);
          this.getCartProducts();
        })
        .catch((err) => {
          console.log(err);
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
