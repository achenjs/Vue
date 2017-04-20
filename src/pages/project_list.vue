<template>
  <div class="admin_list">
    <div v-if="id === ''">
      <div class="admin_line admin_line_1 clearfix">
        <el-col :span="8">
          <div style="width: 80%;">
            <label for="">项目编号</label>
            <el-input placeholder="项目编号" v-model="form.id"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="width: 80%;">
            <label for="">项目名称</label>
            <el-input placeholder="项目名称" v-model="form.name"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="width: 80%;">
            <label for="">所属行业</label>
            <el-select v-model="form.industry" placeholder="请选择">
              <el-option
              v-for="(key, index) in industries"
              :label="key"
              :value="index"
              :key="key">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </div>
      <div class="admin_line admin_line_2 clearfix">
        <el-col :span="8">
          <div style="width: 80%;">
            <label for="">所在阶段</label>
            <el-select v-model="form.phase_index" placeholder="请选择">
              <el-option
              v-for="item in phases"
              :label="item.name"
              :value="item.id"
              :key="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="15">
          <label for="">创建时间</label>
          <el-date-picker
            :editable="false"
            format="yyyy-MM-dd"
            v-model="form.starttime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            :editable="false"
            v-model="form.endtime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </div>
      <div class="query">
        <span @click="query(1)">查&nbsp;&nbsp;询</span>
      </div>
      <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      border
      style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="id"
          width="50"
          label="编号">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="name"
          width="120"
          label="项目名称">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="description"
          label="项目描述">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="owner"
          width="170"
          label="会员账户">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="industry"
          width="120"
          label="所在行业">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="phase_name"
          width="80"
          label="所在阶段">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          width="80"
          label="创建时间">
          <template scope="scope">
            {{scope.row.gmt_create|dateFormat}}
          </template>
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
      <v-pages :total="total" v-on:currentChange="query"></v-pages>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        industry: '',
        phase_index: '',
        starttime: '',
        endtime: '',
        page: 1
      },
      stateValue: '',
      risksValue: '',
      industries: {
        '': '全部行业'
      },
      phases: [{id: '', name: '全部阶段'}],
      risks: [],
      tableData: [],
      loading: false,
      total: 1,
      id: ''
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth === 2) {
        this.id = ''
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    if (this.id == undefined) {
      this.id = ''
    }
    this.industrs()
    this.pahs(1)
    //  项目列表
    this.query(1)
  },
  mounted() {
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        this.query(1)
      }
    }
  },
  methods: {
    //  所属行业
    industrs() {
      axios.get('/main/api/v1/industries')
        .then((result) => {
          const data = result.data.result
          this.industries = data.industries
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    //  阶段
    pahs(page) {
      //  阶段
      axios.get('/admin/api/v1/phases?page=' + page)
        .then((result) => {
          const data = result.data.result
          for (let i in data.items) {
            this.phases.push(data.items[i])
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    query(page) {
      this.form.page = page
      if (this.form.starttime === '') {
        this.form.starttime = ''
      } else {
        this.form.starttime = Date.parse(new Date(this.form.starttime))
      }
      if (this.form.endtime === '') {
        this.form.endtime = ''
      } else {
        this.form.endtime = Date.parse(new Date(this.form.endtime))
      }
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/projects',
        parameter: {
          id: this.form.id,
          name: this.form.name,
          industry: this.form.industry,
          phase_index: this.form.phase_index,
          starttime: this.form.starttime,
          endtime: this.form.endtime,
          page: this.form.page
        }
      })
      var changeUrl = this.$store.getters.changeUrl
      axios({
        url: changeUrl,
        timeout: 10000,
        transformResponse: [(data) => {
          this.loading = true
          return data
        }]
      })
        .then((result) => {
          const data = JSON.parse(result.data).result
          this.loading = false
          this.total = data.total
          for(let i in data.items) {
            var phase_index = data.items[i].phase_index
            for(let j in data.items[i].phases) {
              if (phase_index === data.items[i].phases[j].id) {
                data.items[i].phase_name = data.items[i].phases[j].phase_name
              }
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
    //  详情
    midClick(id) {
      this.id = id
      this.$router.push('/project_list/' + id)
    }
  },
  components: { 'v-pages': pages }
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
    margin: 30px 0;
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
}
</style>
