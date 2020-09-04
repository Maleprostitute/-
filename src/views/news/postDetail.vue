<template>
  <div class="post-detail">
    <div class="header">
      <div class="arrow" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="followed" v-if="false">已关注</div>
      <div class="follow" v-else>关注</div>
    </div>
    <div class="content">
      <h4 class="title">{{ data.title }}</h4>
      <div class="name">
        <span class="nickname" v-if="data.user">{{ data.user.nickname }}</span>
        <span class="time">{{ data.create_date | time }}</span>
      </div>
      <div
        class="content-content"
        v-if="data.type === 1"
        v-html="data.content"
      ></div>
      <video :src="getUrl(data.content)" controls autoplay v-else muted></video>
      <div class="buttons">
        <div class="good">
          <span class="iconfont icondianzan"></span>
          <span>11</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ''
    }
  },
  async created() {
    const id = this.$route.params.id
    const res = await this.$axios.get(`/post/${id}`)
    const { data, statusCode } = res.data
    if (statusCode === 200) {
      this.data = data
    }
  },
  methods: {
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding: 0 20px;
  .header {
    display: flex;
    height: 50px;
    line-height: 50px;

    .arrow {
      width: 50px;
      line-height: 50px;
      text-align: left;
      .iconjiantou2 {
        font-size: 20px;
      }
    }
    .logo {
      line-height: 50px;
      flex: 1;
      text-align: left;
      .iconnew {
        font-size: 60px;
      }
    }
    .followed,
    .follow {
      width: 65px;
      height: 24px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      margin-top: 13px;
    }
    .follow {
      background-color: red;
    }
    .followed {
      border: 1px solid gray;
    }
  }
  .content {
    h4 {
      font-size: 20px;
      margin: 10px 0;
    }
    .name {
      font-size: 14px;
      color: gray;
      .time {
        padding-left: 20px;
      }
    }
    /deep/.content-content {
      font-size: 16;
      /deep/ img {
        width: 100%;
      }
    }
    video {
      width: 100%;
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      padding: 20px 50px;
      .good,
      .share {
        width: 80px;
        height: 30px;
        border-radius: 20px;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        border: 1px solid gray;
        span:first-child {
          margin-right: 5px;
        }
        .iconweixin {
          color: greenyellow;
        }
      }
    }
  }
}
</style>
