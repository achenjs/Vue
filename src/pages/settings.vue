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
      }
    },
    methods: {
      submitForm(formName) {
        $.ajax({
          url: '/admin/api/v1/reset_password',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            console.log(result)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.settings {

}
</style>
