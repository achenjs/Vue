<template lang="html">
  <div class="nextAtta">
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
        prop="attachment_name"
        label="交互物名称"
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
        width="80"
        label="操作">
        <template scope="scope">
          <el-button @click="details(scope.row.id)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pages :total="total" v-on:currentChange="nextAtta"></v-pages>
  </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      id: '',
      total: 1
    }
  },
  created() {
    this.id = this.$route.query
    this.nextAtta(1)
  },
  methods: {
    reset() {
      this.$data.form = {
        status: '',
        content: ''
      }
    },
    //  进入交付物详情
    details(id) {
      this.$router.push({path: '/admin/attaDetails', query: id})
    },
    //  阶段下交付物列表
    nextAtta(page) {
      var _this = this
      if (typeof this.id == 'object') {
          this.$router.push('/admin/deliverable_list')
      } else {
        $.ajax({
          url: '/admin/api/v1/user_attachments?ppid=' + this.id + '&page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            var data = result.result
            _this.loading = false
            _this.total = data.total
            _this.tableData = data.items
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      }
    },
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">
.nextAtta {
  .submit {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
