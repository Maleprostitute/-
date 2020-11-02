<template>
  <div>
    <hm-header>登录1111</hm-header>
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
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
        <p class="tips">
          没有账号?去
          <router-link to="/register">注册</router-link>
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
      rules: {
        username: [
          { required: true, message: '请填写密码' },
          {
            pattern: /^\d{5,11}$/,
            message: '请输入5-11位的数字',
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
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$store.commit('setToken', { token: data.token, id: data.user.id })
        if (this.$route.query.back) {
          this.$router.go(-1)
        } else {
          this.$router.push('/user')
        }
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
