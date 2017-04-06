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
        label="订单号"
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
    </el-table>
    <el-row style="margin-top: 30px;">
      <el-col :span="8">
        <div style="width: 80%;">
          <label for="">价格(硬豆)</label>
          <el-input placeholder="价格" v-model="details.price"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="width: 80%; margin: 0 auto;">
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
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <div style="width: 80%; margin: 20px auto;">
          <el-button type="primary" style="width: 200px;" @click="midService">提交</el-button>
        </div>
      </el-col>
    </el-row>
    <div>
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
                {{item.content}}
                <a :href="item.file_name" v-if="item.file_name != '#'">下载</a>
              </div>
            </div>
            <div class="message right" v-else>
              <p class="date">{{item.gmt_create}}</p>
              <div class="content">
                {{item.content}}
                <a :href="item.file_name" v-if="item.file_name != '#'">下载</a>
              </div>
            </div>
          </div>
        </div>
        <div class="reply">
          <a href="javascript:;" class="file" style="vertical-align: middle;">上传附件
            <input type="file" name="" id="upLog" @change="uploadFile($event)">
          </a>
          <input type="hidden" id="hiddens" v-model="form.file_name">
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
import upload from '../assets/js/upload'
const URL = 'https://apl-static.oss-cn-beijing.aliyuncs.com/'
export default {
  data() {
    return {
      details: {
        status: '',
        price: '',
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
    var _this = this
    //  获取所有服务包类
    // $.ajax({
    //   url: '/admin/api/v1/service_categories?page=1',
    //   success: function(result) {
    //     var data = result.result
    //     _this.servers = data.items
    //   },
    //   error: function(err) {
    //     if (err.status == '401') {
    //       _this.$message.error(JSON.parse(err.responseText).message)
    //       _this.$router.push('/admin/signin')
    //     }
    //   }
    // })
    //  详情
    this.UserDetail()
  },
  methods: {
    reset() {
      for(var name in this.$data.form) {
        this.$data.form[name] = ''
      }
    },
    //  获取系统服务项详情
    UserDetail() {
      const _this = this
      $.ajax({
        url: '/admin/api/v1/user_service_item/messages/' + this.form.usiid,
        success: function(result) {
          const data = result.result
          const userService = data.user_service
          const status = userService.status
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
          _this.details.price = userService.price
          for(var i=0; i<data.items.length; i++) {
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
            var file_name = data.items[i].file_name
            if (file_name === null || file_name === '') {
              data.items[i].file_name = '#'
            } else {
              var index = i
              console.log(index)
              $.ajax({
                url: '/main/api/v1/files/' + data.items[i].file_name,
                success: function(result) {
                  data.items[index].file_name = result
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
          _this.tableData.push(userService)
          setTimeout(function() {
            _this.message = data.items
          }, 1000)
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/signin')
          }
        }
      })
    },
    //  上传
    uploadFile(ele) {
      upload(ele.target, '', () => {
        this.form.file_name = $('#hiddens').val()
      })
    },
    //  回复消息
    messages() {
      const _this = this
      $.ajax({
        url: '/admin/api/v1/user_service_items/message',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(this.form),
        success: function(result) {
          _this.UserDetail()
          _this.$refs.box.scrollTop = _this.$refs.box.scrollHeight
          _this.reset()
          var file = $('#upLog')
          file.after(file.clone().val(""))
          file.remove()
        }
      })
    },
    midService() {
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
      var _this = this
      $.ajax({
        url: '/admin/api/v1/user_service_items/' + this.form.usiid,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(this.details),
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
            _this.$router.push('/signin')
          }
        }
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
            .date {
              text-align: right;
            }
            float: right;
          }
          .content {
            background-color: #EFEFEF;
            color: #027EE5;
            border: 1px solid #cccccc;
            border-radius: 10px;
            padding: 10px;
          }
        }
      }
    }
    .reply {
      border: 1px solid #efefef;
      textarea {
        border: none !important;
      }
    }
  }
}
</style>
