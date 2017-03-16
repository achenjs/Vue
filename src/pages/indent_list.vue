<template>
   <div class="indent_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">订单号</label>
         <el-input placeholder="订单号"></el-input>
        </div>
      </el-col>
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">订单状态</label>
          <el-select placeholder="请选择">
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
        <el-input placeholder="项目名称"></el-input>
       </div>
     </el-col>
   </div>
   <div class="deliverable_inline clearfix">
     <el-col :span="8">
      <div style="width: 80%;">
        <label for="">服务项</label>
       <el-input placeholder="服务项"></el-input>
      </div>
     </el-col>
     <el-col :span="8">
       <div style="width: 80%;">
         <label for="">服务包名称</label>
        <el-input placeholder="服务包名称" v-model="form.service_name"></el-input>
       </div>
     </el-col>
     <el-col :span="8">
      <div style="width: 80%;">
        <label for="">服务包类</label>
        <el-select placeholder="请选择">
          <el-option
          v-for="item in servers"
          :label="item.label"
          :value="item.value"
          :key="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
    </div>
    <div class="deliverable_inline clearfix">
       <el-col :span="12">
         <div style="width: 80%;">
           <label for="">交付时间</label>
           <el-date-picker
             v-model="form.starttime"
             type="date"
             placeholder="选择日期"
             :picker-options="pickerOptions0">
           </el-date-picker>
           <span>至</span>
           <el-date-picker
             v-model="form.endtime"
             type="date"
             placeholder="选择日期"
             :picker-options="pickerOptions1">
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
         style="width: 100%">
         <el-table-column
           align="center"
           prop="id"
           label="订单号">
         </el-table-column>
         <el-table-column
           align="center"
           prop="service_name"
           label="服务项">
         </el-table-column>
         <el-table-column
           align="center"
           prop="gmt_create"
           label="下单时间">
         </el-table-column>
         <el-table-column
           align="center"
           prop="status"
           label="订单状态">
         </el-table-column>
         <el-table-column
           align="center"
           prop="price"
           label="订单金额">
         </el-table-column>
         <el-table-column
           align="center"
           fixed="right"
           label="操作">
           <template scope="scope">
             <el-button type="text" size="small">查看</el-button>
             <el-button type="text" size="small">编辑</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
     <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      form: {
        starttime: '',
        endtime: '',
        id: '',
        service_name: '',
        project_name: ''
      },
      tableData: [],
      loading: false,
      total: 1
    }
  },
  created() {
    var _this = this
    $.ajax({
      url: '/admin/api/v1/user_service_items?page=1',
      beforeSend: function() {
        _this.loading = true
      },
      success: function(result) {
        let data = result.result
        _this.loading = false
        _this.total = data.total
        for(var i in data.items){
  				if(data.items[i].status=='ServiceStatus.Submitting'){
  					data.items[i].status='待提交'
  				}
  				if(data.items[i].status=='ServiceStatus.Ignoring'){
  					data.items[i].status='请求忽略'
  				}
  				if(data.items[i].status=='ServiceStatus.Ignored'){
  					data.items[i].status='已忽略'
  				}
  				if(data.items[i].status=='ServiceStatus.Rejected'){
  					data.items[i].status='已驳回'
  				}
  				if(data.items[i].status=='ServiceStatus.Submitted'){
  					data.items[i].status='已提交'
  				}
  				if(data.items[i].status=='ServiceStatus.Confirmed'){
  					data.items[i].status='已确认'
  				}
  				if(data.items[i].status=='ServiceStatus.Finished'){
  					data.items[i].status='已完成'
  				}
  			}
        _this.tableData = data.items
      }
    })
  },
  methods: {
    query(page) {
      var _this = this
      var page
      if (typeof page != 'object') {
        page = page
      } else {
        page = 1
      }
      if (this.form.starttime === '') {
        this.form.starttime = ''
      } else {
        var starttime = new Date(this.form.starttime)
        this.form.starttime = starttime.getFullYear() + '-' + (starttime.getMonth() + 1) + '-' + starttime.getDate()
      }
      if (this.form.endtime === '') {
        this.form.endtime = ''
      } else {
        var endtime = new Date(this.form.endtime)
        this.form.endtime = endtime.getFullYear() + '-' + (endtime.getMonth() + 1) + '-' + endtime.getDate()
      }
      $.ajax({
        url: '/admin/api/v1/user_service_items?id='+this.form.id+'&project_name='+this.form.project_name+'&starttime='+this.form.starttime+'&endtime='+this.form.endtime+'&page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.total = data.total
          _this.tableData = data.items
        }
      })
    }
  },
  components: { 'v-pages': pages }
}
</script>

<style lang="scss">
.indent_list {
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
