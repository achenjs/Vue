<template>
  <div class="admin_list">
    <div class="admin_line admin_line_1 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员编号</label>
          <el-input placeholder="会员编号" v-model="User.id"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员名称</label>
          <el-input placeholder="会员名称" v-model="User.name"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">邮箱账号</label>
          <el-input placeholder="邮箱账号" type="email" v-model="User.email"></el-input>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_2 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">企业名称</label>
          <el-input placeholder="企业名称" v-model="User.company_name"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">会员身份</label>
          <el-select v-model="User.type" placeholder="请选择">
            <el-option
            v-for="item in identitys"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">所属行业</label>
          <el-select v-model="User.company_industry" placeholder="请选择">
            <el-option
            v-for="key,value in industries"
            :label="key"
            :value="key"
            :key="value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </div>
    <div class="admin_line admin_line_3 clearfix">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">联系手机</label>
          <el-input placeholder="联系手机" v-model="User.phone"></el-input>
        </div>
      </el-col>
    </div>
    <div class="query" @click="query">
      <span>查&nbsp;&nbsp;询</span>
    </div>
    <div>
      <v-table :tableData="tableData" :loading="loading"></v-table>
    </div>
    <v-pages :total="total" v-on:currentChange="query"></v-pages>
  </div>
</template>

<script>
import table from '../components/table/table.vue'
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      User: {
        id: '',
        name: '',
        phone: '',
        email: '',
        company_name: '',
        company_industry: '',
        type: ''
      },
      identitys: [{
        value: '项目方',
        label: '项目方'
      }, {
        value: '投资人',
        label: '投资人'
      }],
      industries: {},
      tableData: [],
      total: 1,
      loading: false
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
      url: '/admin/api/v1/users?page=1',
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
      //  会员列表
      if (typeof page === 'number') {
        console.log(this.User)
      } else {
        console.log(this.User)
      }
      // $.ajax({
      //   url: '/admin/api/v1/users?page=' + page,
      //   success: function(result) {
      //     var data = result.result
      //     _this.tableData = data.items
      //   }
      // })
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
