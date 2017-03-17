<template>
   <div class="department">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新建部门</span>
      </el-col>
      <div class="">
        <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="tableData"
        style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="部门名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="部门描述">
          </el-table-column>
        </el-table>
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>新建部门</span>
            </div>
            <div class="modal-content">
              <label for="">部门名称</label>
              <el-input placeholder="部门名称" v-model="form.name"></el-input>
              <label for="">部门描述</label>
              <el-input placeholder="部门描述" v-model="form.description"></el-input>
              <label for="">状态</label>
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                v-for="item in states"
                :label="item.label"
                :value="item.value"
                :key="item.value">
                </el-option>
              </el-select>
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
        states: [{
          value: true,
          label: '启用',
        }, {
          value: false,
          label: '禁用',
        }],
        form: {
          name: '',
          description: '',
          status: true,
        },
        total: 1,
        loading: false
      }
    },
    created() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/departments?page=1',
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
    },
    methods: {
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      query(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/departments?page=' + page,
          success: function(result) {
            let data = result.result
            _this.total = data.total
            _this.tableData = data.items
          }
        })
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
          url: '/admin/api/v1/departments',
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
    },
    components: { 'v-pages': pages }
  }
</script>

<style lang="scss">
.department {
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
