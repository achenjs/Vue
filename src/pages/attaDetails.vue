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
        prop="attachment_name"
        label="交付物名称"
        width="140"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        label="附件"
        width="80">
        <template scope="scope">
          <a v-if="status == '请求忽略'"></a>
          <a v-else-if="scope.row.url === '#'"></a>
          <a v-else :href="scope.row.url">下载</a>
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
        label="评审报告"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="60"
        label="操作">
        <template scope="scope">
          <el-button v-if="scope.$index != attaLength" :disabled="true" type="text" size="small">- -</el-button>
          <el-button v-else-if="status == '已确认' || status == '已驳回' || status == '已忽略'" type="text" :disabled="true" size="small">- -</el-button>
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
            <label for="">请输入评审报告</label>
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
import axios from 'axios'
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
      axios.get('/admin/api/v1/attachment_details?uaid=' + this.attaDetailsId + '&page=' + page)
        .then((result) => {
          const data = result.data.result
          for (let i in data.items) {
            if (data.items[i].url === null || data.items[i].url === '') {
                data.items[i].url = '#'
            } else {
              axios.get('/main/api/v1/files/' + data.items[i].url)
                .then((result) => {
                  const Url = result.data
                  if (data == '') {
                    data.items[i].url = '#'
                  } else {
                    data.items[i].url = Url
                  }
                })
            }
          }
          _this.tableData = data.items
          _this.attaLength = data.items.length - 1
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    },
    //  判断提交状态
    isStatus() {
      var _this = this
      axios.get('/admin/api/v1/user_attachments/' + this.attaDetailsId)
        .then((result) => {
          const data = result.data.result
          for(let i in _this.tableData) {
            _this.tableData[i].attachment_name = data.attachment.name
          }
          _this.status = data.status
        })
        .catch((err) => {
          _this.$message.error(err.message)
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
      if (this.status === '请求忽略') {
        this.form.status = 'Ignored'
      } else {
        // this.form.status = 'Rejected'
        this.form.status = 'Confirmed'
      }
      // this.form.status = 'Confirmed'
      this.$confirm('是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         var statusReq = new Promise((resolve, reject) => {
           axios.post('/admin/api/v1/user_attachments/' + this.attaDetailsId, this.form)
            .then((result) => {
              return resolve()
            })
            .catch((err) => {
              _this.$message.error(err.message)
            })
         })
         var commentReq = new Promise((resolve, reject) => {
           axios.post('/admin/api/v1/attachment_details/' + this.padid, this.comment)
            .then((result) => {
              return resolve()
            })
            .catch((err) => {
              _this.$message.error(err.message)
            })
         })
         Promise.all([statusReq, commentReq]).then(([status, comment]) => {
           this.$message({
             message: '评审成功',
             type: 'success'
           })
           this.addShow = false
           setTimeout(function() {
             this.$router.push('/nextAtta')
           }, 500)
           this.reset()
         }).catch((err) => {
           this.$message.error(err)
         })
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消'
         })
       })
    },
    //  驳回
    cancel() {
      var _this = this
      this.addShow = false
      this.form.status = 'Rejected'
      this.$confirm('是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         var statusReq = new Promise((resolve, reject) => {
           axios.post('/admin/api/v1/user_attachments/' + this.attaDetailsId, this.form)
            .then((result) => {
              return resolve()
            })
            .catch((err) => {
              _this.$message.error(err.message)
            })
         })
         var commentReq = new Promise((resolve, reject) => {
           axios.post('/admin/api/v1/attachment_details/' + this.padid, this.comment)
            .then((result) => {
              return resolve()
            })
            .catch((err) => {
              _this.$message.error(err.message)
            })
         })
         Promise.all([statusReq, commentReq]).then(() => {
           this.$message({
             message: '评审成功',
             type: 'success'
           })
           this.addShow = false
           setTimeout(function() {
             this.$router.push('/nextAtta')
           }, 500)
           this.reset()
         }).catch((err) => {
           this.$message.error(err)
         })
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消'
         })
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
