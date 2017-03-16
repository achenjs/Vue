<template>
  <div class="admin_list">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员编号</label>
          <el-input placeholder="会员编号" v-model="form.id"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员名称</label>
          <el-input placeholder="会员名称" v-model="form.name"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">邮箱账号</label>
          <el-input placeholder="邮箱账号" type="email" v-model="form.email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">企业名称</label>
          <el-input placeholder="企业名称" v-model="form.company_name"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">所属行业</label>
          <el-select v-model="form.company_industry" placeholder="请选择">
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
          <el-input placeholder="联系手机" v-model="form.phone"></el-input>
        </div>
      </el-col>
    </div>
    <div class="query" @click="query">
      <span>查&nbsp;&nbsp;询</span>
    </div>
    <div>
      <v-table :tableData="tableData" :loading="loading"></v-table>
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
import table from '../components/table/table.vue'
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        phone: '',
        email: '',
        company_industry: '',
        type: ''
      },
      industries: {},
      tableData: [],
      total: 1,
      loading: false,
      addShow: false
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
    //  会员列表
    $.ajax({
      url: '/admin/api/v1/users?id='+this.form.id+'&type='+this.form.type+'&name='+this.form.name+'&email='+this.form.email+'&phone='+this.form.phone+'&company_industry='+this.form.company_industry+'&page='+1,
      beforeSend: function() {
        _this.loading = true
      },
      success: function(result) {
        var data = result.result
        _this.loading = false
        _this.tableData = data.items
        _this.total = data.total
      }
    })
  },
  methods: {
    query(page) {
      var _this = this
      var page
      if (typeof page != object) {
        page = page
      } else {
        page = 1
      }
      //  会员列表
      $.ajax({
        url: '/admin/api/v1/users?id='+this.form.id+'&type='+this.form.type+'&name='+this.form.name+'&email='+this.form.email+'&phone='+this.form.phone+'&company_industry='+this.form.company_industry+'&page='+page,
        success: function(result) {
          var data = result.result
          _this.tableData = data.items
        }
      })
    },
    ensure() {

    },
    cancel() {

    }
  },
  components: {
    'v-table': table,
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
}
</style>
