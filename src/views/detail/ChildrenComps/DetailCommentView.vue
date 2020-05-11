<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo[0].user.avatar">
      <span>{{commentInfo[0].user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo[0].content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo[0].created | showDate}}</span>
        <span>{{commentInfo[0].style}}</span>
      </div>
      <div class="info-img">
        <img :src="item" v-for="(item, index) in commentInfo[0].images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentView",
    props: {
      commentInfo: {
        type: Array,
        default: []
      }
    },
    filters: {
      showDate (value) {
        const date = new Date(value * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .info-user {
    margin: 10px 5px;
  }

  .info-detail {
    margin: 10px 5px 15px 5px;
  }

  .info-other {
    margin: 10px 5px;
    font-size: 14px;
  }

  .info-user img{
    height: 40px;
    width: 40px;
  }

  .date {
    margin-right: 15px;
  }

  .info-user span {
    margin-left: 10px;
    color: #ff8198;
  }

  .info-img img {
    width: 100px;
    height: 100px;
  }

  .header-title {
    text-align: center;
  }

  .header-more {
    text-align: right;
  }
</style>
