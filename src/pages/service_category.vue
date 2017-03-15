<template>
   <div class="service_category">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增服务包类别</span>
      </el-col>
      <div class="">
        <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="类别编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="类别名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="类别描述">
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
              <el-input placeholder="服务包类别名称" v-model="form.name"></el-input>
              <label for="">阶服务包类描述</label>
              <el-input placeholder="阶服务包类描述" v-model="form.description"></el-input>
            </div>
            <div class="modal-footer">
              <el-button type="primary" @click="ensure">确认</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
      </transition>
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
        loading: false,
        total: 1,
        form: {
          name: '',
          description: ''
        }
      }
    },
    created() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/service_categories?page=1',
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          _this.loading = false
          var data = result.result
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
        var _this = this
        $.ajax({
          url: '/admin/api/v1/service_categories',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            this.addShow = false
            _this.$message({
              message: '创建成功!',
              type: 'success'
            })
          }
        })
      },
      query(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/service_categories?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            _this.loading = false
            var data = result.result
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
