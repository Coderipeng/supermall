<template>
  <div>
    <div>{{detailInfo.detailImage[0].desc}}</div>
    <div>{{detailInfo.detailImage[0].key}}</div>
    <div class="close-model" v-for="item in detailInfo.detailImage[0].list">
      <img :src="item" @load="goodsImageLoaded">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      goodsImageLoaded () {
        this.$emit('goodsImageLoaded')
      }
    }
  }
</script>

<style scoped>
  .close-model img {
    width: 100vw;
  }
</style>
