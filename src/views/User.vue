<template>
  <div class="user">
    <div class="header" @click="toedit">
      <div class="avatar">
        <img :src="base + user.head_img" alt="" />
      </div>
      <div class="info">
        <div class="name">
          <span
            class="iconfont"
            :class="user.gender === 1 ? 'iconxingbienan' : 'iconxingbienv'"
          ></span>
          <span>{{ user.nickname }}</span>
        </div>
        <div class="time">{{ user.create_date | time }}</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem to="/myfollow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navitem>
    <hm-navitem to="/usermoment"
      ><template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem to="/userstar">
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem>设置 </hm-navitem>
    <div class="btn">
      <van-button type="danger" block @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  data() {
    return {
      user: ''
    }
  },
  async created() {
    const id = localStorage.getItem('id')
    const res = await this.$axios.get(`/user/${id}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    toedit() {
      this.$router.push('/useredit')
    },
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定退出本系统吗?'
        })
      } catch {
        return this.$toast('取消退出')
      }
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.$toast('退出成功')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 20px 20px;
  align-items: center;
  border-bottom: 5px solid #dddddd;
  .avatar {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    font-size: 14px;
    padding-left: 10px;
    flex: 1;
    .iconxingbienv {
      color: pink;
      margin-right: 5px;
    }
    .iconxingbienan {
      color: blue;
      margin-right: 5px;
    }
  }
  .time {
    margin-top: 10px;
  }
}
.btn {
  padding: 20px;
}
</style>
