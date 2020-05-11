<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-controller :title="title" @tabClick="tabCtrClick" ref="tabController1" class="tabController" v-show="isShowTabContr"></tab-controller>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swipperImageLoaded="swipperImageLoaded"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-controller :title="title" @tabClick="tabCtrClick" ref="tabController2"></tab-controller>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import HomeSwiper from "./ChildrenComps/HomeSwiper";
  import RecommendView from "./ChildrenComps/RecommendView";
  import FeatureView from "./ChildrenComps/FeatureView";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin"
  import {getHomeMultidata, getHomeGoods} from 'network/home';

  export default {
    name: "Home",
    components: {
      GoodsList,
      HomeSwiper,
      NavBar,
      RecommendView,
      FeatureView,
      TabController,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        title: ['热门', '精选', '流行'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabControllerOffset: 0,
        isShowTabContr: false,
        saveY: 0
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },
      tabCtrClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabController2.currentIndex = index
        this.$refs.tabController1.currentIndex = index
      },
      // backTopClick() {
      //   this.$refs.scroll.scrollTo(0, 0, 500)
      // },
      contentScroll(position) {
        //判断是否显示回顶部按钮
        this.isShowTop = (-position.y) > 1000
        //判断tabController是否吸顶
        //this.isShowTabContr = (-position.y) > this.tabControllerOffset
        this.listenShowBackTop(position)
      },
      loadMore() {
        getHomeGoods(this.currentType)
      },
      swipperImageLoaded() {
        this.tabControllerOffset = this.$refs.tabController2.$el.offsetTop
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('imageLoaded', () => {
        refresh()
      })
    },
    destroyed() {
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tabController {
    position: relative;
    z-index: 9;
  }
</style>
