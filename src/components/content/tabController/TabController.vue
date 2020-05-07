<template>
  <div class="tab-controller">
    <div v-for="(item, index) in title" @click="tabClick(index)" class="tabCtr-item" :class="{active: index === currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabController",
    props: {
      title: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-controller {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    text-align: center;
    background: #f6f6f6;
  }

  .tabCtr-item {
    flex: 1;
  }

  .tabCtr-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
