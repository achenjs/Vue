<template>
   <div class="indent_list">
     <div v-if="id === ''">
       <div class="deliverable_inline clearfix">
         <el-col :span="8">
          <div style="width: 80%;">
            <label for="">服务号</label>
            <el-input placeholder="服务号" v-model="form.id"></el-input>
          </div>
        </el-col>
         <el-col :span="8">
          <div style="width: 80%;">
            <label for="">服务状态</label>
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
          <label for="">服务项类别</label>
          <el-select placeholder="请选择" v-if="isCustom" v-model="form.service_category_id">
            <el-option
            v-for="item in servers"
            :label="item.name"
            :value="item.id"
            :key="item.id">
            </el-option>
          </el-select>
          <el-select placeholder="请选择" v-else v-model="form.category_id">
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
             :editable="false"
             v-model="form.starttime"
             type="date"
             placeholder="选择日期">
           </el-date-picker>
           <span>至</span>
           <el-date-picker
             :editable="false"
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
         <span @click="search(1)">查&nbsp;&nbsp;询</span>
       </div>
       <div class="tabIsCustom">
         <button class="tab-button" :class="{active: !isActive}" @click="tabQuery">系统服务项</button>
         <button class="tab-button" :class="{active: isActive}" @click="tabCustom">自定义服务项</button>
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
             label="服务号"
             width="60"
             show-overflow-tooltip>
           </el-table-column>
           <el-table-column
             align="center"
             prop="project_name"
             label="项目名称"
             width="80"
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
             prop="status"
             label="服务状态"
             width="70"
             show-overflow-tooltip>
           </el-table-column>
           <el-table-column
             align="center"
             prop="gmt_create"
             width="140"
             label="下单时间"
             show-overflow-tooltip>
           </el-table-column>
           <el-table-column
             v-if="isCustom"
             align="center"
             label="附件"
             width="40">
             <template scope="scope">
               <a :href="scope.row.file_name" v-if="scope.row.file_name != '#'">下载</a>
             </template>
           </el-table-column>
           <el-table-column
             align="center"
             prop="price"
             label="服务金额(硬豆)"
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
               <label for="">服务状态</label>
               <el-select placeholder="请选择" v-model="details.status">
                 <el-option
                 v-for="item in condition_details"
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
     <router-view></router-view>
   </div>
</template>

<script>
import axios from 'axios'
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
      condition_details: [
        {
          value: 'Canceled',
          label: '已取消'
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
      currenPage: 1,
      servers: [{name: '全部类别',id: ''}],
      form: {
        starttime: '',
        service_category_id: '',
        description: '',
        endtime: '',
        id: '',
        status: '',
        title: '',
        project_name: '',
        category_id: '',
        page: 1
      },
      tableData: [],
      loading: false,
      total: 1,
      isCustom: true,
      addShow: false,
      id: '',
      isActive: false,
      customId: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    if (this.id == undefined) {
      this.id = ''
      //  获取所有服务包类
      axios.get('/admin/api/v1/service_categories?page=1')
        .then((result) => {
          const data = result.data.result
          for (let i in data.items) {
            this.servers.push(data.items[i])
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
      //  系统服务项
      this.query(1)
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth === 2) {
        this.id = ''
        this.query(1)
      }
    }
  },
  mounted() {
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        if(this.isCustom) {
          this.query(1)
        } else {
          this.search(1)
        }
      }
    }
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
      if(this.isCustom) {
        this.id = id
        this.$router.push('/indent_list/' + id)
      } else {
        this.customId = id
        this.CustomDetail(id)
      }
    },
    //  自定义服务项详情
    CustomDetail(id) {
      this.addShow = true
      axios.get('/admin/api/v1/custom_service_items/' + id)
        .then((result) => {
          const data = result.data.result
          this.CustomDetails.title = data.title
          this.details.category_id = data.category_id
          this.details.status = data.status
        })
        .catch((err) => {
          this.$message.error(err.message)
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
      this.isCustom = true
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
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/user_service_items',
        parameter: {
          starttime: this.form.starttime,
          service_category_id: this.form.service_category_id,
          description: this.form.description,
          endtime: this.form.endtime,
          id: this.form.id,
          status: this.form.status,
          title: this.form.title,
          project_name: this.form.project_name,
          category_id: this.form.category_id,
          page: 1
        }
      })
      var changeUrl = this.$store.getters.changeUrl
      axios({
        url: changeUrl,
        timeout: 10000,
        transformResponse: [(data) => {
          this.loading = true
          return data
        }]
      })
        .then((result) => {
          const data = JSON.parse(result.data).result
          this.total = data.total
          this.loading = false
          for (let i in data.items) {
            var DateTime = data.items[i].gmt_create
  					var timer = new Date(DateTime)
  					timer.setTime(timer.getTime()+0)
			      var  year = timer.getUTCFullYear(),
          			 month = timer.getUTCMonth()+1,
          			 date = timer.getUTCDate(),
          			 hour = timer.getUTCHours(),
          			 minute = timer.getUTCMinutes(),
          			 second = timer.getUTCSeconds();
                 if (hour < 10) {
                   hour = '0' + hour
                 }
                 if (minute < 10) {
                   minute = '0' + minute
                 }
                 if (second < 10) {
                   second = '0' + second
                 }
       			var  time = year + "-" + month + "-" + date + ' ' + hour + ":" + minute + ":" + second
            data.items[i].gmt_create = time

            if (data.items[i].file_name === null || data.items[i].file_name === '') {
                data.items[i].file_name = '#'
            } else {
              axios.get('/main/api/v1/files/' + data.items[i].file_name)
                .then((result) => {
                  const Url = result.data
                  if (data == '') {
                    data.items[i].file_name = '#'
                  } else {
                    data.items[i].file_name = Url
                  }
                })
            }
          }
          this.tableData = data.items
          setTimeout(function() {
            this.loading = false
          }, 500)
        })
        .catch((err) => {
          if (err.indexOf('timeout') >= 0) {
            this.loading = false
            this.$message.error('请求超时!')
          } else {
            this.$message.error(err.message)
          }
        })
    },
    //  自定义服务项列表
    SearchCustomService(page) {
      this.isCustom = false
      if (typeof page != 'object') {
        this.form.page = page
      } else {
        this.form.page = 1
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
      this.$store.dispatch('increment', {
        path: '/admin/api/v1/custom_service_items',
        parameter: {
          starttime: this.form.starttime,
          service_category_id: this.form.service_category_id,
          description: this.form.description,
          endtime: this.form.endtime,
          id: this.form.id,
          status: this.form.status,
          title: this.form.title,
          project_name: this.form.project_name,
          category_id: this.form.category_id,
          page: 1
        }
      })
      var changeUrl = this.$store.getters.changeUrl
      axios({
        url: changeUrl,
        timeout: 10000,
        transformResponse: [(data) => {
          this.loading = true
          return data
        }]
      })
        .then((result) => {
          const data = JSON.parse(result.data).result
          this.total = data.total
          for (let i in data.items) {
            var DateTime = data.items[i].gmt_create
  					var timer = new Date(DateTime)
  					timer.setTime(timer.getTime()+0)
			      var  year = timer.getUTCFullYear(),
          			 month = timer.getUTCMonth()+1,
          			 date = timer.getUTCDate(),
          			 hour = timer.getUTCHours(),
          			 minute = timer.getUTCMinutes(),
          			 second = timer.getUTCSeconds();
                 if (hour < 10) {
                   hour = '0' + hour
                 }
                 if (minute < 10) {
                   minute = '0' + minute
                 }
                 if (second < 10) {
                   second = '0' + second
                 }
         		var	 time = year + "-" + month + "-" + date + ' ' + hour + ":" + minute + ":" + second
            data.items[i].gmt_create = time
          }
          this.tableData = data.items
          setTimeout(function() {
            this.loading = false
          }, 500)
        })
        .catch((err) => {
          if (err.indexOf('timeout') >= 0) {
            this.loading = false
            this.$message.error('请求超时!')
          } else {
            this.$message.error(err.message)
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
      //  修改自定义服务项
      var status = this.details.status
      switch (status) {
        case '已取消':
          this.details.status = 'Canceled'
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
      axios.post('/admin/api/v1/custom_service_items/' + this.customId, obj)
        .then((result) => {
          this.addShow = false
          this.$message({
            message: result.data.message,
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
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
  .tabIsCustom {
    .tab-button {
      background-color: #dddddd;
      border: none;
      padding: 10px 15px;
      color: #232323;
      cursor: pointer;
      margin: 0px;
      outline: none;
    }
    .tab-button.active {
      background-color: #ffffff;
      color: #20a0ff;
      border: 1px solid #d1dbe5;
      border-bottom: none;
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
}
</style>
