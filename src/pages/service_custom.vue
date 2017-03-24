<template>
   <div class="service_custom">
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
         prop="title"
         label="服务项名称"
         width="150"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="description"
         label="服务项描述"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="project_name"
         label="类别"
         width="150"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="price"
         label="报价"
         width="150"
         show-overflow-tooltip>
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
      tableData: [],
      total: 1,
      loading: false
    }
  },
  created() {
    var _this = this
    $.ajax({
      url: '/admin/api/v1/custom_service_items?page=1',
      beforeSend: function() {
        _this.loading = true
      },
      success: function(result) {
        let data = result.result
        _this.loading = false
        _this.total = data.total
        _this.tableData = data.items
      }
    })
  },
  methods: {
    query(page) {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/custom_service_items?page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          _this.tableData = data.items
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

</style>
