<template>
   <div class="deliverable_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">交付物状态</label>
          <el-select v-model="deliverableValue" placeholder="请选择">
            <el-option
            v-for="item in deliverables"
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
      deliverables: [{
            value: '选项1',
            label: '项目方'
        }, {
            value: '选项2',
            label: '投资人'
      }],
      deliverableValue: '',
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
.deliverable_list {
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
