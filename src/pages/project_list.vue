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
    style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        width="120"
        label="项目编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        width="150"
        label="项目名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contact_name"
        width="120"
        label="负责人">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        align="center"
        prop="contact_phone"
        width="150"
        label="手机号">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        align="center"
        prop="gmt_create"
        width="150"
        label="创建时间">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        align="center"
        prop="industry"
        width="150"
        label="所在行业">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phase_index"
        width="150"
        label="所在阶段">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="审核">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip=true
        align="center"
        prop="description"
        width="150"
        label="部门描述">
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
      }
    })
    //  阶段
    $.ajax({
      url: '/admin/api/v1/phases?page=1',
      success: function(result) {
        var data = result.result
        _this.phases = data.items
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
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          for (var i in data.items) {
            data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
          }
          _this.tableData = data.items
        }
      })
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
