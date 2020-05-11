<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button class="check-button" :isChecked="selectAll" @click.native="selectAllClicked"/>
      <span>全选</span>
    </div>

    <div class="price">
      总价: {{totalPrice}}
    </div>

    <div class="calculator">
      去结算: {{checkOut}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex"

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['goodsOfCart']),
      totalPrice () {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      checkOut () {
        return this.goodsOfCart.filter(item => item.checked).length
      },
      //全选
      selectAll() {
        if(this.goodsOfCart.length == 0) return false
        return !this.goodsOfCart.find(item => !item.checked)
      }
    },
    methods: {
      selectAllClicked () {
        if(this.selectAll){
          this.goodsOfCart.forEach(item => item.checked = false)
        }else {
          this.goodsOfCart.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 49px;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }

  .check-area {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculator {
    width: 90px;
    background-color: #ff8198;
    text-align: center;
    color: white;
  }
</style>
