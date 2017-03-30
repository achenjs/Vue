<template lang="html">
  <div class="nextAtta">
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
        label="交付物"
        width="80">
        <template scope="scope">
          <a :href="scope.row.url" style="">下载</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="comment_startup"
        label="备注"
        width="400"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="comment_admin"
        label="回复"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="60"
        label="操作">
        <template scope="scope">
          <el-button v-if="scope.$index != attaLength" :disabled="true" type="text" size="small">- -</el-button>
          <el-button v-else-if="status == ('已确认' || '已驳回')" type="text"  :disabled="true" size="small">- -</el-button>
          <el-button v-else @click="midClick(scope.row.id)" type="text" size="small">评审</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition name="fade">
      <div class="modal" v-if="addShow">
        <div class="modal-dialog">
          <div class="modal-header">
            <span>评审</span>
            <i @click="closeModel">关闭</i>
          </div>
          <div class="modal-content">
            <label for="">回复</label>
            <el-input type="textarea" placeholder="描述" v-model="comment.comment"></el-input>
          </div>
          <div class="modal-footer">
            <el-button type="primary" @click="ensure">通过</el-button>
            <el-button type="primary" @click="cancel">驳回</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      form: {
        status: ''
      },
      comment: {
        comment: ''
      },
      attaDetailsId: '',
      padid: '',
      addShow: false,
      status: '',
      attaLength: 1
    }
  },
  created() {
    this.attaDetailsId = localStorage.getItem('attaDetailsId')
    this.details(1)
    this.isStatus()
  },
  methods: {
    reset() {
      this.$data.form = {
        status: '',
      }
      this.$data.comment = {
        comment: ''
      }
    },
    details(page) {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/attachment_details?uaid=' + this.attaDetailsId + '&page=' + page,
        success: function(result) {
          var data = result.result
          for (let i in data.items) {
            if (data.items[i].url === null || data.items[i].url === '') {
                data.items[i].url = '#'
            } else {
              $.ajax({
                url: '/main/api/v1/files/' + data.items[i].url,
                success: function(result) {
                  data.items[i].url = result
                }
              })
            }
          }
          _this.tableData = data.items
          _this.attaLength = data.items.length - 1
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    //  判断提交状态
    isStatus() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/user_attachments/' + this.attaDetailsId,
        success: function(result) {
          var data = result.result
          _this.status = data.status
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    //  审核
    midClick(id) {
      this.addShow = true
      this.padid = id
    },
    //  通过
    ensure() {
      var _this = this
      this.form.status = 'Confirmed'
      var statusReq = new Promise((resolve, reject) => {
        $.ajax({
          url: '/admin/api/v1/user_attachments/' + this.attaDetailsId,
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            return resolve()
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      })
      var commentReq = new Promise((resolve, reject) => {
        $.ajax({
          url: '/admin/api/v1/attachment_details/' + this.padid,
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.comment),
          success: function(result) {
            return resolve()
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      })
      Promise.all([statusReq, commentReq]).then(([status, comment]) => {
        this.$message({
          message: '评审成功',
          type: 'success'
        })
        this.addShow = false
        this.reset()
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    //  驳回
    cancel() {
      var _this = this
      this.addShow = false
      if (this.status === '请求忽略') {
        this.form.status = 'Ignored'
      } else {
        this.form.status = 'Rejected'
      }
      var statusReq = new Promise((resolve, reject) => {
        $.ajax({
          url: '/admin/api/v1/user_attachments/' + this.attaDetailsId,
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            return resolve()
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      })
      var commentReq = new Promise((resolve, reject) => {
        $.ajax({
          url: '/admin/api/v1/attachment_details/' + this.padid,
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.comment),
          success: function(result) {
            return resolve()
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      })
      Promise.all([statusReq, commentReq]).then(() => {
        this.$message({
          message: '评审成功',
          type: 'success'
        })
        this.addShow = false
        this.reset()
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    //  关闭模态框
    closeModel() {
      this.addShow = false
      this.reset()
    },
  }
}
</script>

<style lang="scss">
.nextAtta {
  .submit {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
