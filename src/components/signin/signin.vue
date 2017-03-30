<template>
  <div class="signin">
    <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">洪泰孵化器后台管理系统</h3>
      <el-form-item>
        <el-input type="text" v-model="form.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" v-model="form.captcha" auto-complete="off" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <span id="getImg"><img :src="imgUrl" style="width:30%; height:100%;" @click="captcha"><label for="" @click="captcha">换一张</label></span>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" class="submit" style="width:100%;" @click="signin" @keyup="show($event)">登录</el-button>
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
    if (this.captcha !== '' && this.username !== '' && this.password !== '') {
      $('.submit').focus()
    }
  },
  methods: {
    //  回车登录
    show(ev) {
      if (ev.keyCode == 13) {
        this.signin()
      }
    },
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
.signin {
  width: 100%;
  height: 100%;
  background-color: #000000;
  .el-input__inner {
    height: 30px;
  }
  .login-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 5px;
    background-clip: padding-box;
    background-color: #F9FAFC;
    border: 2px solid #8492A6;
    width: 350px;
    height: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
      font-weight: 700;
      font-size: 20px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    #getImg{
      height: 27px;
      display: inline-block;
      width: 70%;
    }
    #getImg label{
      margin-left: 10px;
      font-weight: normal;
      vertical-align: top;
      cursor: pointer;
    }
  }
}
</style>
