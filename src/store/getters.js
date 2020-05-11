export default {
  cartCount(state) {
    return state.cartList.length
  },
  goodsOfCart(state) {
    return state.cartList
  }
}
