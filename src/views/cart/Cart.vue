<template>
  <div id="cart">
    <nav-bar class="cart-navbar">
      <div slot="center">购物车({{count}})</div>
    </nav-bar>
    <scroll class="cart-scroll">
      <cart-list :cart-list="cartlist"/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./ChildrenComps/CartList";
  import Scroll from "components/common/scroll/Scroll";
  import CartBottomBar from "./ChildrenComps/CartBottomBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
      ...mapGetters({
        count: 'cartCount',
        cartlist : 'goodsOfCart'
      })
    }
  }
</script>

<style scoped>
  .cart-navbar {
    background-color: var(--color-tint);
    font-size: 16px;
    color: #fff;
  }

  .cart-scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
  }
</style>
