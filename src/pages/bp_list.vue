<template>
   <div class="bp_list">
      <el-col :span="4" class="add_item">
        <span @click="addBp">新建BP</span>
      </el-col>
      <div class="">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="project_name"
            label="项目名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="contact"
            label="联系人"
            width="60"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="contact_phone"
            label="联系电话"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="Industry"
            label="所属行业"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="简介"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="操作"
            width="60"
            show-overflow-tooltip>
            <template scope="scope">
              <el-button @click="queryClick(scope.row.id)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <v-pages :total="total" v-on:currentChange="search"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
    data() {
      return {
        tableData: [],
        total: 1
      }
    },
    created() {
      this.search(1)
    },
    methods: {
      addBp() {
        this.$router.push('/admin/bp_manage')
      },
      //  BP列表
      search(page) {
        var _this = this
        $.ajax({
          url: '/admin/api/v1/bps?page=' + page,
          success: function(result) {
            let data = result.result
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
      },
      //  详情修改
      queryClick(id) {
        if (typeof id === 'object') {
          this.$message.error('没有获取到id值')
        } else {
          this.$router.push('/admin/bp_details')
          localStorage.setItem('bpDetailsId', id)
        }
      }
    },
    components: {
       'v-pages': pages
    }
  }
</script>

<style lang="scss">
.bp_list {
  .add_item {
    text-align: center;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    background-color: #027ee5;
    color: #fff;
    border-radius: 50px;
    margin-bottom: 40px;
    span {
      font-size: 18px;
    }
  }
}
</style>
