<template>
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
      label="会员编号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="name"
      label="会员名称">
    </el-table-column>
    <el-table-column
      align="center"
      prop="email"
      label="邮箱账号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="phone"
      label="手机号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="wechat"
      label="微信账号">
    </el-table-column>
    <el-table-column
      align="center"
      prop="company"
      label="公司及职位">
    </el-table-column>
    <el-table-column
      align="center"
      prop="gender"
      label="性别">
    </el-table-column>
    <el-table-column
      align="center"
      prop="company_name"
      label="企业名称">
    </el-table-column>
    <el-table-column
      align="center"
      prop="company_industry"
      label="所属行业">
    </el-table-column>
    <el-table-column
      align="center"
      prop="resume"
      label="投资身份"
      width="80">
    </el-table-column>
    <el-table-column
      align="center"
      prop="gmt_create"
      label="注册日期">
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
</template>

<script>
  export default {
    methods: {
      handleClick(id) {
        this.addShow = true
      }
    },
    props: {
      tableData: {
        type: Array
      },
      loading: {
        type: Boolean
      }
    },
    data() {
      return {

      }
    }
  }
</script>
