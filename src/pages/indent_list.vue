<template>
   <div class="indent_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">订单号</label>
         <el-input placeholder="订单号"></el-input>
        </div>
      </el-col>
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">订单状态</label>
          <el-select v-model="conditionValue" placeholder="请选择">
            <el-option
            v-for="item in conditions"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
       <div style="width: 80%;">
         <label for="">项目名称</label>
        <el-input placeholder="项目名称"></el-input>
       </div>
     </el-col>
   </div>
   <div class="deliverable_inline clearfix">
     <el-col :span="8">
      <div style="width: 80%;">
        <label for="">服务项</label>
       <el-input placeholder="服务项"></el-input>
      </div>
     </el-col>
     <el-col :span="8">
       <div style="width: 80%;">
         <label for="">服务包名称</label>
        <el-input placeholder="服务包名称"></el-input>
       </div>
     </el-col>
     <el-col :span="8">
      <div style="width: 80%;">
        <label for="">服务包类</label>
        <el-select v-model="serverValue" placeholder="请选择">
          <el-option
          v-for="item in servers"
          :label="item.label"
          :value="item.value"
          :key="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
    </div>
    <div class="deliverable_inline clearfix">
       <el-col :span="12">
         <div style="width: 80%;">
           <label for="">交付时间</label>
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
     <div class="buttons">
       <el-button class="query" type="primary">查询</el-button>
       <el-button class="export" type="primary">导出</el-button>
     </div>
     <div class="deliverable_table">
       <el-table
         :data="tableData"
         border
         style="width: 100%">
         <el-table-column
            align="center"
           fixed
           prop="date"
           label="日期"
           width="150">
         </el-table-column>
         <el-table-column
            align="center"
           prop="name"
           label="姓名"
           width="120">
         </el-table-column>
         <el-table-column
            align="center"
           prop="province"
           label="省份"
           width="120">
         </el-table-column>
         <el-table-column
            align="center"
           prop="city"
           label="市区"
           width="120">
         </el-table-column>
         <el-table-column
            align="center"
           prop="address"
           label="地址"
           width="300">
         </el-table-column>
         <el-table-column
            align="center"
           prop="zip"
           label="邮编"
           width="120">
         </el-table-column>
         <el-table-column
            align="center"
           fixed="right"
           label="操作"
           width="100">
           <template scope="scope">
             <el-button type="text" size="small">查看</el-button>
             <el-button type="text" size="small">编辑</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
   </div>
</template>

<script>
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
      conditions: [{
        value: '选项1',
        label: '请求忽略'
      }, {
        value: '选项2',
        label: '已忽略'
      }, {
        value: '选项3',
        label: '已驳回'
      }, {
        value: '选项4',
        label: '待提交'
      }, {
        value: '选项5',
        label: '已提交'
      }, {
        value: '选项6',
        label: '已确认'
      }, {
        value: '选项7',
        label: '已完成'
      }],
      servers: [{
        value: '选项1',
        label: 'APL系统服务'
      }, {
        value: '选项2',
        label: '研发评审'
      }, {
        value: '选项3',
        label: '开发支持'
      }, {
        value: '选项4',
        label: '媒体宣传'
      }, {
        value: '选项5',
        label: '其他'
      }],
      conditionValue: '',
      serverValue: '',
      dateValue0: '',
      dateValue1: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style lang="scss">
.indent_list {
  .deliverable_inline {
    margin-bottom: 10px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    .el-select {
        width: 100%;
    }
  }
  .buttons {
    margin: 30px 0;
    text-align: center;
  }
}
</style>
