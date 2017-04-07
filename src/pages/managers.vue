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
            prop="id"
            label="编号"
            width="50"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
            width="60"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="dept_name"
            label="部门"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="role_name"
            label="角色"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="gmt_create"
            width="140"
            label="最后登录时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="active"
            width="60"
            label="状态"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="操作"
            width="60"
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
              <label for=""><i>*</i>姓名</label>
              <el-input placeholder="姓名" v-model="form.name" @blur="isName($event)"></el-input>
              <label for=""><i>*</i>邮箱</label>
              <el-input placeholder="邮箱" type="email" v-model="form.email" @blur="isEmail($event)"></el-input>
              <label for=""><i>*</i>密码</label>
              <el-input placeholder="密码" type="password" v-model="form.password" @blur="isPas($event)"></el-input>
              <label for=""><i>*</i>部门</label>
              <el-select v-model="form.dept_id" placeholder="请选择">
                <el-option
                v-for="item in departments"
                :label="item.name"
                :value="item.id"
                :key="item.value">
                </el-option>
              </el-select>
              <label for=""><i>*</i>角色</label>
              <el-select v-model="form.role_id" placeholder="请选择">
                <el-option
                v-for="item in roles"
                :label="item.name"
                :value="item.id"
                :key="item.value">
                </el-option>
              </el-select>
              <label for=""><i>*</i>状态</label>
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
        id: '',
        isNames: false,
        isEmails: false,
        isPass: false
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
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/signin')
          }
        }
      })
      //  角色列表
      $.ajax({
        url: '/admin/api/v1/roles?page=1',
        success: function(result) {
          let data = result.result
          _this.roles = data.items
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/signin')
          }
        }
      })
    },
    methods: {
      //  判断name是否合法
      isName(el) {
        const val = el.target.value.trim()
        if (val.length == 0) {
          this.$message.error('对不起姓名不能为空和空格！')
        } else {
          this.isNames = true
        }
      },
      //  判断email是否合法
      isEmail(el) {
        const val = el.target.value.trim()
        if (val.length!=0) {
           const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
           if (!reg.test(val)) {
             this.$message.error("对不起，您输入的字符串类型格式不正确!")
           } else {
             this.isEmails = true
           }
        }
      },
      //  判断密码是否合法
      isPas(el) {
        const val = el.target.value.trim()
        if (val.length == 0) {
          this.$message.error('密码只能是字母和数字组成！')
        } else if (val.length < 6 || val.length > 12) {
          this.$message.error('密码在6-12个字符之间！')
        } else {
          this.isPass = true
        }
      },
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addOpen() {
        this.reset()
        this.id = ''
        this.form.status = true
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
          if (this.form.dept_id == '' || this.form.role_id == '' || !this.isEmails || !this.isPass || !this.isNames) {
            _this.$message({
              message: '请填写完整的信息!',
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
              },
              error: function(err) {
                if (err.status == '401') {
                  _this.$message.error(JSON.parse(err.responseText).message)
                  _this.$router.push('/signin')
                }
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
            },
            error: function(err) {
              if (err.status == '401') {
                _this.$message.error(JSON.parse(err.responseText).message)
                _this.$router.push('/signin')
              }
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
          timeout: 10000,
          success: function(result) {
            let data = result.result
            _this.loading = false
            _this.total = data.total
            for (var i in data.items) {
              var DateTime = data.items[i].gmt_create
    					var timer = new Date(DateTime)
    					timer.setTime(timer.getTime()+0)
  			      var  year = timer.getUTCFullYear(),
            			 month = timer.getUTCMonth()+1,
            			 date = timer.getUTCDate(),
            			 hour = timer.getUTCHours(),
            			 minute = timer.getUTCMinutes(),
            			 second = timer.getUTCSeconds();
                   if (hour < 10) {
                     hour = '0' + hour
                   }
                   if (minute < 10) {
                     minute = '0' + minute
                   }
                   if (second < 10) {
                     second = '0' + second
                   }
           		var	 time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
              data.items[i].gmt_create = time
              if (data.items[i].active == true) {
                data.items[i].active = '启用'
              } else {
                data.items[i].active = '禁用'
              }
            }
            _this.tableData = data.items
          },
          complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
      　　　　if(status == 'timeout'){ //超时,status还有success,error等值的情况
                _this.loading = false
      　　　　　  _this.$message.error('请求超时！请稍后重试')
      　　　　}
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/signin')
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
            _this.form.active = data.active
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/signin')
            }
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
  label {
    i {
      color: red;
    }
  }
}
</style>
