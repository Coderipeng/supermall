<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <div v-for="tables in paramInfo.rule.tables">
      <table v-for="(table, index) in tables" class="info-size" :key="index">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
    </div>

    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.info.set">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      paramInfo: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .info-size {
    display: flex;
    margin-left: 20px;
  }

  .info-size tr {
    width: 80px;
    height: 40px;
    align-content: center;
    font-size: 12px;
  }

  .info-param {
    margin-left: 20px;
  }

  .info-param-key {
    width: 60px;
    height: 40px;
  }

  .param-value {
    color: red;
  }
</style>
