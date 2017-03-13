<template>
  <div class="container-fluid">
    <nav class="navbar head" role="navigation">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img src="../../assets/images/logo.png"></a>
        </div>
    </nav>
    <div class="row content">
        <div id="dialog">
            <form>
            <h3>洪泰孵化器后台管理系统</h3>
                <p><label for="">用户名：</label><input type="text" placeholder="用户名" v-model="form.username" id="userName"></p>
                <p><label for="">密码：</label><input type="password" placeholder="密码" v-model="form.password" id="psw"></p>
                <p><label for="">验证码：</label><input type="text" placeholder="验证码" v-model="form.captcha" id="vcode"></p>
                <p><span id="getImg"><img :src="imgUrl" style="width:30%; height:100%;"><label for="" id="changeOne"  @click="captcha">换一张</label></span></p>
                <p><input type="button" class="btn btn-success" id="dls" value="登录" @click="signin"></p>
            <!-- <div id="ts">
                <p>密码错误</p>
                <p>验证码错误</p>
            </div> -->
            </form>
        </div>

    </div>
    <!--  <div class="row footer">
        <div class="col-md-12">
            京审备案
        </div>
    </div> -->
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
        axios.get('http://172.16.46.53:5000/main/api/v1/captcha').then((result) => {
            this.imgUrl = result.data
        })
    },
    methods: {
        captcha() {
          axios.get('http://172.16.46.53:5000/main/api/v1/captcha').then((result) => {
            this.imgUrl = result.data
          })
        },
        signin() {
            $.post('http://172.16.46.53:5000/admin/api/v1/', this.form, (result) => {
              console.log(result)
            })
//            axios.post('http://172.16.46.53:5000/admin/api/v1/', this.form)
//              .then((result) => {
//                  console.log(result)
////                this.$router.push('/home')
//              })
//              .catch((err) => {
//
//              })
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/admin_index.css';
.header:nth-of-type(1) {
    padding-left: 0;
}
.header {
    padding-top: 0;

}
</style>
