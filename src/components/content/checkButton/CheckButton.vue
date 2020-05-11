<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .checked {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
    border-radius: 50%;
  }
</style>
