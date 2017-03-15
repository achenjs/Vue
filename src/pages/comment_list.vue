<template>
   <div class="stage_manage">
      <div class="">
        <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="项目名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="点评人">
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="点评内容">
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="时间">
          </el-table-column>
        </el-table>
      </div>
      <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
    data() {
      return {
        tableData: [],
        addShow: false,
        stateValue: '',
        loading: false,
        total: 1
      }
    },
    created() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/comments?page=1',
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          var data = result.result
          _this.loading = false
          _this.total = data.total
          _this.tableData = data.items
        }
      })
    },
    methods: {
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addOpen() {
        this.reset()
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        this.addShow = false
      },
      query(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/comments?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            var data = result.result
            _this.loading = false
            _this.total = data.total
            _this.tableData = data.items
          }
        })
      }
    },
    components: {
      'v-pages': pages
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
