<template>
  <div class="admin_list">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">项目编号</label>
          <el-input placeholder="项目编号"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">项目名称</label>
          <el-input placeholder="项目名称"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">负责人</label>
          <el-input placeholder="负责人" type="email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
       <el-col :span="8">
        <div style="width: 80%;">
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
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">所在阶段</label>
          <el-select v-model="stateValue" placeholder="请选择">
            <el-option
            v-for="item in states"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">风险状况</label>
          <el-select v-model="risksValue" placeholder="请选择">
            <el-option
            v-for="item in risks"
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
        <div style="width: 80%;">
          <label for="">联系手机</label>
          <el-input placeholder=""></el-input>
        </div>
      </el-col>
      <el-col :span="14">
        <div style="width: 80%;">
          <label for="">创建时间</label>
          <el-date-picker
            v-model="dateValue0"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            v-model="dateValue1"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      industrys: [{
            value: '选项1',
            label: '项目方'
        }, {
            value: '选项2',
            label: '投资人'
      }],
      states: [{
        value: '选项1',
        label: '项目方',
      }, {
        value: '选项2',
        label: '投资人',
      }],
      risks: [{
        value: '选项1',
        label: '项目方',
      }, {
        value: '选项2',
        label: '投资人',
      }],
      stateValue: '',
      industryValue: '',
      risksValue: '',
      dateValue0: '',
      dateValue1: '',
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
      margin: 30px 0;
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
