<template>
 <div class="bp_list">
   <div v-if="id === ''">
     <el-col :span="4" class="add_item">
       <span @click="addBp">新建BP</span>
     </el-col>
     <div>
       <el-table
         :data="tableData"
         border
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
           prop="contact"
           label="联系人"
           width="80"
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
   <router-view></router-view>
 </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
    data() {
      return {
        tableData: [],
        total: 1,
        id: ''
      }
    },
    created() {
      this.id = this.$route.params.id
      if (this.id == undefined) {
        this.id = ''
      }
      this.search(1)
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        if (toDepth === 2) {
          this.id = ''
        }
      }
    },
    methods: {
      addBp() {
        this.$router.push('/bp_manage')
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
              _this.$router.push('/signin')
            }
          }
        })
      },
      //  详情修改
      queryClick(id) {
        if (typeof id === 'object') {
          this.$message.error('没有获取到id值')
        } else {
          this.id = id
          this.$router.push('/bp_list/' + id)
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
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
