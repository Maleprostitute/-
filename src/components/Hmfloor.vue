<template>
  <div>
    <hm-floor :count="count - 1" :item="item.parent" v-if="item.parent"></hm-floor>
    <div class="hmfloor">
      <div class="header">
        <div class="nickname">{{ count }}.{{ item.user.nickname }}</div>
        <div class="time">{{ item.create_date | time1 }}</div>
        <div class="reply" @click="reply">回复11</div>
      </div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    item: Object,
    count: Number
  },
  methods: {
    reply() {
      this.$bus.$emit('reply', this.item.id, this.item.user.nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.hmfloor {
  border: 1px solid gray;
  margin-top: -1px;
  padding: 0 10px;
  .header {
    padding-top: 20px;

    font-size: 14px;
    display: flex;

    .time {
      flex: 1;
      padding-left: 5px;
      color: gray;
    }
    .reply {
      color: gray;
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
