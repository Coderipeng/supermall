<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="goods-title">{{goods.title}}</div>
    <div class="goods-price">
      <span class="now-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="activity-price-text">活动价</span>
    </div>
    <div class="other-info">
      <span class="sell-nums">{{goods.columns[0]}}</span>
      <span class="sellect-nums">{{goods.columns[1]}}</span>
      <span class="translator-info">{{goods.services[goods.services.length - 1].name}}</span>
    </div>
    <div class="service-info">
      <span class="service-item">
        <img :src="goods.services[0].icon">
        <span>{{goods.services[0].name}}</span>
      </span>
      <span class="service-item">
        <img :src="goods.services[1].icon">
        <span>{{goods.services[1].name}}</span>
      </span>
      <span class="service-item">
        <img :src="goods.services[2].icon">
        <span>{{goods.services[2].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseView",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .goods-title {
    margin-top: 10px;
    font-weight: bold;
  }

  .goods-price {
    margin-top: 30px;
  }

  .now-price {
    font-size: 30px;
    font-weight: bold;
    color: firebrick;
    margin-left: 10px;
  }

  .old-price {
    margin-left: 10px;
    text-decoration: line-through;
  }

  .activity-price-text {
    display: inline-block;
    width: 50px;
    height: 22px;
    background: #ff5777;
    border-radius: 10px;
    color: white;
    margin-left: 20px;
    font-size: 14px;
    text-align: center;
    line-height: 22px;
  }

  .other-info {
    margin-top: 40px;
    display: flex;
    border-bottom: 2px solid lightgray;
  }

  .other-info span {
    flex: 1;
    margin-bottom: 5px;
  }

  .sell-nums {
    margin-left: 10px;
  }

  .translator-info {
    margin-right: -10px;
  }

  .service-info {
    display: flex;
    margin: 20px 5px 20px 5px;
    border-bottom: 3px solid lightgray;
    padding-bottom: 20px;
  }

  .service-item {
    flex: 1;
    font-size: 12px;
  }

  .service-item img {
    width: 16px;
    height: 16px;
  }
</style>
