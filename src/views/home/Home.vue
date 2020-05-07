<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-controller class="tab-controller" :title="title" @tabClick="tabCtrClick"></tab-controller>
    <goods-list :goods="showGoods"/>
    <ul>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
      <li>我都快</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import HomeSwiper from "./ChildrenComps/HomeSwiper";
  import RecommendView from "./ChildrenComps/RecommendView";
  import FeatureView from "./ChildrenComps/FeatureView";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";

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
    },
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
        currentType: 'pop'
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
          console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
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
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-controller {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
