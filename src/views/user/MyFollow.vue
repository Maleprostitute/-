<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="avatra">
        <img :src="$base + item.head_img" alt="" />
      </div>
      <div class="content">
        <div class="title">{{ item.nickname }}</div>
        <div class="time">{{ item.create_date | time }}</div>
      </div>
      <div class="follow">
        <van-button round type="info" @click="unfollow(item.id)"
          >取消关注</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getFollow()
  },
  data() {
    return {
      list: ''
    }
  },
  methods: {
    async getFollow() {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确认取消?'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getFollow()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-follow {
  .item {
    display: flex;
    height: 80px;
    align-items: center;
    .avatra {
      width: 40px;
      height: 40px;
      margin: 0 20px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .content {
      font-size: 16px;
      flex: 1;
      .time {
        font-size: 14px;
        color: #ccc;
      }
    }
    .follow {
      transform: scale(0.8);
      margin-right: 20px;
    }
  }
}
</style>
