<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hm-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{ user.nickname }}</template>
    </hm-navitem>
    <hm-navitem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? '男' : '女' }}</template>
    </hm-navitem>
    <van-dialog
      v-model="isshow"
      title="昵称修改"
      show-cancel-button
      @confirm="updateNickname"
    >
      <van-field
        v-model="nickname"
        label="昵称"
        ref="nickname"
        placeholder="请输入用户名"
      />
    </van-dialog>
    <van-dialog
      v-model="isshowPassword"
      title="密码修改"
      show-cancel-button
      @confirm="updatePassword"
    >
      <van-field
        v-model="password"
        label="密码"
        ref="password"
        placeholder="请输入用户名"
      />
    </van-dialog>
    <van-dialog
      v-model="isshowGender"
      title="性别修改"
      show-cancel-button
      @confirm="updateGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="mask" v-show="isShowMask">
      <van-button type="primary" class="clip" @click="clip">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="hide">取消</van-button>
      <vueCropper
        ref="aa"
        :img="img"
        autoCrop
        fixed
        autoCropWidth="150"
        autoCropHeight="150"
      ></vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      img: '',
      isShowMask: false,
      isshow: false,
      nickname: '',
      user: '',
      password: '',
      isshowPassword: false,
      isshowGender: false,
      gender: ''
    }
  },
  methods: {
    async showNickname() {
      this.isshow = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async showPassword() {
      this.isshowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    showGender() {
      this.isshowGender = true
      this.gender = this.user.gender
    },
    async getUserInfo() {
      const id = localStorage.getItem('id')
      const res = await this.$axios.get(`/user/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async updateUser(data) {
      const id = localStorage.getItem('id')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    updateNickname() {
      this.updateUser({ nickname: this.nickname })
    },
    updatePassword() {
      this.updateUser({ password: this.password })
    },
    updateGender() {
      this.updateUser({ gender: this.gender })
    },
    //   isImg(name) {
    //     if (
    //       name.endsWith('.gif') ||
    //       name.endsWith('.jpg') ||
    //       name.endsWith('.png') ||
    //       name.endsWith('.jpeg')
    //     ) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    afterRead(file) {
      // if (file.file.size > 1024 * 1024) {
      //   return this.$toast.fail('图片大小不能超过1M')
      // }
      // if (!this.isImg(file.file.name)) {
      //   return this.$toast.fail('图片格式不对')
      // }
      this.isShowMask = true
      this.img = file.content

      //     const fd = new FormData()
      //     fd.append('file', file.file)
    },
    clip() {
      this.$refs.aa.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)

        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updateUser({ head_img: data.url })
          this.isShowMask = false
        }
      })
    },
    hide() {
      this.isShowMask = false
    }
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  .cancel,
  .clip {
    position: fixed;
    bottom: 0;
    z-index: 11111;
  }
  .cancel {
    right: 0;
  }
}
.avatar {
  text-align: center;
  padding: 20px 0;
  position: relative;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%);
    width: 90px;
    height: 90px;
    opacity: 0;
  }
}
/deep/.van-dialog__content {
  padding: 25px 15px;
  .van-field {
    border: 1px solid red;
  }
}

</style>
