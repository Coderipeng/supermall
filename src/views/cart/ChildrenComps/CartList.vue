<template>
  <div class="cart-list">
    <div v-for="(item, index) in cartList">
      <cart-list-item :data="item"/>
    </div>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    props: {
      cartList: {
        type: Array,
        default: []
      }
    },
    components: {
      CartListItem
    }
  }
</script>

<style scoped>

</style>
