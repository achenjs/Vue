<template>
   <div class="settings">
      <el-col :span="8" :offset="8">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item required label="原密码">
            <el-input type="password" v-model="form.old_pwd"></el-input>
          </el-form-item>
          <el-form-item required label="新密码">
            <el-input type="password" v-model="form.new_pwd"></el-input>
          </el-form-item>
          <el-form-item required label="确认密码">
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
import axios from 'axios'
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
    mounted() {
      document.onkeydown = (ev) => {
        if (ev.keyCode == 13) {
          this.submitForm()
        }
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
      submitForm() {
        if (this.form.new_pwd === this.add_pwd) {
          axios.post('/admin/api/v1/reset_password', this.form)
            .then((result) => {
              this.$message({
                 message: result.data.message,
                 type: 'success'
              })
              this.reset()
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        } else {
            this.$message.error('二次输入的密码不一致！')
        }
      }
    }
  }
</script>
