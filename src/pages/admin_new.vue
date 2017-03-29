<template>
   <div class="admin_new">
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for="">姓名</label>
          <el-input placeholder="姓名" v-model="form.name"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for="">邮箱</label>
          <el-input placeholder="邮箱" type="email" v-model="form.email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line clearfix">
      <el-col :span="8" :offset="8">
        <div style="width: 100%;">
          <label for="">密码</label>
          <el-input placeholder="请输入您的密码" type="password" v-model="form.password"></el-input>
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
export default {
    data () {
        return {
          form: {
            name: '',
            email: '',
            phone: '',
            password: ''
          }
        }
    },
    methods: {
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addUser() {
        var _this = this
        if (this.form.name == '' && this.form.email == '' && this.form.phone == '' && this.form.password == '') {
          _this.$message({
            message: '请输入完整信息',
            type: 'warning'
          })
        } else {
          $.ajax({
            url: '/admin/api/v1/users',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(this.form),
            success: function(result) {
              _this.reset()
              _this.$message({
                message: result.message,
                type: 'success'
              })
            },
            error: function(err) {
              if (err.status == '401') {
                _this.$message.error(JSON.parse(err.responseText).message)
                _this.$router.push('/admin/signin')
              }
            }
          })
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
