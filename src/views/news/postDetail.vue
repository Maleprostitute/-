<template>
  <div class="post-detail">
    <div class="header">
      <div class="arrow" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="followed" v-if="data.has_follow" @click="unfollow">已关注</div>
      <div class="follow" v-else @click="follow">关注</div>
    </div>
    <div class="content">
      <h4 class="title">{{ data.title }}</h4>
      <div class="name">
        <span class="nickname" v-if="data.user">{{ data.user.nickname }}</span>
        <span class="time">{{ data.create_date | time }}</span>
      </div>
      <div class="content-content" v-if="data.type === 1" v-html="data.content"></div>
      <video :src="getUrl(data.content)" controls autoplay v-else muted></video>
      <div class="buttons">
        <div class="good" @click="like" :class="{ red: data.has_like }">
          <span class="iconfont icondianzan"></span>
          <span>{{ data.like_length }}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <h3>精彩跟帖</h3>
      <hm-comment v-for="item in list" :key="item.id" :item="item" @reply="onreply"></hm-comment>
    </div>
    <div class="footer" v-if="isshow">
      <div class="search">
        <input type="text" placeholder="回复" @focus="onfocus" />
      </div>
      <span class="iconfont iconpinglun-"></span>
      <span class="iconfont iconshoucang" :class="{ red: data.has_star }" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <div class="foot" v-else>
      <textarea name id ref="textarea" v-model="texta" :placeholder="'回复' + name" @blur='onblur'></textarea>
      <van-button type="primary" @click="send">发送</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      list: '',
      texta: '',
      isshow: true,
      id: '',
      name: ''
    }
  },
  created() {
    this.getInfo()
    this.getComment()
    this.$bus.$on('reply', async(id, name) => {
      this.id = id
      this.name = name
      this.isshow = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    })
  },
  destroyed() {
    this.$bus.$off('reply')
  },
  methods: {
    async onreply(id, name) {
      this.id = id
      this.name = name
      this.isshow = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send() {
      if (!this.texta) {
        return this.$toast.fail('回复不能为空')
      }
      const res = await this.$axios.post(`/post_comment/${this.data.id}`, {
        content: this.texta,
        parent_id: this.id
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.texta = ''
        this.isshow = true
        this.id = ''
        this.name = ''
        this.getInfo()
        this.getComment()
      }
    },
    async onfocus() {
      this.isshow = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    onblur() {
      if (!this.texta) {
        this.isshow = true
        this.replyId = ''
        this.nickname = ''
      }
    },
    async getComment() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async star() {
      if (this.nologin()) return
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_star/${id}`)
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async like() {
      if (this.nologin()) return
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async getInfo() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.data = data
      }
    },
    nologin() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      }
    },
    async follow() {
      if (this.nologin()) return
      const id = this.data.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async unfollow() {
      const id = this.data.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    getUrl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.foot {
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  z-index: 999;
  bottom: 0;
  margin-left: -20px;
  align-items: flex-end;
  background-color: #fff;
  border-top: 1px solid #ccc;
  justify-content: space-around;
}
textarea {
  width: 260px;
  height: 80px;
  font-size: 14px;
  background-color: #ccc;
  border: none;
  padding: 10px;
  border-radius: 5px;
}
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
    border-bottom: 3px solid #ccc;
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
    .content-content {
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
      .red {
        border: 1px solid red;
      }
    }
  }
  .footer {
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    z-index: 9999;
    background-color: #fff;
    .search {
      width: 170px;
      height: 30px;
      input {
        width: 100%;
        height: 100%;
        background-color: #cccccc;
        border-radius: 15px;
        border: none;
        font-size: 14px;
        padding-left: 15px;
      }
    }
    .red {
      color: red;
    }
    span {
      font-size: 25px;
      position: relative;
      padding-right: 30px;
    }
    .iconpinglun-::after {
      content: '111';
      position: absolute;
      text-align: center;
      color: #fff;
      font-size: 10px;
      top: -2px;
      left: 4px;
      width: 30px;
      height: 12px;
      border-radius: 6px;
      background-color: red;
    }
  }
}
h3 {
  text-align: center;
  font-size: 22px;
  padding: 20px 0;
}
</style>
