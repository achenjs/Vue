<template>
   <div class="bp_list">
      <el-col :span="4" class="add_item">
        <span>新建BP</span>
      </el-col>
      <div class="">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      </div>
   </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style lang="scss">
.bp_list {
  .add_item {
    text-align: center;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    background-color: #027ee5;
    color: #fff;
    border-radius: 50px;
    margin-bottom: 40px;
    span {
      font-size: 18px;
    }
  }
}
</style>
