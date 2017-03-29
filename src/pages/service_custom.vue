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
         width="400"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="category_name"
         label="类别"
         width="150"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="price"
         label="报价(硬豆)"
         width="150"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         width="80"
         label="附件">
         <template scope="scope">
           <a href="scope.row.file_name">下载</a>
         </template>
       </el-table-column>
       <el-table-column
         align="center"
         fixed="right"
         width="80"
         label="操作">
         <template scope="scope">
           <el-button @click="midClick(scope.row.id)" type="text" size="small">编辑</el-button>
         </template>
       </el-table-column>
     </el-table>
     <transition name="fade">
       <div class="modal" v-if="addShow">
         <div class="modal-dialog">
           <div class="modal-header">
             <span>修改状态</span>
           </div>
           <div class="modal-content">
             <label for="">报价(硬豆)</label>
             <el-input type="text" v-model="details.price"></el-input>
             <label for="">状态</label>
             <el-select placeholder="请选择" v-model="details.status">
               <el-option
               v-for="item in conditions"
               :label="item.label"
               :value="item.value"
               :key="item.value">
               </el-option>
             </el-select>
           </div>
           <div class="modal-footer">
             <el-button type="primary" @click="ensure">确认</el-button>
             <el-button type="primary" @click="cancel">取消</el-button>
           </div>
         </div>
       </div>
     </transition>
     <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      conditions: [
        {
          value: 'Paid',
          label: '已支付'
        },
        {
          value: 'Canceled',
          label: '已取消'
        },
        {
          value: 'Submitting',
          label: '待提交'
        },
        {
          value: 'Submitted',
          label: '已提交'
        },
        {
          value: 'Confirmed',
          label: '已确认'
        },
        {
          value: 'Finished',
          label: '已完成'
        }
      ],
      tableData: [],
      total: 1,
      id: '',
      page: '',
      loading: false,
      addShow: false,
      details: {
        status: '',
        price: ''
      }
    }
  },
  created() {
    this.query(1)
  },
  methods: {
    reset() {
      for(var name in this.$data.form) {
        this.$data.form[name] = ''
      }
    },
    addOpen() {
      this.reset()
      this.addShow = true
    },
    cancel() {
      this.addShow = false
    },
    query(page) {
      var _this = this
      this.page = page
      $.ajax({
        url: '/admin/api/v1/custom_service_items?page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          for (let i in data.items) {
            if (data.items[i].file_name === null || data.items[i].file_name === '') {
                data.items[i].file_name = '#'
            } else {
              $.ajax({
                url: '/main/api/v1/files/' + data.items[i].file_name,
                success: function(result) {
                  data.items[i].url = result
                }
              })
            }
          }
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
    ensure() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/custom_service_items/' + this.id,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(this.details),
        success: function(result) {
          _this.addShow = false
          _this.$message({
            message: result.message,
            type: 'success'
          })
          _this.query(_this.page)
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    //  根据id查看详情和修改
    midClick(id) {
      var _this = this
      this.addShow = true
      this.id = id
      $.ajax({
        url: '/admin/api/v1/custom_service_items/' + id,
        success: function(result) {
          var data = result.result
          _this.details = data
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">
.service_custom {
}
</style>
