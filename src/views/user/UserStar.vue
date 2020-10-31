<template>
  <div class="user-star">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
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
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
