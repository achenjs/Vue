<template>
   <div class="admin_new">
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for=""><i>*</i>姓名</label>
          <el-input placeholder="姓名" v-model="form.name" @blur="isName($event)"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for=""><i>*</i>邮箱</label>
          <el-input placeholder="邮箱" type="email" v-model="form.email" @blur="isEmail($event)"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for=""><i>*</i>密码</label>
          <el-input placeholder="请输入密码" type="password" v-model="form.password" @blur="isPas($event)"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for=""><i>*</i>初始硬豆</label>
          <el-input placeholder="请输入初始硬豆" v-model="form.total_money" @blur="isPas($event)"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for="">线下已花费硬豆</label>
          <el-input placeholder="线下已花费硬豆" v-model="form.spend_money"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for="">电话</label>
          <el-input placeholder="电话" v-model="form.phone"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <span class="openAccount" @click="addUser">开通账户</span>
      </el-col>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          total_money: '',
          password: '',
          spend_money: ''
        },
        isNames: false,
        isEmails: false,
        isPass: false
      }
    },
    mounted() {
      document.onkeydown = (ev) => {
        if (ev.keyCode == 13) {
          this.addUser()
        }
      }
    },
    methods: {
      reset() {
        for(let name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      //  判断name是否合法
      isName(el) {
        const val = el.target.value.trim()
        if (val.length == 0) {
          this.$message.error('对不起姓名不能为空和空格！')
        } else {
          this.isNames = true
        }
      },
      //  判断email是否合法
      isEmail(el) {
        const val = el.target.value.trim()
        if (val.length!=0) {
           const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
           if (!reg.test(val)) {
             this.$message.error("请输入正确的邮箱!")
           } else {
             this.isEmails = true
           }
        }
      },
      //  判断密码是否合法
      isPas(el) {
        const val = el.target.value.trim()
        if (val.length == 0) {
          this.$message.error('密码只能是字母和数字组成！')
        } else if (val.length < 6 || val.length > 12) {
          this.$message.error('密码在6-12个字符之间！')
        } else {
          this.isPass = true
        }
      },
      //  创建
      addUser() {
        if (this.isNames && this.isEmails && this.isPass) {
          if (this.form.total_money == '') {
            this.$message.error('初始硬豆必填!')
            return false
          }
          if (parseFloat(this.form.total_money) || parseFloat(this.form.total_money) === 0) {
            this.form.total_money = parseFloat(this.form.total_money)
          } else {
            this.$message.error('初始硬豆值应该为数字类型!')
            return false
          }
          this.form.spend_money = parseFloat(this.form.spend_money)
          axios.post('/admin/api/v1/users', this.form)
            .then((result) => {
              const data = result.data
              this.reset()
              this.$message({
                message: data.message,
                type: 'success'
              })
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        } else {
          this.$message.error('必填字段不能为空！')
        }
      }
    }
}
</script>

<style lang="scss">
.admin_new {
  .admin_line {
    margin-bottom: 10px;
    label {
      display: block;
      margin-bottom: 5px;
      i {
        color: red;
      }
    }
    .el-date-editor.el-input {
      width: 420px;
    }
    .el-select {
        width: 100%;
    }
  }
  .openAccount {
      margin-top: 30px;
      text-align: center;
      display: inline-block;
      font-size: 14px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      background-color: #027ee5;
      color: #ffffff;
  }
}
</style>
