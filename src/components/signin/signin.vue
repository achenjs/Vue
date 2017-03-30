<template>
  <div class="signin">
    <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">洪泰孵化器后台管理系统</h3>
      <el-form-item>
        <el-input type="text" v-model="form.username" auto-complete="on" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" v-model="form.captcha" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <span id="getImg"><img :src="imgUrl" style="width:30%; height:100%;" @click="captcha"><label for="" @click="captcha">换一张</label></span>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="submit" style="width:100%;" @click="signin" @keyup.enter="signin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      imgUrl: '',
      form: {
        captcha: '',
        username: '',
        password: ''
      }
    }
  },
  created () {
    //  验证码
    this.captcha()
    //  判断是否已登录
    this.isLogin()
  },
  mounted() {
    var _this = this
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        _this.signin()
      }
    }
  },
  methods: {
    //  验证码
    captcha() {
      var _this = this
      axios.get('/main/api/v1/captcha')
        .then((result) => {
          _this.imgUrl = result.data
        })
    },
    signin() {
      var _this = this
      axios.post('/admin/api/v1/', this.form)
        .then((result) => {
          _this.$router.push('/admin/admin_list')
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    },
    isLogin() {
      var _this = this
      axios.get('/admin/api/v1/')
        .then((result) => {
          _this.$router.push('/admin/admin_list')
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="scss">
@import "./signin"
</style>
