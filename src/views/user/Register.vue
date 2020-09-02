<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
        <p class="tips">
          已有账号?去<router-link to="/login">登录</router-link>
        </p>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名' },
          {
            pattern: /^\d{5,11}$/,
            message: '请输入5-11位的数字',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '请填写昵称' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,6}$/,
            message: '昵称必须是2-6位的中文',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码' },
          {
            pattern: /^\d{3,9}$/,
            message: '请输入3-9位的数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/login')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  text-align: right;
  padding: 15px;
  font-size: 16px;
  a {
    color: red;
  }
}
</style>
