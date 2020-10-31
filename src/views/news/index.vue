<template>
  <div class="index">
    <div class="index-h">
      <div class="arrow1">
        <span class="iconfont iconnew" @click="$router.push('/wowowo')"></span>
      </div>
      <div class="search" @click="$router.push(`/search`)">
        <span class="iconfont iconsearch"></span>
        <span class="title">搜索新1111闻</span>
      </div>
      <div class="arrow2">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-sticky>
      <div class="arrow0" @click="$router.push('/manage')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-tab v-for="item in tab" :title="item.name" :key="item.id">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <hm-post v-for="items in list" :key="items.id" :post="items"></hm-post>
          </van-list>
        </van-tab>
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      tab: '',
      active: 2,
      list: '',
      pageSize: 5,
      pageIndex: 1,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getTab()
  },
  methods: {
    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.loading = true
      this.list = []
      this.pageIndex = 1
      this.getNewlist(this.tab[this.active].id)
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getNewlist(this.tab[this.active].id)
      }, 1000)
    },
    async getNewlist(id) {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    async getTab() {
      if (localStorage.getItem('list')) {
        const list = JSON.parse(localStorage.getItem('list'))
        this.tab = list
        this.getNewlist(this.tab[this.active].id)
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tab = data
        this.getNewlist(this.tab[this.active].id)
      }
    }
  },
  watch: {
    active(val) {
      this.finished = false
      this.loading = true
      this.list = []
      this.pageIndex = 1
      this.getNewlist(this.tab[this.active].id)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-tabs__wrap {
  width: 85%;
}
.arrow0 {
  position: absolute;
  right: 0;
  width: 15%;
  z-index: 10000;
  text-align: center;
  height: 44px;
  line-height: 44px;
  background-color: #fff;
}
.index-h {
  background-color: red;
  display: flex;
  height: 50px;
  line-height: 50px;
  color: #fff;
  .arrow1 {
    text-align: center;
    width: 80px;
    span {
      font-size: 55px;
    }
  }
  .search {
    margin: 8px;
    height: 34px;
    line-height: 34px;
    border-radius: 17px;
    background-color: #f97979;
    text-align: center;
    flex: 1;
    font-size: 16px;
  }
  .arrow2 {
    text-align: center;
    width: 80px;
    span {
      font-size: 25px;
    }
  }
}
</style>
