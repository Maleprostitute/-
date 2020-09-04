<template>
  <div class="user-star">
    <hm-header>我的收藏</hm-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="info">
        <div class="title txt-cut">
          {{ item.title }}
        </div>
        <div class="user">
          <span class="name">{{ item.user.nickname }}</span>
          <span>{{ item.comments.length }}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(item.cover[0].url)" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ''
    }
  },
  created() {
    this.getStar()
  },
  methods: {
    async getStar() {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
      console.log(this.list)
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid gray;
  .info {
    font-size: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user {
      font-size: 14px;
      color: #666666;
      .name {
        padding: 0 20px 0 0;
      }
    }
  }
  .img {
    width: 120px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
