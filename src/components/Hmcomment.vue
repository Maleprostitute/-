<template>
  <div class="hm-comment">
    <div class="header">
      <div class="avatra">
        <img :src="$base + item.user.head_img" alt="" />
      </div>
      <div class="name">
        <div class="nickname">{{ item.user.nickname }}</div>
        <div class="time">{{ item.create_date | time1 }}</div>
      </div>
      <div class="reply" @click="reply">回复</div>
    </div>
    <hm-floor :count="count" :item="item.parent" v-if="item.parent"></hm-floor>
    <div class="content">{{ item.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      count: this.getcount(0, this.item)
    }
  },
  methods: {
    reply() {
      this.$emit('reply', this.item.id, this.item.user.nickname)
    },
    getcount(num, data) {
      if (data.parent) {
        return this.getcount(num + 1, data.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.hm-comment {
  .header {
    padding: 10px 0;
    font-size: 14px;
    display: flex;
    .avatra {
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      flex: 1;
      padding-left: 5px;
      .time {
        color: gray;
      }
    }
    .reply {
      color: gray;
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #cccccc;
  }
}
</style>
