<template>
  <div class="admin_list">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">会员编号</label>
          <el-input placeholder="会员编号"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">会员名称</label>
          <el-input placeholder="会员名称"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">邮箱账号</label>
          <el-input placeholder="邮箱账号" type="email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">企业名称</label>
          <el-input placeholder="企业名称"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">会员身份</label>
          <el-select v-model="identityValue" placeholder="请选择">
            <el-option
            v-for="item in identitys"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">所属行业</label>
          <el-select v-model="industryValue" placeholder="请选择">
            <el-option
            v-for="item in industrys"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_3 clearfix">
      <el-col :span="8">
        <div style="width: 80%; margin-left: 30px;">
          <label for="">联系手机</label>
          <el-input placeholder=""></el-input>
        </div>
      </el-col>
    </div>
    <div class="query">
      <span>查&nbsp;&nbsp;询</span>
    </div>
    <div>
      <v-table></v-table>
    </div>
  </div>
</template>

<script>
import table from '../components/table/table.vue'
export default {
  data () {
    return {
      identitys: [{
            value: '选项1',
            label: '项目方'
        }, {
            value: '选项2',
            label: '投资人'
      }],
      industrys: [{
        value: '选项1',
        label: '项目方',
      }, {
        value: '选项2',
        label: '投资人',
      }],
      industryValue: '',
      identityValue: '',
      value1: '',
      value2: '',
    }
  },
  components: { 'v-table': table }
}
</script>

<style lang="scss">
.admin_list {
  .admin_line {
    margin-bottom: 10px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    .el-select {
        width: 100%;
    }
  }
   .query {
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
