<template>
   <div class="admin_new">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员角色</label>
          <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">姓名</label>
          <el-input placeholder=""></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">邮箱</label>
          <el-input placeholder="" type="email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">密码</label>
          <el-input placeholder="请输入您的密码" type="password"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">备注</label>
          <el-input placeholder="全部"></el-input>
        </div>
      </el-col>
    </div>
    <div class="openAccount">
        <span>开通账户</span>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            options: [{
                value: '选项1',
                label: '项目方'
            }, {
                value: '选项2',
                label: '投资人'
            }],
            value: ''
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
      span {
          display: inline-block;
          font-size: 14px;
          width: 300px;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          background-color: #027ee5;
          color: #ffffff;
      }
  }
}
</style>
