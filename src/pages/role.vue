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
              <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
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
              <el-select placeholder="请选择" v-model="form.roleValue">
                <el-option
                v-for="item in roles"
                :label="item.label"
                :value="item.value"
                :key="item.value">
                </el-option>
              </el-select>
              <label for="">权限</label>
              <el-table
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
        tableData3: [{
        "description": "管理员修改自己的密码",
        "gmt_create": "2017-02-13T16:44:36+00:00",
        "gmt_modified": "2017-02-13T16:50:40+00:00",
        "id": 16,
        "name": "重置密码",
        "status": true,
        "value": 1
      },
      {
        "description": "创建管理员",
        "gmt_create": "2017-02-13T16:44:36+00:00",
        "gmt_modified": "2017-02-13T16:50:40+00:00",
        "id": 17,
        "name": "创建管理员",
        "status": true,
        "value": 2
      },],
        multipleSelection: [],
        tableData: [],
        addShow: false,
        form: {
          name: '',
          description: '',
          roleValue: '',
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
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleClick(id) {
        var _this = this
        this.addShow = true
        $.ajax({
          url: '/admin/api/v1/roles/' + id,
          success: function(result) {
            let data = result.result
            _this.form.name = data.name
            _this.form.description = data.description
            _this.form.roleValue = data.status
          }
        })
      },
      addOpen() {
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        $.ajax({
          url: '/admin/api/v1/roles',
          type: 'post',
          success: function(result) {
            this.addShow = false
          }
        })
      },
      query(page) {
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
