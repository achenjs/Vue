<template>
   <div class="service_category">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增服务包类别</span>
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
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>新增类别</span>
            </div>
            <div class="modal-content">
              <label for="">服务包类别名称</label>
              <el-input placeholder="服务包类别名称"></el-input>
              <label for="">阶服务包类描述</label>
              <el-input placeholder="阶服务包类描述"></el-input>
            </div>
            <div class="modal-footer">
              <el-button type="primary" @click="ensure">确认</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
      </transition>
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
        addShow: false
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
.service_category {
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
