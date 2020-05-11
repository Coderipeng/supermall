export default {
  addToCart (context, playload) {

    let oldGoods = context.state.cartList.find(item => item.iid === playload.iid)
    if (oldGoods) {
      context.commit('addGoodsCount', oldGoods)
    }else {
      playload.count = 1
      context.commit('addGoodsToCart', playload)
    }
  }
}
