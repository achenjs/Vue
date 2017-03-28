<template>
   <div class="deliverable_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">交付物状态</label>
          <el-select v-model="query.status" placeholder="请选择">
            <el-option
            v-for="item in conditions"
            :label="item.label"
            :value="item.value"
            :key="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
       <div style="width: 80%;">
         <label for="">项目名称</label>
         <el-input placeholder="项目名称" v-model="query.attachment_name"></el-input>
       </div>
     </el-col>
   </div>
   <div class="deliverable_inline clearfix">
     <el-col :span="12">
       <div style="width: 80%;">
         <label for="">交付时间</label>
         <el-date-picker
           v-model="query.starttime"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
         <span>至</span>
         <el-date-picker
           v-model="query.endtime"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
       </div>
     </el-col>
     </div>
     <div class="buttons">
       <el-button class="query" type="primary" @click="searchPage(1)">查询</el-button>
       <el-button class="export" type="primary">导出</el-button>
     </div>
     <div class="deliverable_table">
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
           label="编号"
           width="80"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="attachment_name"
           label="项目名称"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="phase_id"
           label="阶段"
           width="100"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="attachment_name"
           width="150"
           label="交付物名称"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="gmt_create"
           width="150"
           label="交付时间"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="status"
           width="120"
           label="状态">
         </el-table-column>
         <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="80"
            show-overflow-tooltip>
           <template scope="scope">
             <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
     <transition name="fade">
       <div class="modal" v-if="addShow">
         <div class="modal-dialog">
           <div class="modal-header">
             <span>交付物详情</span>
           </div>
           <div class="modal-content">
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
     <v-pages :total="total" v-on:currentChange="searchPage"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      conditions: [
        {
          value: '',
          label: '全部状态',
        },
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
      addShow: false,
      deliverableValue: '',
      query: {
        starttime: '',
        endtime: '',
        status: '',
        attachment_name: ''
      },
      details: {
        status: ''
      },
      tableData: [],
      loading: false,
      total: 1,
      page: '',
      id: ''
    }
  },
  created() {
    //  获取交付物列表
    this.searchPage(1)
  },
  methods: {
    //  点击编辑获取单个详情
    edit(id) {
      var _this = this
      this.id = id
      this.addShow = true
      $.ajax({
        url: '/admin/api/v1/phases_attachments/' + id,
        success: function(result) {
          var data = result.result
          _this.details.status = data.status
        }
      })
    },
    //  分页查询
    searchPage(page) {
      var _this = this
      this.page = page
      var page
      if (typeof page != 'object') {
        page = page
      } else {
        page = 1
      }
      if (this.query.starttime === '') {
        this.query.starttime = ''
      } else {
        this.query.starttime = Date.parse(new Date(this.query.starttime))
      }
      if (this.query.endtime === '') {
        this.query.endtime = ''
      } else {
        this.query.endtime = Date.parse(new Date(this.query.endtime))
      }
      $.ajax({
        url: '/admin/api/v1/phases_attachments?attachment_name='+ this.query.attachment_name +'&starttime='+ this.query.starttime +'&endtime='+ this.query.endtime +'&status='+ this.query.status +'&page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          for (var i in data.items) {
            data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
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
          _this.tableData = data.items
        },
        complete: function(XMLHttpRequest, status){ //请求完成后最终执行参数
    　　　　if(status == 'timeout'){ //超时,status还有success,error等值的情况
              _this.loading = false
    　　　　　  _this.$message.error('请求超时！请稍后重试')
    　　　　}
    　　 }
      })
    },
    //  确定
    ensure() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/phases_attachments/' + this.id,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(this.details),
        success: function(result) {
          _this.addShow = false
          _this.$message({
            message: result.message,
            type: 'success'
          })
          _this.searchPage(_this.page)
        }
      })
    },
    cancel() {
      this.addShow = false
    }
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">
.deliverable_list {
  .deliverable_inline {
    margin-bottom: 10px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    .el-select {
        width: 100%;
    }
  }
  .buttons {
    margin: 30px 0;
    text-align: center;
  }
}
</style>
