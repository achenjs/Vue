<template lang="html">
  <div class="phases_details">
    <div v-if="id === ''">
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
          prop="project_name"
          label="项目名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="phase_name"
          label="阶段名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="60"
          show-overflow-tooltip>
        </el-table-column>
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
      <v-pages :total="total" v-on:currentChange="nextPhases"></v-pages>
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
      id: ''
    }
  },
  watch: {
    '$route' (to, from) {
        const toDepath = to.path
        if (toDepath === '/deliverable_list') {
          this.id = ''
          this.nextPhases(1)
        }
    }
  },
  created() {
    if (this.$router.currentRoute.fullPath == '/deliverable_list') {
      this.id = ''
    } else {
      this.id = '1'
    }
    this.nextPhases(1)
  },
  methods: {
    //  阶段列表
    nextPhases(page) {
      axios({
        url: '/admin/api/v1/projects_phases?page=' + page,
        timeout: 10000,
        transformResponse: [(data) => {
          this.loading = true
          return data
        }]
      })
        .then((result) => {
          this.loading = false
          const data = JSON.parse(result.data).result
          for (let i in data.items) {
            var status = data.items[i].status
            switch (status) {
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
          this.total = data.total
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
    //  阶段下详情
    midClick(id) {
      this.id = id
      localStorage.setItem('nextAttaId', id)
      this.$router.push('/nextAtta')
    },
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">

</style>
