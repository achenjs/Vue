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
       <el-button class="query" type="primary">查询</el-button>
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
           label="编号">
         </el-table-column>
         <el-table-column
           align="center"
           prop="attachment_name"
           label="项目名称"
           width="120">
         </el-table-column>
         <el-table-column
           align="center"
           prop="phase_id"
           label="阶段">
         </el-table-column>
         <el-table-column
           align="center"
           prop="phase_name"
           width="150"
           label="交付物名称">
         </el-table-column>
         <el-table-column
           align="center"
           prop="gmt_create"
           width="150"
           label="交付时间">
         </el-table-column>
         <el-table-column
           align="center"
           prop="status"
           label="状态">
         </el-table-column>
         <el-table-column
            align="center"
           fixed="right"
           label="操作"
           width="100">
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
             <label for="">交付物名称</label>
             <el-input placeholder="交付物名称" v-model="details.attachment_name"></el-input>
             <label for="">订单状态</label>
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
          value: 'Ignoring',
          label: '请求忽略'
        },
        {
          value: 'Ignored',
          label: '已忽略'
        },
        {
          value: 'Rejected',
          label: '已驳回'
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
        attachment_name: '',
        status: ''
      },
      tableData: [],
      loading: false,
      total: 1,
    }
  },
  created() {
    //  获取交付物列表
    var _this = this
    $.ajax({
      url: '/admin/api/v1/phases_attachments?page=1',
      beforeSend: function() {
        _this.loading = true
      },
      success: function(result) {
        let data = result.result
        _this.loading = false
        _this.total = data.total
        for (var i in data.items) {
          data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
        }
        _this.tableData = data.items
      }
    })
  },
  methods: {
    //  点击编辑获取单个详情
    edit(id) {
      var _this = this
      this.addShow = true
      $.ajax({
        url: '/admin/api/v1/phases_attachments/' + id,
        success: function(result) {
          var data = result.result
          _this.details.attachment_name = data.attachment_name
          _this.details.status = data.status
        }
      })
    },
    //  分页查询
    searchPage(page) {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/phases_attachments?attachment_name='+ this.query.attachment_name +'&starttime='+ this.query.starttime +'&endtime='+ this.query.endtime +'&status='+ this.query.status +'&page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          let data = result.result
          _this.loading = false
          _this.total = data.total
          for (var i in data.items) {
            data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
          }
          _this.tableData = data.items
        }
      })
    },
    //  确定
    ensure() {
      this.addShow = false
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
