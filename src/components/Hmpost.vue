<template>
  <div @click="$router.push(`/postdetail/${post.id}`)">
    <div class="item0" v-if="post.type === 2">
      <div class="info0">
        <div class="txt-cut">
          {{ post.title }}
        </div>
        <div class="img" v-if="post.cover[0]">
          <img :src="$url(post.cover[0].url)" alt="" />
          <span class="iconfont iconshipin"></span>
        </div>
        <div class="user">
          <span class="name">{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
    </div>
    <div class="item" v-else-if="post.cover.length < 3">
      <div class="info">
        <div class="txt-cut">
          {{ post.title }}
        </div>
        <div class="user">
          <span class="name">{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <div class="img" v-if="post.cover[0]">
        <img :src="$url(post.cover[0].url)" alt="" />
      </div>
    </div>
    <div class="item1" v-else>
      <div class="info1">
        <div class="txt-cut">
          {{ post.title }}
        </div>
        <div class="img">
          <img :src="$url(post.cover[0].url)" alt="" />
          <img :src="$url(post.cover[1].url)" alt="" />
          <img :src="$url(post.cover[2].url)" alt="" />
        </div>
        <div class="user">
          <span class="name">{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
.item0 {
  padding: 13px;
  border-bottom: 1px solid gray;
  .info0 {
    font-size: 16px;
    position: relative;
    .img {
      margin: 10px 0;
      width: 100%;
      img {
        width: 100%;
        height: 170px;
        object-fit: cover;
      }
      .iconshipin {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 50px;
      }
    }
    .user {
      font-size: 14px;
      color: #666666;
      .name {
        padding: 0 20px 0 0;
      }
    }
  }
}
.item1 {
  padding: 13px;
  border-bottom: 1px solid gray;
  .info1 {
    font-size: 16px;
    .img {
      margin: 10px 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img {
        width: 112px;
        height: 74px;
      }
    }
    .user {
      font-size: 14px;
      color: #666666;
      .name {
        padding: 0 20px 0 0;
      }
    }
  }
}
.item {
  display: flex;
  padding: 13px;
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
