<template>
   <div class="service_item">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增服务项</span>
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
            label="编号"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="服务项名称"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="desc"
            label="服务项描述"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="category_id"
            label="类别"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="price"
            label="报价"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>新增服务项</span>
            </div>
            <div class="modal-content">
              <label for="">服务项名称</label>
              <el-input placeholder="服务项名称" v-model="form.name"></el-input>
              <label for="">服务项描述</label>
              <el-input placeholder="服务项描述" v-model="form.desc"></el-input>
              <label for="">类别</label>
              <el-select placeholder="请选择" v-model="form.category_id">
                <el-option
                v-for="item in categorys"
                :label="item.name"
                :value="item.id"
                :key="item.id">
                </el-option>
              </el-select>
              <label for="">报价</label>
              <el-input placeholder="报价" v-model="form.price"></el-input>
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
        categorys: [],
        total: 1,
        categoryValue: '',
        form: {
          desc: '',
          name: '',
          price: '',
          category_id: ''
        },
        loading: false,
        total: 1,
      }
    },
    created() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/service_items?page=1',
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          _this.tableData = data.items
        }
      })

      //  服务类别
      $.ajax({
        url: '/admin/api/v1/service_categories?page=1',
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.total = data.total
          _this.categorys = data.items
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
          url: '/admin/api/v1/service_items',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            _this.addShow = false
            _this.$message({
              message: result.message,
              type: 'success'
            })
          }
        })
      },
      query(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/service_items?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            let data = result.result
            _this.loading = false
            _this.total = data.total
            _this.tableData = data.items
          }
        })
      }
    },
    components: { 'v-pages': pages }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.service_item {
  .add_item {
    text-align: center;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
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
