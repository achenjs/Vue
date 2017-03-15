<template>
   <div class="stage_manage">
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
        }],
        addShow: false,
        states: [{
          value: '选项1',
          label: '启用',
        }, {
          value: '选项2',
          label: '禁用',
        }],
        stateValue: '',
      }
    },
    methods: {
      addOpen() {
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        this.addShow = false
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.stage_manage {
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
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 18px;
    }
  }
}
</style>
