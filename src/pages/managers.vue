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
              <el-select v-model="form.active" placeholder="请选择">
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
import axios from 'axios'
import pages from '../components/pages/pages.vue'
export default {
    data() {
      return {
        form: {
          active: '',
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
      //  操作员列表
      this.query(1)
      this.department(1)
      this.role(1)
    },
    methods: {
      //  角色列表
      role(page) {
        axios.get('/admin/api/v1/roles?page=' + page)
          .then((result) => {
            let data = result.data.result
            this.roles = data.items
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
      //  部门列表
      department(page) {
        axios.get('/admin/api/v1/departments?page=' + page)
          .then((result) => {
            let data = result.data.result
            this.departments = data.items
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
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
        for(let name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addOpen() {
        this.reset()
        this.id = ''
        this.form.active = true
        this.addShow = true
      },
      cancel() {
        this.id = ''
        this.addShow = false
      },
      ensure() {
        if (this.id === '') {
          //  新增
          if (this.form.dept_id == '' || this.form.role_id == '' || !this.isEmails || !this.isPass || !this.isNames) {
            this.$message({
              message: '请填写完整的信息!',
              type: 'warning'
            })
          } else {
            axios.post('/admin/api/v1/admins', this.form)
              .then((result) => {
                this.addShow = false
                this.reset()
                this.$message({
                  message: result.data.message,
                  type: 'success'
                })
              })
              .catch((err) => {
                this.$message.error(err.message)
              })
          }
        } else {
          //  修改
          axios.post('/admin/api/v1/admins/' + this.id, this.form)
            .then((result) => {
              this.addShow = false
              this.reset()
              this.$message({
                message: result.data.message,
                type: 'success'
              })
              this.query(this.page)
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        }
      },
      query(page) {
        this.page = page
        axios({
          url: '/admin/api/v1/admins?page=' + page,
          timeout: 10000,
          transformResponse: [(data) => {
            this.loading = true
            return data
          }]
        })
          .then((result) => {
            let data = JSON.parse(result.data).result
            this.loading = false
            this.total = data.total
            for (let i in data.items) {
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
            this.tableData = data.items
          })
          .catch((err) => {
            if (err.indexOf('timeout') >= 0) {
              this.loading = false
              this.$message.error('请求超时!')
            } else {
              this.$message.error(err.message)
            }
          })
      },
      //  查看
      queryClick(id) {
        axios.get('/admin/api/v1/admins/' + id)
          .then((result) => {
            this.addShow = true
            let data = result.data.result
            this.form.email = data.email
            this.form.name = data.name
            for(var i=0; i<this.departments.length; i++) {
              if (this.departments[i].name === data.dept_name) {
                this.form.dept_id = this.departments[i].id
              }
            }
            for(var i=0; i<this.roles.length; i++) {
              if (this.roles[i].name === data.role_name) {
                this.form.role_id = this.roles[i].id
              }
            }
            this.form.active = data.active
          })
          .catch((err) => {
            this.$message.error(err.message)
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
