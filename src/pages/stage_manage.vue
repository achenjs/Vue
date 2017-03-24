<template>
   <div class="stage_manage">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增阶段</span>
      </el-col>
      <div class="">
        <el-table
        :data="tableData"
        v-loading="loading"
        border
        element-loading-text="拼命加载中"
        style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            width="120"
            label="阶段编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            width="200"
            label="阶段名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="阶段描述">
          </el-table-column>
        </el-table>
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>新增阶段</span>
            </div>
            <div class="modal-content">
              <label for="">阶段名称</label>
              <el-input placeholder="阶段名称" v-model="form.name"></el-input>
              <label for="">阶段描述</label>
              <el-input placeholder="阶段描述" v-model="form.description"></el-input>
              <label for="">交付物列表</label>
              <el-table
              :data="tableData1"
              ref="table"
              height="300"
              row-key="id"
              @select="changed"
              style="width: 100%">
                <template scope="scope">
                  <el-table-column
                  ref="selection"
                  :reserve-selection="true"
                  type="selection">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="attachment.id"
                    label="编号">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    show-overflow-tooltip
                    width="120"
                    prop="attachment.name"
                    label="交付物名称">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    show-overflow-tooltip
                    prop="attachment.description"
                    label="描述">
                  </el-table-column>
                </template>
              </el-table>
              <v-pages :total="total1" v-on:currentChange="queryAttachment"></v-pages>
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
        tableData1: [],
        addShow: false,
        form: {
          name: '',
          description: '',
          attachments: ''
        },
        loading: false,
        total: 1,
        total1: 1,
        selection: '',
        arrChecked: [],
      }
    },
    created() {
      var _this = this
      //  阶段列表
      $.ajax({
        url: '/admin/api/v1/phases?page=1',
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
      changed(selection, row) {
        this.selection = selection
      },
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addOpen() {
        this.reset()
        this.addShow = true
        var _this = this
        //  交付物列表
        $.ajax({
          url: '/admin/api/v1/user_attachments?page=1',
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            let data = result.result
            _this.loading = false
            _this.total1 = data.total
            _this.tableData1 = data.items
          }
        })
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        var _this = this
        for (var i=0; i<this.selection.length; i++) {
          this.arrChecked.push(this.selection[i].id)
        }
        var set = new Set(this.arrChecked.sort())
        this.arrChecked = [...set]
        this.form.attachments = this.arrChecked.join()
        $.ajax({
          url: '/admin/api/v1/phases',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            _this.$message({
              message: result.message,
              type: 'success'
            })
            _this.addShow = false
          }
        })
      },
      query(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/phases?page=' + page,
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
      queryAttachment(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/user_attachments?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            let data = result.result
            _this.loading = false
            _this.total1 = data.total
            _this.tableData1 = data.items
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
  .model {
    width: 700px;
  }
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
