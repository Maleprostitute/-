<template>
  <div class="usermoment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="item" v-for="item in commentList" :key="item.id">
            <div class="time">
              {{ item.create_date | time('YYYY-MM-DD HH:mm') }}
            </div>
            <div class="comment" v-if="item.parent">
              <div class="name">回复:{{ item.parent.user.nickname }}</div>
              <div class="comment-content">{{ item.parent.content }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
            <div class="origin">
              <span class="one-txt-cut">原文:{{ item.post.title }}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentList: '',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageIndex: 1,
      pageSize: 5
    }
  },
  created() {
    this.getMoment()
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getMoment()
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        // 清空列表数据
        this.finished = false
        this.commentList = ''
        this.loading = true
        this.pageIndex = 1
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.getMoment()
      }, 1000)
    },
    async getMoment() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        this.loading = false
        this.refreshing = false
        // loading会自动变true,不在触发.要在false才会再次触发. 所以人工设置触发
        if (data.length < this.pageSize) {
          this.finished = true
          // 此数据默认为false. 设置为true就代表没有数据了.
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  font-size: 14px;
  padding: 20px 10px;
  border-bottom: 1px solid #ccc;
  .time {
    color: gray;
  }
  .comment {
    color: gray;
    padding: 10px;
    background-color: #cccccc;
  }
  .content {
    padding: 10px 0;
  }
  .origin {
    color: gray;
    justify-content: space-between;
    display: flex;
  }
}
</style>
