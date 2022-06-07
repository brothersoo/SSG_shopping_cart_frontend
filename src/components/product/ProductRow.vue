<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ product.name }}</td>
    <td>{{ product.price | moneyFormat }}</td>
    <td>{{ product.stock }}</td>
    <td>
      <b-form-spinbutton
        id="sb-product-quantity"
        v-model="selectedQuantity"
        :min="minQuantityToCart"
        :max="product.stock"
      />
    </td>
    <td>
      <b-icon
        v-if="isInStock"
        icon="cart4"
        scale="2"
        variant="warning"
        @click="checkIfIsAlreadyInCart"
      ></b-icon>
      <b-icon v-else icon="cart-x" scale="2" variant="secondary"></b-icon>
    </td>
  </tr>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const productHelper = createNamespacedHelpers("product");
const cartHelper = createNamespacedHelpers("cart");
const alertHelper = createNamespacedHelpers("alert");

export default {
  created() {
    this.$parent.$on("addConfirmed", this.addToCart);
  },
  props: {
    index: Number,
    product: Object,
  },
  data() {
    return {
      selectedQuantity: this.product.stock > 0 ? 1 : 0,
    };
  },
  computed: {
    ...cartHelper.mapState({
      cartProducts: (state) => state.cartProducts,
    }),
    minQuantityToCart() {
      return this.product.stock !== 0 ? 1 : 0;
    },
    isInStock() {
      return this.product.stock > 0;
    },
  },
  methods: {
    ...productHelper.mapActions(["setCheckingProduct"]),
    ...cartHelper.mapActions(["addToCart"]),
    ...alertHelper.mapMutations([
      "SET_STOCK_LEFT",
      "SET_ADDABLE_QUANTITY",
      "SHOW_QUANTITY_EXCEEDED_ALERT",
    ]),
    getSameProductInCart() {
      let group = this.product.productGroup.name;
      if (group in this.cartProducts) {
        for (let cartProduct of this.cartProducts[group]) {
          if (cartProduct.product.id === this.product.id) {
            return cartProduct;
          }
        }
      }
      return null;
    },
    isTotalQuantityOverStock(sameProductInCart) {
      return (
        this.selectedQuantity + sameProductInCart.quantity > this.product.stock
      );
    },
    checkIfIsAlreadyInCart() {
      this.setCheckingProduct({
        id: this.product.id,
        quantity: this.selectedQuantity,
      });
      let sameProductInCart = this.getSameProductInCart();
      if (sameProductInCart) {
        if (this.isTotalQuantityOverStock(sameProductInCart)) {
          this.SET_STOCK_LEFT(this.product.stock);
          this.SET_ADDABLE_QUANTITY(
            this.product.stock - sameProductInCart.quantity
          );
          this.SHOW_QUANTITY_EXCEEDED_ALERT(3);
        } else {
          this.$bvModal.show("existing-product-alert-modal");
        }
      } else {
        this.addToCart();
      }
    },
  },
  filters: {
    moneyFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    },
  },
};
</script>
