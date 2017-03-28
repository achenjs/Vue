<template>
   <div class="settings">
      <el-col :span="8" :offset="8">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码">
            <el-input type="password" v-model="form.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="form.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="add_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          old_pwd: '',
          new_pwd: '',
        },
        add_pwd: ''
      }
    },
    methods: {
      reset() {
        this.$data.form = {
          old_pwd: '',
          new_pwd: ''
        }
        this.$data.add_pwd = ''
      },
      submitForm(formName) {
        var _this = this
        if (this.form.new_pwd === this.add_pwd) {
          $.ajax({
            url: '/admin/api/v1/reset_password',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(this.form),
            success: function(result) {
              _this.$message({
                 message: result.message,
                 type: 'success'
              })
              _this.reset()
            },
            error(err) {
              _this.$message.error(JSON.parse(err.responseText).message)
            }
          })
        } else {
            _this.$message.error('二次输入的密码不一致！')
        }
      }
    }
  }
</script>

<style lang="scss">
.settings {

}
</style>
