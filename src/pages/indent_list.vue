<template>
   <div class="indent_list">
     <div class="deliverable_inline clearfix">
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">订单号</label>
          <el-input placeholder="订单号" v-model="form.id"></el-input>
        </div>
      </el-col>
       <el-col :span="8">
        <div style="width: 80%;">
          <label for="">订单状态</label>
          <el-select placeholder="请选择" v-model="form.status">
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
        <el-input placeholder="项目名称" v-model="form.project_name"></el-input>
       </div>
     </el-col>
   </div>
   <div class="deliverable_inline clearfix">
     <el-col :span="8">
      <div style="width: 80%;">
        <label for="">服务项</label>
       <el-input placeholder="服务项" v-model="form.title"></el-input>
      </div>
     </el-col>
     <el-col :span="8">
      <div style="width: 80%;">
        <label for="">服务包类</label>
        <el-select placeholder="请选择" v-model="form.category_id">
          <el-option
          v-for="item in servers"
          :label="item.name"
          :value="item.id"
          :key="item.id">
          </el-option>
        </el-select>
      </div>
    </el-col>
    </div>
    <div class="deliverable_inline clearfix">
       <el-col :span="15">
         <label for="">交付时间</label>
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
     <!-- <div class="buttons">
       <el-button class="query" type="primary" @click="search">查询</el-button>
       <el-button class="export" type="primary">导出</el-button>
     </div> -->
     <div class="query">
       <span @click="search">查&nbsp;&nbsp;询</span>
     </div>
     <div class="" style="margin-bottom: 20px;">
       <el-button type="primary" class="tab-button" :class="{active: !isActive}" @click="tabQuery">系统服务项</el-button>
       <el-button type="primary" class="tab-button" :class="{active: isActive}" @click="tabCustom">自定义服务项</el-button>
     </div>
     <div class="deliverable_table">
       <el-table
         :data="tableData"
         v-loading="loading"
         border
         element-loading-text="拼命加载中"
         style="width: 100%">
         <el-table-column
           align="center"
           prop="id"
           label="订单号"
           width="60"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           v-if="isCustom"
           align="center"
           prop="service_category_name"
           label="服务项类别"
           width="120"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           v-else
           align="center"
           prop="category_name"
           label="服务项类别"
           width="120"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           v-if="isCustom"
           align="center"
           prop="service_name"
           label="服务项"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           v-else
           align="center"
           prop="description"
           label="服务项"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="gmt_create"
           width="80"
           label="下单时间"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="status"
           label="订单状态"
           width="70"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           prop="price"
           label="订单金额(硬豆)"
           width="110"
           show-overflow-tooltip>
         </el-table-column>
         <el-table-column
           align="center"
           fixed="right"
           width="60"
           label="操作"
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
             <span>服务项详情</span>
           </div>
           <div class="modal-content">
             <label for="" v-if="isCustom">价格(硬豆)</label>
             <el-input placeholder="价格" v-if="isCustom" v-model="UserDetails.price"></el-input>
             <label for="" v-if="!isCustom">服务项</label>
             <el-input placeholder="服务项" :disabled="true" v-if="!isCustom" v-model="CustomDetails.title"></el-input>
             <label for="">服务包类</label>
             <el-select placeholder="请选择" v-if="isCustom" v-model="details.category_id">
               <el-option
               v-for="item in servers"
               :label="item.name"
               :value="item.id"
               :key="item.id">
               </el-option>
             </el-select>
             <el-select placeholder="请选择" v-if="!isCustom" :disabled="true" v-model="details.category_id">
               <el-option
               v-for="item in servers"
               :label="item.name"
               :value="item.id"
               :key="item.id">
               </el-option>
             </el-select>
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
     <v-pages :total="total" :currenPage="currenPage" v-on:currentChange="isSelected"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      details: {
        status: '',
        category_id: ''
      },
      UserDetails: {
        price: '',
      },
      CustomDetails: {
        title: '',
      },
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
      currenPage: 1,
      servers: [],
      form: {
        starttime: '',
        category_id: '',
        description: '',
        endtime: '',
        id: '',
        status: '',
        title: '',
        project_name: ''
      },
      tableData: [],
      loading: false,
      total: 1,
      isCustom: true,
      addShow: false,
      id: '',
      isActive: false
    }
  },
  created() {
    var _this = this
    //  获取所有服务包类
    $.ajax({
      url: '/admin/api/v1/service_categories?page=1',
      success: function(result) {
        var data = result.result
        _this.servers = data.items
      },
      error: function(err) {
        if (err.status == '401') {
          _this.$message.error(JSON.parse(err.responseText).message)
          _this.$router.push('/admin/signin')
        }
      }
    })
    //  系统服务项
    this.query(1)
  },
  methods: {
    //  tab切换
    tabQuery() {
      this.currenPage = 1
      this.isActive = false
      this.query(1)
    },
    tabCustom() {
      this.currenPage = 1
      this.isActive = true
      this.SearchCustomService(1)
    },
    //  清空
    reset() {
      for(var name in this.$data.details) {
        this.$data.details[name] = ''
      }
    },
    //  编辑
    edit(id) {
      this.id = id
      this.addShow = true
      this.reset()
      if(this.isCustom) {
        this.UserDetail(id)
      } else {
        this.CustomDetail(id)
      }
    },
    //  系统服务项详情
    UserDetail(id) {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/user_service_items/' + id,
        success: function(result) {
          var data = result.result
          _this.UserDetails.price = data.service_item.price
          _this.details.category_id = data.service_item.category_id
          var status = data.status
          switch (status) {
            case '已取消':
              _this.details.status = 'Canceled'
              break;
            case '已支付':
              _this.details.status = 'Paid'
              break;
            case '待提交':
              _this.details.status = 'Submitting'
              break;
            case '已提交':
              _this.details.status = 'Submitted'
              break;
            case '已确认':
              _this.details.status = 'Confirmed'
              break;
            case '已完成':
              _this.details.status = 'Finished'
              break;
          }
          _this.details.status = data.status
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    //  自定义服务项详情
    CustomDetail(id) {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/custom_service_items/' + id,
        success: function(result) {
          var data = result.result
          _this.CustomDetails.title = data.title
          _this.details.category_id = data.category_id
          _this.details.status = data.status
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    reset() {
      for(var name in this.$data.form) {
        this.$data.form[name] = ''
      }
    },
    //  判断是否是系统服务项
    isSelected(page) {
      this.currenPage = page
      if(this.isCustom) {
        this.query(page)
      } else {
        this.SearchCustomService(page)
      }
    },
    //  系统服务项列表
    query(page) {
      var _this = this
      this.isCustom = true
      var page
      if (typeof page != 'object') {
        page = page
      } else {
        page = 1
      }
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
        url: '/admin/api/v1/user_service_items?id='+this.form.id+'&project_name='+this.form.project_name+'&category_id='+this.form.category_id+'&title='+this.form.title+'&status='+this.form.status+'&starttime='+this.form.starttime+'&endtime='+this.form.endtime+'&page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.total = data.total
          for (var i in data.items) {
            data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
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
    //  自定义服务项列表
    SearchCustomService(page) {
      this.isCustom = false
      var _this = this
      var page
      if (typeof page != 'object') {
        page = page
      } else {
        page = 1
        this.currenPage = 1
      }
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
        url: '/admin/api/v1/custom_service_items?id='+this.form.id+'&project_name='+this.form.project_name+'&category_id='+this.form.category_id+'&title='+this.form.title+'&status='+this.form.status+'&starttime='+this.form.starttime+'&endtime='+this.form.endtime+'&page=' + page,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.total = data.total
          for (var i in data.items) {
            data.items[i].gmt_create = data.items[i].gmt_create.split('T')[0]
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
    search() {
      if (!this.isCustom) {
        this.SearchCustomService(1)
      } else {
        this.query(1)
      }
    },
    ensure() {
      if(this.isCustom) {
        //  修改系统服务项
        var status = this.details.status
        switch (status) {
          case '已取消':
            this.details.status = 'Canceled'
            break;
          case '已支付':
            this.details.status = 'Paid'
            break;
          case '待提交':
            this.details.status = 'Submitting'
            break;
          case '已提交':
            this.details.status = 'Submitted'
            break;
          case '已确认':
            this.details.status = 'Confirmed'
            break;
          case '已完成':
            this.details.status = 'Finished'
            break;
        }
        var obj = {
          status: this.details.status,
          price: this.UserDetails.price,
          category_id: this.details.category_id
        }
        var _this = this
        $.ajax({
          url: '/admin/api/v1/user_service_items/' + this.id,
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(obj),
          success: function(result) {
            _this.addShow = false
            _this.$message({
              message: result.message,
              type: 'success'
            })
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      } else {
        //  修改自定义服务项
        var status = this.details.status
        switch (status) {
          case '已取消':
            this.details.status = 'Canceled'
            break;
          case '已支付':
            this.details.status = 'Paid'
            break;
          case '待提交':
            this.details.status = 'Submitting'
            break;
          case '已提交':
            this.details.status = 'Submitted'
            break;
          case '已确认':
            this.details.status = 'Confirmed'
            break;
          case '已完成':
            this.details.status = 'Finished'
            break;
        }
        var obj = {
          status: this.details.status,
        }
        var _this = this
        $.ajax({
          url: '/admin/api/v1/custom_service_items/' + this.id,
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(obj),
          success: function(result) {
            _this.addShow = false
            _this.$message({
              message: result.message,
              type: 'success'
            })
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      }
      this.addShow = false
    },
    cancel() {
      this.addShow = false
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
  .tab-button {
    background-color: #dddddd;
    border: none;
  }
  .tab-button.active {
    background-color: #20a0ff;
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
}
</style>
