export default {
  addGoodsCount (state, playload) {
    playload.count += 1
  },
  addGoodsToCart (state, playload) {
    playload.checked = true
    state.cartList.push(playload)
  }
}
