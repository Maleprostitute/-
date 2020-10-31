<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="delactive">
        <div class="info">点击删除以下频道(必须保留4项以上)</div>
        <div class="list">
          <div
            class="item"
            v-for="item in list"
            :key="item.id"
            @click="delItem(item.id)"
          >{{ item.name }}</div>
        </div>
      </div>
      <div class="addactive">
        <div class="info">点击添加以下频道</div>
        <div class="list">
          <div
            class="item"
            v-for="item in delList"
            :key="item.id"
            @click="addItem(item.id)"
          >{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      delList: []
    }
  },
  watch: {
    list: {
      deep: true,
      handler(val) {
        const list = JSON.stringify(this.list)
        const dellist = JSON.stringify(this.delList)
        localStorage.setItem('list', list)
        localStorage.setItem('dellist', dellist)
      }
    }
  },
  methods: {
    delItem(id) {
      if (this.list.length <= 4) {
        return
      }
      const index = this.list.findIndex(item => item.id === id)
      this.delList.push(this.list[index])
      this.list.splice(index, 1)
    },
    addItem(id) {
      const index = this.delList.findIndex(item => item.id === id)
      this.list.push(this.delList[index])
      this.delList.splice(index, 1)
    }
  },
  async created() {
    if (localStorage.getItem('list')) {
      this.list = JSON.parse(localStorage.getItem('list'))
      this.delList = JSON.parse(localStorage.getItem('dellist'))
      return
    }
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
}
.info {
  font-size: 14px;
  color: gray;
  padding: 10px 0;
}
.list {
  overflow: hidden;
  .item {
    float: left;
    width: 65px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid gray;
    font-size: 16px;
    margin: 5px 10px;
  }
}
</style>
