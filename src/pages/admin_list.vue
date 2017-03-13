<template>
  <div class="admin_list">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">姓名</label>
          <el-input placeholder="模糊匹配"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">登录名</label>
          <el-input placeholder="模糊匹配"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
      <el-col :span="8">
        <div style="width: 80%; margin-left; 30px;">
          <label for="">角色</label>
          <el-input placeholder="全部"></el-input>
        </div>
      </el-col>
      <el-col :span="16">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">创建日期</label>
          <el-date-picker
            v-model="value1"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_3 clearfix">
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">部门</label>
          <el-input placeholder="全部"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">状态</label>
          <el-input placeholder="全部"></el-input>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          pickerOptions1: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          value1: '',
          value2: '',
        }
      }
    }
</script>

<style lang="scss">
.admin_list {
  .admin_line {
    label {
      display: block;
    }
  }
}
</style>
