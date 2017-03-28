<template>
   <div class="managers">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">创建操作员</span>
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
            prop="name"
            label="姓名"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="dept_name"
            label="部门"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="role_name"
            label="角色"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="gmt_create"
            width="150"
            label="登陆时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="操作"
            width="80"
            show-overflow-tooltip>
            <template scope="scope">
              <el-button @click="midClick(scope.row.id)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>创建操作员</span>
            </div>
            <div class="modal-content">
              <label for="">姓名</label>
              <el-input placeholder="姓名" v-model="form.name"></el-input>
              <label for="">邮箱</label>
              <el-input placeholder="邮箱" type="email" v-model="form.email"></el-input>
              <label for="">密码</label>
              <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
              <label for="">部门</label>
              <el-select v-model="form.dept_id" placeholder="请选择">
                <el-option
                v-for="item in departments"
                :label="item.name"
                :value="item.id"
                :key="item.value">
                </el-option>
              </el-select>
              <label for="">角色</label>
              <el-select v-model="form.role_id" placeholder="请选择">
                <el-option
                v-for="item in roles"
                :label="item.name"
                :value="item.id"
                :key="item.value">
                </el-option>
              </el-select>
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
        form: {
          status: '',
          role_id: '',
          email: '',
          name: '',
          password: '',
          dept_id: ''
        },
        tableData: [],
        roles: [],
        departments: [],
        states: [{
          value: true,
          label: '启用'
        }, {
          value: false,
          label: '禁用'
        }],
        loading: false,
        page: '',
        total: 1,
        addShow: false,
        id: ''
      }
    },
    created() {
      var _this = this
      //  操作员列表
      this.query(1)
      //  部门列表
      $.ajax({
        url: '/admin/api/v1/departments?page=1',
        success: function(result) {
          let data = result.result
          _this.departments = data.items
        }
      })
      //  角色列表
      $.ajax({
        url: '/admin/api/v1/roles?page=1',
        success: function(result) {
          let data = result.result
          _this.roles = data.items
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
        this.id = ''
        this.addShow = true
      },
      cancel() {
        this.id = ''
        this.addShow = false
      },
      ensure() {
        var _this = this
        if (this.id === '') {
          //  新增
          if (this.form.dept_id == '' && this.form.role_id == '') {
            _this.$message({
              message: '角色和部门必选!',
              type: 'warning'
            })
          } else {
            $.ajax({
              url: '/admin/api/v1/admins',
              type: 'post',
              contentType: 'application/json',
              data: JSON.stringify(this.form),
              success: function(result) {
                _this.addShow = false
                _this.reset()
                _this.$message({
                  message: result.message,
                  type: 'success'
                })
              }
            })
          }
        } else {
          //  修改
          $.ajax({
            url: '/admin/api/v1/admins/' + this.id,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(this.form),
            success: function(result) {
              _this.addShow = false
              _this.reset()
              _this.$message({
                message: result.message,
                type: 'success'
              })
              _this.query(_this.page)
            }
          })
        }
      },
      query(page) {
        var _this = this
        this.page = page
        $.ajax({
          url: '/admin/api/v1/admins?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          timeout: 5000,
          success: function(result) {
            let data = result.result
            _this.loading = false
            _this.total = data.total
            for (var i in data.items) {
              data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
            }
            _this.tableData = data.items
          },
          complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
      　　　　if(status == 'timeout'){ //超时,status还有success,error等值的情况
                _this.loading = false
      　　　　　  _this.$message.error('请求超时！请稍后重试')
      　　　　}
      　　 }
        })
      },
      //  查看
      queryClick(id) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/admins/' + id,
          success: function(result) {
            _this.addShow = true
            let data = result.result
            _this.form.email = data.email
            _this.form.name = data.name
            for(var i=0; i<_this.departments.length; i++) {
              if (_this.departments[i].name === data.dept_name) {
                _this.form.dept_id = _this.departments[i].id
              }
            }
            for(var i=0; i<_this.roles.length; i++) {
              if (_this.roles[i].name === data.role_name) {
                _this.form.role_id = _this.roles[i].id
              }
            }
            _this.form.status = data.status
          }
        })
      },
      //  修改
      midClick(id) {
        this.id = id
        this.queryClick(this.id)
        this.addShow = true
      }
    },
    components: { 'v-pages': pages }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.managers {
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
