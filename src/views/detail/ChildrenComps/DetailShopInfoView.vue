<template>
  <div class="shop-info">
    <div class="icon-name">
      <img :src="shopInfo.logo">
      <span class="title">{{shopInfo.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shopInfo.sells}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shopInfo.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfoView",
    props: {
      shopInfo: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>

  .icon-name img{
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }

  .title {
    font-size: 20px;
  }

  .shop-middle {
    margin: 20px 10px 20px 20px;
    display: flex;
  }

  .shop-middle-item {
    flex: 1;
  }

  .score {
    color: green;
  }

  .better {
    color: green;
  }

  .score-better {
    color: #ff5777;
  }

  .better-more {
    color: #ff5777;
  }

</style>
