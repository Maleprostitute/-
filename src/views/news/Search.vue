<template>
  <div class="saerch">
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2" @click='back'></span>
      </div>
      <div class="center">
        <input type="search" placeholder="我的老天爷啊" v-model="key" @input='onrecommend' />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="onsearch">搜索</div>
    </div>
     <div class="recommend" v-if='recommendList.length'>
      <div v-for='item in recommendList' :key='item.id' @click='gosearch(item.title)'>{{item.title}}</div>
    </div>
     <div class="yemian" v-else-if='list.length'>
      <hm-post v-for="item in list" :key='item.id' :post='item'></hm-post>
    </div>
     <div class="content" v-else>
      <div class="history">
        <h4>历史记录</h4>
        <div class="item" v-for='item in history' :key="item" @click="gosearch(item)">{{item}}</div>
        <div @click='clear'>清除记录</div>
      </div>
      <div class="hotsearch">
        <h4>热门搜索</h4>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      key: '',
      list: [],
      history: [],
      recommendList: []
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    clear() {
      localStorage.removeItem('history')
      this.history = []
    },
    onrecommend: _.debounce(async function() {
      if (!this.key) {
        this.recommendList = []
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 1000),
    gosearch(title) {
      this.key = title
      this.onsearch()
    },
    async onsearch() {
      if (!this.key) return this.$toast.fail('请输入搜索关键字')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
      this.recommendList = []
    },
    back() {
      if (this.list) {
        this.list = ''
        this.key = ''
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang='less' scoped>
* {
  box-sizing: border-box;
}
.recommend {
  padding: 20px;
  font-size: 14px;
  div {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
}
.content {
   padding-left: 20px;
.history {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
  .item {
  float: left;
  width: 50px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #ccc;
  margin: 0 5px;
  margin-top: 20px;
}
}
h4 {
  font-size: 18px;
}
.header {
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 14px;
  .left,
  .right {
    text-align: center;
    width: 50px;
    height: 30px;
    line-height: 30px;
  }
  .left {
    .iconjiantou2 {
      font-size: 22px;
    }
  }
  .center {
    position: relative;
    flex: 1;
    height: 40;
    input {
      height: 40px;
      width: 100%;
      padding-left: 40px;
      border-radius: 20px;
      border: 1px solid gray;
    }
    .iconsearch {
      position: absolute;
      font-size: 16px;
      top: 50%;
      left: 20px;
      transform: translate(0, -50%);
    }
  }
}

</style>
