<template lang="html">
  <div class="nextAtta">
    <div v-if="isShow">
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
            <el-button @click="details(scope.row.id, scope.row.attachment_name)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <v-pages :total="total" v-on:currentChange="nextAtta"></v-pages>
      <div class="submit">
        <el-button type="primary" @click="ensure">同意进入下一阶段</el-button>
        <el-button type="primary" @click="cancel">驳回</el-button>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import pages from '../components/pages/pages.vue'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      total: 1,
      nextAttaId: '',
      isShow: true,
      id: '',
      attaName: ''
    }
  },
  created() {
    this.nextAttaId = localStorage.getItem('nextAttaId')
    if (localStorage.getItem('attaDetailsId')) {
      this.isShow = false
    } else {
      this.isShow = true
    }
    this.nextAtta(1)
  },
  watch: {
    '$route' (to, from) {
      const toDepath = to.path
      const fromDepath = from.path
      if (toDepath === '/nextAtta') {
        this.isShow = true
        this.nextAtta(1)
      }
    }
  },
  methods: {
    //  进入交付物详情
    details(id, name) {
      this.attaName = name
      this.isShow = false
      localStorage.setItem('attaDetailsId', id)
      this.$router.push('/attaDetails')
    },
    //  阶段下交付物列表
    nextAtta(page) {
      const _this = this
      axios({
        url: '/admin/api/v1/user_attachments?ppid=' + this.nextAttaId + '&page=' + page,
        transformResponse: [(data) => {
          _this.loading = true
          return data
        }]
      })
        .then((result) => {
          const data = JSON.parse(result.data).result
          _this.loading = false
          _this.total = data.total
          _this.tableData = data.items
        })
        .catch((err) => {
          _this.$message.error(err.result)
        })
    },
    //  同意进入下一阶段
    ensure() {
      const _this = this
      var obj = {
        ppid: this.nextAttaId,
        status: 'Confirmed'
      }
      axios.post('/admin/api/v1/project_phase_review/', obj)
        .then((result) => {
          _this.$message({
            message: result.data.message,
            type: 'success'
          })
          _this.$router.push('/deliverable_list')
        })
        .catch((err) => {
          _this.$message.error(err.result)
        })
    },
    //  驳回
    cancel() {
      var _this = this
      var obj = {
        ppid: this.nextAttaId,
        status: 'Submitting'
      }
      axios.post('/admin/api/v1/project_phase_review/', obj)
        .then((result) => {
          _this.$message({
            message: result.data.message,
            type: 'success'
          })
          _this.$router.push('/department_list')
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
