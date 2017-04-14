<template lang="html">
  <div class="indentDetails">
    <div class="xs"></div>
    <el-table
      :data="tableData"
      border
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
        prop="service_category_name"
        label="服务项类别"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="service_name"
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
        prop="price"
        label="服务金额(硬豆)"
        width="110"
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
        label="附件"
        width="60">
        <template scope="scope">
          <a v-if="scope.row.file_name != '#'" :href="scope.row.file_name">下载</a>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="60">
        <template scope="scope">
          <el-button @click="midClick(scope)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition name="fade">
      <div class="modal" v-if="addShow">
        <div class="modal-dialog">
          <div class="modal-header">
            <span>修改服务项</span>
          </div>
          <div class="modal-content">
            <label for="">服务金额（硬豆）</label>
            <el-input placeholder="服务金额（硬豆）" v-model="details.price"></el-input>
            <label for="">服务状态</label>
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
            <el-button type="primary" @click="midService">确认</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
    </transition>
    <div style="margin-top: 20px;">
      <div class="chatroom">
        <h3>留言板</h3>
        <div class="box" ref="box">
          <div class="record clearfix" v-for="(item, key) in message">
            <div class="avatar" v-if="item.admin_id === null">
              <img :src="item.avatar_url" alt="" width="38" height="38">
              <span class="name">{{item.customer_name}}</span>
            </div>
            <div class="avatar right" v-else>
              <img :src="item.avatar_url" alt="" width="38" height="38">
              <span class="name">{{item.admin_name}}</span>
            </div>
            <div class="message" v-if="item.admin_id === null">
              <p class="date">{{item.gmt_create}}</p>
              <div class="content">
                <span>{{item.content}}</span>
                <a :href="item.uploadName" v-if="item.uploadName != '#'">{{item.file_name}}</a>
              </div>
            </div>
            <div class="message right" v-else>
              <p class="date">{{item.gmt_create}}</p>
              <div class="content">
                <span>{{item.content}}</span>
                <a :href="item.uploadName" v-if="item.uploadName != '#'">{{item.file_name}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="reply">
          <a href="javascript:;" class="file" style="vertical-align: middle;">上传附件
            <input type="file" name="" id="upLog" @change="uploadFile($event)">
          </a>
          <p class="upload_format" title="doc|docx|ppt|pptx|xls|xlsx|txt|rtf|ppt|bmp|png|jpg|jpeg|zip|prt|stp|dxf|dwg|sch|pcb|dsn|brd|pdf">文件格式为:doc|docx|ppt|pptx|xls|xlsx|txt|rtf|ppt|bmp|png|jpg|jpeg|zip|prt|stp|dxf|dwg|sch|pcb|dsn|brd|pdf</p>
          <input type="hidden" id="hiddens">
          <el-input type="textarea" :row="5" placeholder="在此输入回复内容" v-model="form.content"></el-input>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="8" :offset="8">
        <div style="width: 80%; margin: 20px auto;">
          <el-button type="primary" style="width: 200px;" @click="messages">回复</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import upload from '../assets/js/upload'
const URL = 'https://apl-static.oss-cn-beijing.aliyuncs.com/'
export default {
  data() {
    return {
      details: {
        status: '',
        price: '',
      },
      addShow: false,
      conditions: [
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
      servers: [],
      message: [],
      tableData: [],
      form: {
        file_name: '',
        content: '',
        usiid: ''
      }
    }
  },
  created() {
    this.form.usiid = this.$route.params.id
    //  详情
    this.UserDetail()
  },
  methods: {
    midClick(scope) {
      this.addShow = true
      var price = scope.row.price
      var status = scope.row.status
      this.details.price = price
      this.details.status = status
    },
    cancel() {
      this.addShow = false
    },
    //  获取系统服务项详情
    UserDetail() {
      this.tableData = []
      axios.get('/admin/api/v1/user_service_item/messages/' + this.form.usiid)
        .then((result) => {
          const data = result.data.result
          const userService = data.user_service
          const status = userService.status
          if (userService.file_name != '' && userService.file_name != null) {
            axios.get('/main/api/v1/files/' + userService.file_name)
              .then((result) => {
                const Url = result.data
                if (Url == '') {
                  userService.file_name = '#'
                } else {
                  userService.file_name = Url
                }
              })
          } else {
            userService.file_name = '#'
          }
          switch (status) {
            case '已取消':
              this.details.status = 'Canceled'
              break;
            case '已确认':
              this.details.status = 'Confirmed'
              break;
            case '已完成':
              this.details.status = 'Finished'
              break;
          }
          this.details.price = userService.price
          for (let i in data.items) {
            var timer = data.items[i].gmt_create;
			      var timer = new Date(timer)
					  timer.setTime(timer.getTime() + 0)
		        var year = timer.getUTCFullYear(),
      			month = timer.getUTCMonth() + 1,
      			date = timer.getUTCDate(),
      			hour = timer.getUTCHours(),
      			minute = timer.getUTCMinutes(),
      			second = timer.getUTCSeconds(),
     			  time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
      		  data.items[i].gmt_create = time
            //  判断是否有头像
            var avatar_url = data.items[i].avatar_url
            if (avatar_url === null || avatar_url === '') {
              data.items[i].avatar_url = '../../assets/logo.png'
            } else {
              data.items[i].avatar_url = URL + data.items[i].avatar_url
            }
            //  判断是否有上传附件
            if (data.items[i].file_name === null || data.items[i].file_name === '') {
              data.items[i].file_name = ''
            } else {
              axios.get('/main/api/v1/files/' + data.items[i].file_name)
                .then((result) => {
                  if (result.data == '') {
                    data.items[i].uploadName = ''
                  } else {
                    data.items[i].uploadName = result.data
                  }
                })
            }
          }
          var timer = userService.gmt_create
          var timers = new Date(timer)
          timers.setTime(timers.getTime()+0)
          var year = timers.getUTCFullYear(),
          month = timers.getUTCMonth()+1,
          date = timers.getUTCDate(),
          hour = timers.getUTCHours(),
          minute = timers.getUTCMinutes(),
          second = timers.getUTCSeconds();
          // time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
          userService.gmt_create = year + "-" + month + "-" + date
          this.tableData.push(userService)
          this.message = data.items
          this.$refs.box.scrollTop = this.$refs.box.scrollHeight
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    //  上传
    uploadFile(ele) {
      upload(ele.target, '')
    },
    //  回复消息
    messages() {
      this.form.file_name = $('#hiddens').val()
      axios.post('/admin/api/v1/user_service_items/message', this.form)
        .then((result) => {
          this.$message({
            message: result.data.result,
            type: 'success'
          })
          this.UserDetail()
          this.form.content = ''
          this.form.file_name = ''
        })
    },
    midService() {
      //  修改系统服务项
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
      axios.post('/admin/api/v1/user_service_items/' + this.form.usiid, this.details)
        .then((result) => {
          this.addShow = false
          this.$message({
            message: result.data.message,
            type: 'success'
          })
          this.UserDetail()
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    }
  },
}
</script>

<style lang="scss">
.indentDetails {
  label {
    display: block;
  }
  .chatroom {
    h3 {
      text-align: center;
      margin: 10px 0;
    }
    .box {
      border: 1px solid #efefef;
      height: 300px;
      overflow-y: auto;
      .record {
        margin-top: 5px;
        .avatar {
          width: 50px;
          float: left;
          text-align: center;
          &.right {
            float: right;
          }
          img {
            border-radius: 50%;
            display: inline-block;
          }
          .name {
            font-size: 12px;
            color: #807f8a;
          }
        }
        .message {
          float: left;
          margin: 0 10px;
          .date {
            font-size: 12px;
            color: #807f8a;
          }
          &.right {
            float: right;
            text-align: right;
          }
          .content {
            display: inline-block;
            background-color: #EFEFEF;
            color: #027EE5;
            border: 1px solid #cccccc;
            border-radius: 10px;
            padding: 10px;
            a {
              color: red;
              cursor: pointer;
            }
          }
        }
      }
    }
    .reply {
      border: 1px solid #efefef;
      .upload_format {
        width: 200px;
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow: hidden;
      }
      textarea {
        border: none !important;
      }
    }
  }
}
</style>
