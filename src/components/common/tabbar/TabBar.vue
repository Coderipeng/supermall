<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0px;
    right: 0;
    box-shadow: 0 -3px 1px rgba(100,100,100,.2);
  }
</style>
