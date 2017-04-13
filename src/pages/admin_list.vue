<template>
  <div class="admin_list">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员编号</label>
          <el-input placeholder="会员编号" v-model="query.id"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员名称</label>
          <el-input placeholder="会员名称" v-model="query.name"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">邮箱账号</label>
          <el-input placeholder="邮箱账号" type="email" v-model="query.email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">企业名称</label>
          <el-input placeholder="企业名称" v-model="query.company_name"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">所属行业</label>
          <el-select v-model="query.company_industry" placeholder="请选择">
            <el-option
            v-for="(key, index) in industries"
            :label="key"
            :value="index"
            :key="key">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">联系手机</label>
          <el-input placeholder="联系手机" v-model="query.phone"></el-input>
        </div>
      </el-col>
    </div>
    <div class="query">
      <span @click="search(1)">查&nbsp;&nbsp;询</span>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        fixed
        prop="id"
        width="50"
        label="编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        show-overflow-tooltip
        width="70"
        label="会员名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="email"
        show-overflow-tooltip
        width="180"
        label="邮箱账号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        width="100"
        show-overflow-tooltip
        label="手机号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="wechat"
        show-overflow-tooltip
        width="100"
        label="微信账号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="company_name"
        show-overflow-tooltip
        label="企业名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="company"
        show-overflow-tooltip
        width="100"
        label="职位">
      </el-table-column>
      <el-table-column
        align="center"
        prop="gender"
        width="40"
        label="性别">
      </el-table-column>
      <el-table-column
        align="center"
        prop="company_industry"
        width="80"
        label="所属行业"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="gmt_create"
        width="80"
        show-overflow-tooltip
        label="注册日期">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="60"
        label="操作">
        <template scope="scope">
          <el-button @click="midClick(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition name="fade">
      <div class="modal" v-if="addShow">
        <div class="modal-dialog">
          <div class="modal-header">
            <span>详细信息</span>
          </div>
          <div class="modal-content">
            <el-row>
              <el-col :span="11" style="margin-right: 10px;">
                <label for="">会员名称</label>
                <el-input placeholder="会员名称" v-model="form.name"></el-input>
                <label for="">邮箱账号</label>
                <el-input placeholder="邮箱账号" v-model="form.email"></el-input>
                <label for="">手机号码</label>
                <el-input placeholder="手机号码" v-model="form.phone"></el-input>
                <label for="">所属行业</label>
                <el-select v-model="form.company_industry" placeholder="请选择">
                  <el-option
                  v-for="(item, index) in industries"
                  :label="item"
                  :value="index"
                  :key="index">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="11">
                <label for="">微信账号</label>
                <el-input placeholder="微信账号" v-model="form.wechat"></el-input>
                <label for="">公司职位</label>
                <el-input placeholder="公司职位" v-model="form.company"></el-input>
                <label for="">企业名称</label>
                <el-input placeholder="企业名称" v-model="form.company_name"></el-input>
                <label for="">性别</label>
                <el-select v-model="form.gender" placeholder="请选择">
                  <el-option
                  v-for="(item, index) in genders"
                  :label="item"
                  :value="index"
                  :key="index">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="modal-footer">
            <el-button type="primary" @click="ensure">确认</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
    </transition>
    <v-pages :total="total" v-on:currentChange="search"></v-pages>
  </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
import axios from 'axios'
export default {
  data () {
    return {
      query: {
        id: '',
        name: '',
        phone: '',
        email: '',
        company_industry: '',
        company_name: '',
        type: '',
        page: 1
      },
      form: {
        name: '',
        phone: '',
        email: '',
        company_industry: '',
        company_name: '',
        company: '',
        gender: '',
        resume: '',
        wechat: ''
      },
      genders: {
        'Male': '男',
        'Female': '女'
      },
      id: '',
      industries: {
        '': '全部行业'
      },
      tableData: [],
      total: 1,
      loading: false,
      addShow: false
    }
  },
  created() {
    this.industr()
    //  会员列表
    this.search(1)
  },
  methods: {
    industr() {
      var _this = this
      // 获取全部行业
      axios.get('/main/api/v1/industries')
        .then((result) => {
          const data = result.data.result
          Object.assign(_this.industries, data.industries)
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    },
    reset() {
      for(let name in this.$data.form) {
        this.$data.form[name] = ''
      }
    },
    search(page) {
      var _this = this
      this.query.page = page
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/users',
        parameter: {
          id: this.query.id,
          name: this.query.name,
          phone: this.query.phone,
          email: this.query.email,
          company_industry: this.query.company_industry,
          company_name: this.query.company_name,
          type: this.query.type,
          page: this.query.page
        }
      })
      var changeUrl = this.$store.getters.changeUrl
      //  会员列表
      axios({
        url: changeUrl,
        transformResponse: [(data) => {
          _this.loading = true
          return data
        }],
        timeout: 10000
      })
        .then((result) => {
          const data = JSON.parse(result.data).result
          _this.loading = false
          for (let i in data.items) {
            var DateTime = data.items[i].gmt_create
  					var timer = new Date(DateTime)
  					timer.setTime(timer.getTime()+0)
			      var  year = timer.getUTCFullYear(),
          			 month = timer.getUTCMonth()+1,
          			 date = timer.getUTCDate(),
          			 hour = timer.getUTCHours(),
          			 minute = timer.getUTCMinutes(),
          			 second = timer.getUTCSeconds(),
         			   time = year + "-" + month + "-" + date
            data.items[i].gmt_create = time
          }
          _this.total = data.total
          _this.tableData = data.items
        })
        .catch((err) => {
          if (err.indexOf('timeout') >= 0) {
            _this.loading = false
            _this.$message.error('请求超时!')
          } else {
            _this.$message.error(err.message)
          }
        })
    },
    //  编辑信息
    midClick(id) {
      var _this = this
      this.addShow = true
      this.id = id
      axios.get('/admin/api/v1/users/' + id)
        .then((result) => {
          const data = result.data.result
          Object.assign(_this.form, data)
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    },
    ensure() {
      var _this = this
      if (this.id === '') {
        this.addShow = false
      } else {
        const company_industry = this.form.company_industry
        for(let i in this.industries) {
          if(this.industries[i] === company_industry) {
            this.form.company_industry = i
          }
        }
        var gender = this.form.gender
        for(let i in this.genders) {
          if(this.genders[i] == gender) {
            this.form.gender = i
          }
        }
        axios.post('/admin/api/v1/users/' + this.id, this.form)
          .then((result) => {
            _this.addShow = false
            _this.$message({
              message: result.data.message,
              type: 'success'
            })
          })
          .catch((err) => {
            _this.$message.error(err.message)
          })
      }
    },
    cancel() {
      this.addShow = false
    }
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">
.admin_list {
  .admin_line {
    margin-bottom: 10px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    .el-select {
        width: 100%;
    }
  }
 .query {
    margin-top: 30px;
    text-align: center;
    span {
        display: inline-block;
        font-size: 14px;
        width: 300px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        background-color: #027ee5;
        color: #ffffff;
    }
  }
  .modal-dialog {
    width: 80% !important;
  }
}
</style>
