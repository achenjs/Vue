<template lang="html">
  <div class="phases_details">
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
        width="80"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="project_name"
        label="项目名称"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="phase_name"
        label="阶段名称"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作">
        <template scope="scope">
          <el-button @click="midClick(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pages :total="total" v-on:currentChange="nextPhases"></v-pages>
  </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      form: {

      },
      total: 1
    }
  },
  created() {
    this.nextPhases(1)
  },
  methods: {
    //  阶段列表
    nextPhases(page) {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/projects_phases?page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          _this.loading = false
          var data = result.result
          for (var i in data.items) {
            var status = data.items[i].status
            switch (status) {
              case 'Paid':
                data.items[i].status = '已支付'
                break;
              case 'Canceled':
                data.items[i].status = '已取消'
                break;
              case 'Submitting':
                data.items[i].status = '待提交'
                break;
              case 'Submitted':
                data.items[i].status = '已提交'
                break;
              case 'Confirmed':
                data.items[i].status = '已确认'
                break;
              case 'Finished':
                data.items[i].status = '已完成'
                break;
            }
          }
          _this.total = data.total
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
    //  阶段下详情
    midClick(id) {
      this.$router.push({path: '/admin/nextAtta', query: id})
    },
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">

</style>
