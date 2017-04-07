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
          width="50"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="attachment_name"
          label="交付物名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          width="60"
          label="操作">
          <template scope="scope">
            <el-button @click="details(scope.row.id)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <v-pages :total="total" v-on:currentChange="nextAtta"></v-pages>
      <div class="submit">
        <el-button type="primary" @click="ensure">同意进入下一阶段</el-button>
        <el-button type="primary" @click="cancel">驳回</el-button>
      </div>
    </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 1,
      nextAttaId: '',
      id: ''
    }
  },
  created() {
    this.nextAttaId = this.$route.params.id
    this.nextAtta(1)
  },
  watch: {
    '$route' (to, from) {
      const toDepath = to.path.split('/').length
      const fromDepath = from.path.split('/').length
    }
  },
  methods: {
    //  进入交付物详情
    details(id) {
      this.nextAttaId = id
      this.$router.push('/attaDetails/' + id)
    },
    //  阶段下交付物列表
    nextAtta(page) {
      const _this = this
      $.ajax({
        url: '/admin/api/v1/user_attachments?ppid=' + this.nextAttaId + '&page=' + page,
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
            _this.$router.push('/signin')
          }
        }
      })
    },
    //  同意进入下一阶段
    ensure() {
      const _this = this
      var obj = {
        ppid: this.nextAttaId,
        status: 'Confirmed'
      }
      $.ajax({
        url: '/admin/api/v1/project_phase_review/',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(result) {
          _this.$message({
            message: result.message,
            type: 'success'
          })
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/signin')
          } else {
            _this.$message.error(JSON.parse(err.responseText).result)
          }
        }
      })
    },
    //  驳回
    cancel() {
      var _this = this
      var obj = {
        ppid: this.nextAttaId,
        status: 'Submitting'
      }
      $.ajax({
        url: '/admin/api/v1/project_phase_review/',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(result) {
          _this.$message({
            message: result.message,
            type: 'success'
          })
        }
      })
    }
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
