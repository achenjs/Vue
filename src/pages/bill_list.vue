<template>
   <div class="bill_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="4">
         <div style="width: 80%;">
           <label for="">项目名称</label>
           <el-input placeholder="项目名称" v-model="form.project_name"></el-input>
         </div>
       </el-col>
       <el-col :span="4">
         <div style="width: 80%;">
           <label for="">服务名称</label>
           <el-input placeholder="服务名称" v-model="form.service_name"></el-input>
         </div>
       </el-col>
       <el-col :span="4">
         <div style="width: 80%;">
           <label for="">订单号</label>
          <el-input placeholder="订单号" v-model="form.id"></el-input>
         </div>
       </el-col>
       <el-col :span="12">
         <label for="">交易日期</label>
         <el-date-picker
           v-model="form.starttime"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
         <span>至</span>
         <el-date-picker
           v-model="form.endtime"
           type="date"
           placeholder="选择日期">
         </el-date-picker>
       </el-col>
     </div>
     <div class="query">
       <span @click="query(1)">查&nbsp;&nbsp;询</span>
     </div>
     <div class="deliverable_table">
       <el-table
         :data="tableData"
         border
         style="width: 100%">
         <el-table-column
            align="center"
            prop="id"
            label="订单号"
            show-overflow-tooltip
            width="60">
         </el-table-column>
         <el-table-column
            align="center"
            prop="project_name"
            label="项目名称"
            show-overflow-tooltip>
         </el-table-column>
         <el-table-column
            align="center"
            prop="service_name"
            label="服务名称"
            show-overflow-tooltip>
         </el-table-column>
         <el-table-column
            align="center"
            prop="price"
            label="金额(硬豆)"
            show-overflow-tooltip
            width="80">
         </el-table-column>
         <el-table-column
            align="center"
            prop="gmt_create"
            label="下单时间"
            show-overflow-tooltip
            width="80">
         </el-table-column>
       </el-table>
     </div>
     <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {
        project_name: '',
        id: '',
        starttime: '',
        endtime: '',
        service_name: '',
        page: 1
      },
      tableData: [],
      total: 1,
      loading: false
    }
  },
  created() {
    this.query(1)
  },
  computed: {

  },
  methods: {
    IninParams() {
      for (let i in this.$data.form) {
        if (!this.$data.form[i]) {
          this.$data.form[i] = undefined
        }
      }
    },
    query(page) {
      this.IninParams()
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/bills',
        parameter: this.form
      })
      var changeUrl = this.$store.getters.changeUrl
      var _this = this
      this.form.page = page
      if (this.form.starttime === '') {
        this.form.starttime = ''
      } else {
        this.form.starttime = Date.parse(new Date(this.form.starttime))
      }
      if (this.form.endtime === '') {
        this.form.endtime = ''
      } else {
        this.form.endtime = Date.parse(new Date(this.form.endtime))
      }
      $.ajax({
        url: '/admin/api/v1/bills' + changeUrl,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 10000,
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.total = data.total
          for (var i in data.items) {
            var DateTime = data.items[i].gmt_create
  					var timer = new Date(DateTime)
  					timer.setTime(timer.getTime()+0)
			      var  year = timer.getUTCFullYear(),
          			 month = timer.getUTCMonth()+1,
          			 date = timer.getUTCDate(),
          			 hour = timer.getUTCHours(),
          			 minute = timer.getUTCMinutes(),
          			 second = timer.getUTCSeconds(),
         			   time = year + "-" + month + "-" + date
            data.items[i].gmt_create = time
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
            _this.$router.push('/signin')
          }
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
.bill_list {
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
  .query {
     margin: 30px 0;
     text-align: center;
     span {
         display: inline-block;
         font-size: 14px;
         width: 300px;
         height: 40px;
         line-height: 40px;
         cursor: pointer;
         background-color: #027ee5;
         color: #ffffff;
     }
  }
  .buttons {
    margin: 30px 0;
    text-align: center;
  }
}
</style>
