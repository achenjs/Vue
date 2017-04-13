<template>
   <div class="service_custom">
     <el-row>
       <el-col :span="5">
         <div style="width: 80%;">
           <label for="">编号</label>
           <el-input placeholder="编号" v-model="query.id"></el-input>
         </div>
       </el-col>
       <el-col :span="5">
         <div style="width: 80%;">
           <label for="">关键字</label>
           <el-input placeholder="关键字" v-model="query.keyword"></el-input>
         </div>
       </el-col>
       <el-col :span="14">
         <label for="">交易日期</label>
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
       </el-col>
     </el-row>
     <el-row style="margin-top: 10px; margin-bottom: 20px;">
       <el-col :span="5">
         <div style="width: 80%;">
           <label for="">类别</label>
           <el-select v-model="query.category_id" placeholder="请选择类别">
             <el-option
             v-for="item in Categorys"
             :label="item.name"
             :value="item.id"
             :key="item.name">
             </el-option>
           </el-select>
         </div>
       </el-col>
       <el-col :span="5">
         <div style="width: 80%;">
           <label for="">状态</label>
           <el-select v-model="query.status" placeholder="请选择类别">
             <el-option
             v-for="item in conditions"
             :label="item.label"
             :value="item.value"
             :key="item.label">
             </el-option>
           </el-select>
         </div>
       </el-col>
     </el-row>
     <div class="query">
       <span @click="search(1)">查&nbsp;&nbsp;询</span>
     </div>
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
         prop="title"
         label="服务项名称"
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
         prop="category_name"
         label="类别"
         width="100"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="price"
         label="报价(硬豆)"
         width="80"
         show-overflow-tooltip>
       </el-table-column>
       <el-table-column
         align="center"
         prop="status"
         label="状态"
         width="60">
       </el-table-column>
       <el-table-column
         align="center"
         width="60"
         label="附件">
         <template scope="scope">
           <a v-if="scope.row.file_name != '#'" :href="scope.row.file_name">下载</a>
         </template>
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
     <v-pages :total="total" v-on:currentChange="search"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
  data () {
    return {
      query: {
        id: '',
        starttime: '',
        endtime: '',
        status: '',
        keyword: '',
        category_id: '',
        page: 1
      },
      conditions: [
        {
          value: '',
          label: '全部状态'
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
      loading: false,
      addShow: false,
      details: {
        status: '',
        price: ''
      },
      Categorys: []
    }
  },
  created() {
    this.categorys()
    this.search(1)
  },
  mounted() {
    var _this = this
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        _this.search(1)
      }
    }
  },
  methods: {
    reset() {
      for(var name in this.$data.form) {
        this.$data.form[name] = ''
      }
    },
    //  全部类别
    categorys() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/service_categories?page=1',
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.total = data.total
          _this.Categorys = data.items
          _this.Categorys.unshift({name: '全部类别', id: ''})
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/signin')
          }
        }
      })
    },
    addOpen() {
      this.reset()
      this.addShow = true
    },
    cancel() {
      this.addShow = false
    },
    search(page) {
      var _this = this
      this.query.page = page
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/custom_service_items',
        parameter: {
          id: this.query.id,
          starttime: this.query.starttime,
          endtime: this.query.endtime,
          status: this.query.status,
          keyword: this.query.keyword,
          category_id: this.query.category_id,
          page: 1
        }
      })
      var changeUrl = this.$store.getters.changeUrl
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
        url: changeUrl,
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 10000,
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
                  if (result == '') {
                    data.items[i].file_name = '#'
                  } else {
                    data.items[i].file_name = result
                  }
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
            _this.$router.push('/signin')
          }
        }
      })
    },
    ensure() {
      var _this = this
      if (/^[\u4e00-\u9fa5]+$/.test(this.details.status)) {
        for(let i in this.conditions) {
          if(this.conditions[i].label === this.details.status) {
            this.details.status = this.conditions[i].value
          }
        }
      }
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
          _this.search(_this.page)
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/signin')
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
            _this.$router.push('/signin')
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
  label {
    display: block;
    margin-bottom: 5px;
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
