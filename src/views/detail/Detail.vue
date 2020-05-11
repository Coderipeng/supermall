<template>
  <div id="detail">
    <detail-nav-bar class="detailnavbar" @detailNavClick="detailNavClick" ref="detailnavbar"/>
    <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll">
      <detail-swipper :topImages="topImages"/>
      <detail-base-view :goods="goods"/>
      <detail-shop-info-view :shopInfo="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" ref="goods" @goodsImageLoaded="goodsImageLoaded"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-view :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addGoodsToCart="addGoodsToCart"/>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./ChildrenComps/DetailNavBar";
  import {getDetail,Goods,Shop, getRecommend} from "network/detail";
  import DetailSwipper from "./ChildrenComps/DetailSwipper";
  import DetailBaseView from "./ChildrenComps/DetailBaseView";
  import DetailShopInfoView from "./ChildrenComps/DetailShopInfoView";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./ChildrenComps/DetailGoodsInfo";
  import DetailParamInfo from "./ChildrenComps/DetailParamInfo";
  import DetailCommentView from "./ChildrenComps/DetailCommentView";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./ChildrenComps/DetailBottomBar";
  import {itemListenerMixin, backTopMixin} from "common/mixin"

  console.log(Goods);
  export default {
    name: "Detail",
    components: {
      DetailGoodsInfo,
      DetailSwipper,
      DetailNavBar,
      DetailBaseView,
      DetailShopInfoView,
      DetailParamInfo,
      DetailCommentView,
      GoodsList,
      DetailBottomBar,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: [],
        recommend: [],
        locationPos: [],
        currentIndex: 0
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        console.log(res);
        this.topImages = res.result.itemInfo.topImages
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        this.shopInfo = new Shop(res.result.shopInfo)
        this.detailInfo = res.result.detailInfo
        this.paramInfo = res.result.itemParams
        if(res.result.rate.cRate != 0) {
          this.commentInfo = res.result.rate.list
        }
      })

      getRecommend().then(res => {
        console.log(res);
        this.recommend = res.data.list
      })
    },
    mixins: [itemListenerMixin, backTopMixin],
    mounted() {

    },
    methods: {
      goodsImageLoaded () {
        this.$refs.scroll.refresh()
        this.locationPos = []
        this.locationPos.push(0)
        this.locationPos.push(this.$refs.param.$el.offsetTop)
        this.locationPos.push(this.$refs.comment.$el.offsetTop)
        this.locationPos.push(this.$refs.recommend.$el.offsetTop)
        this.locationPos.push(Number.MAX_VALUE)
        console.log(this.locationPos);
      },
      detailNavClick (index) {
        console.log(this.locationPos[index]);
        this.$refs.scroll.scrollTo(0, -this.locationPos[index])
      },
      contentScroll (position) {
        let positionY = -position.y
        for (let i = 0; i < this.locationPos.length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.locationPos[i] && positionY < this.locationPos[i+1])) {
            this.currentIndex = i
            this.$refs.detailnavbar.currentIndex = this.currentIndex
          }
        }
        //是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addGoodsToCart () {
        const goods = {}
        goods.img = this.topImages[0]
        goods.desc = this.goods.desc
        goods.price = this.goods.realPrice
        goods.title = this.goods.title
        goods.iid = this.iid

        this.$store.dispatch('addToCart', goods)
      }
    }
  }
</script>

<style scoped>
  #detail {
    background: white;
    position: relative;
    z-index: 9;
    height: 100vh;
  }

  .detailnavbar {
    background: white;
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
