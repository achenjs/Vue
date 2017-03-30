<template>
  <div class="admin_list">
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
          <label for="">负责人</label>
          <el-input placeholder="负责人" v-model="form.contact_name"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
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
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">联系手机</label>
          <el-input placeholder="联系手机" v-model="form.contact_phone"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_3 clearfix">
      <el-col :span="14">
        <div style="width: 80%;">
          <label for="">创建时间</label>
          <el-date-picker
            format="yyyy-MM-dd"
            v-model="form.starttime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span>至</span>
          <el-date-picker
            v-model="form.endtime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
    </div>
    <div class="query">
      <span @click="query">查&nbsp;&nbsp;询</span>
    </div>
    <el-table
    v-loading="loading"
    element-loading-text="拼命加载中"
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        width="70"
        label="项目编号">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="name"
        width="100"
        label="项目名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="contact_name"
        width="60"
        label="负责人">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="contact_phone"
        width="100"
        label="手机号">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        prop="gmt_create"
        width="80"
        label="创建时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        prop="industry"
        width="80"
        label="所在行业">
      </el-table-column>
      <el-table-column
        align="center"
        prop="company_phase"
        width="80"
        label="所在阶段">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        width="60"
        label="审核">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        prop="description"
        label="项目描述">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="40"
        label="操作">
        <template scope="scope">
          <el-button @click="midClick(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pages :total="total" v-on:currentChange="query"></v-pages>
  </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        contact_name: '',
        industry: '',
        phase_index: '',
        contact_phone: '',
        starttime: '',
        endtime: ''
      },
      stateValue: '',
      risksValue: '',
      industries: [],
      phases: [],
      risks: [],
      tableData: [],
      loading: false,
      total: 1
    }
  },
  created() {
    var _this = this
    //  所属行业
    $.ajax({
      url: '/main/api/v1/industries',
      success: function(result) {
        var data = result.result
        _this.industries = data.industries
        _this.industries[''] = '全部行业'
      },
      error: function(err) {
        if (err.status == '401') {
          _this.$message.error(JSON.parse(err.responseText).message)
          _this.$router.push('/admin/signin')
        }
      }
    })
    //  阶段
    $.ajax({
      url: '/admin/api/v1/phases?page=1',
      success: function(result) {
        var data = result.result
        _this.phases = data.items
        _this.phases.push({id: '', name: '全部阶段'})
      },
      error: function(err) {
        if (err.status == '401') {
          _this.$message.error(JSON.parse(err.responseText).message)
          _this.$router.push('/admin/signin')
        }
      }
    })
    //  项目列表
    this.query(1)
  },
  methods: {
    query(page) {
      var page
      if (typeof page != 'object') {
        page = page
      } else {
        page = 1
      }
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
      var _this = this
      $.ajax({
        url: '/admin/api/v1/projects?id='+ this.form.id +'&name='+ this.form.name +'&contact_name='+ this.form.contact_name +'&industry='+ this.form.industry +'&phase_index='+ this.form.phase_index +'&contact_phone='+ this.form.contact_phone +'&starttime='+ this.form.starttime +'&endtime='+ this.form.endtime +'&page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          for(var i in data.items) {
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
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    //  详情
    midClick(id) {
      this.$router.push('/admin/project_details')
      localStorage.setItem('ProjectDetailsId', id)
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
