<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <CheckButton @click.native="checkImgClicked" :isChecked="data.checked"/>
    </div>
    <div class="item-img">
      <img :src="data.img">
    </div>
    <div class="item-info">
      <div class="item-title">{{data.title}}</div>
      <div class="item-desc">{{data.desc}}</div>
      <div class="price-nums">
        <div class="price">￥{{data.price}}</div>
        <div class="nums">x5</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkImgClicked () {
        this.data.checked = !this.data.checked
      }
    }
  }
</script>

<style scoped>
  .cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .price-nums {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
  }

  .price-nums .price {
    color: orangered;
    flex: 1;
  }
</style>
