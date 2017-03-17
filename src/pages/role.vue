<template>
   <div class="role">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">创建角色</span>
      </el-col>
      <div class="">
        <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
            align="center"
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="角色描述">
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <el-button @click="queryClick(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="midClick(scope.row.id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>创建角色</span>
            </div>
            <div class="modal-content">
              <label for="">角色名称</label>
              <el-input placeholder="角色名称" v-model="form.name"></el-input>
              <label for="">角色描述</label>
              <el-input placeholder="角色描述" v-model="form.description"></el-input>
              <label for="">状态</label>
              <el-select placeholder="请选择" v-model="form.status">
                <el-option
                v-for="item in roles"
                :label="item.label"
                :value="item.value"
                :key="item.value">
                </el-option>
              </el-select>
              <label for="" v-if="searchGet">权限</label>
              <el-table
                v-if="searchGet"
                :data="tableData3"
                height="200"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="modal-footer">
              <el-button type="primary" v-if="searchGet" @click="ensure">确认</el-button>
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
        tableData3: [],
        multipleSelection: '',
        tableData: [],
        addShow: false,
        form: {
          name: '',
          description: '',
          status: '',
          permissions: ''
        },
        roles: [{
          value: true,
          label: '启用',
        }, {
          value: false,
          label: '禁用',
        }],
        total: 1,
        id: '',
        searchGet: true
      }
    },
    methods: {
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      queryClick(id) {
        var _this = this
        this.addShow = true
        this.searchGet = false
        $.ajax({
          url: '/admin/api/v1/roles/' + id,
          success: function(result) {
            let data = result.result
            _this.form.name = data.name
            _this.form.description = data.description
            _this.form.status = data.status
          }
        })
      },
      midClick(id) {
        this.reset()
        this.id = id
        this.addShow = true
        this.searchGet = true
      },
      addOpen() {
        this.id = ''
        this.reset()
        this.addShow = true
        this.searchGet = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        var _this = this
        if (this.id === '') {
          //  新建
          var arr = []
          for (var i=0; i<this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].id)
          }
          this.form.permissions = arr.join()
          $.ajax({
            url: '/admin/api/v1/roles',
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
        } else {
          //  修改
          var arr = []
          for (var i=0; i<this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].id)
          }
          this.form.permissions = arr.join()
          $.ajax({
            url: '/admin/api/v1/roles/' + this.id,
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
        }
      },
      query(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/roles?page=' + page,
          success: function(result) {
            var data = result.result
            _this.total = data.total
            _this.tableData = data.items
          }
        })
      }
    },
    created() {
      var _this = this
      //  所有角色
      $.ajax({
        url: '/admin/api/v1/roles?page=1',
        success: function(result) {
          var data = result.result
          _this.total = data.total
          _this.tableData = data.items
        }
      })
      //  所有权限
      $.ajax({
        url: '/admin/api/v1/permissions',
        success: function(result) {
          var data = result.result
          _this.tableData3 = data.items
        }
      })
    },
    components: {
      'v-pages': pages
    }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.role {
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
