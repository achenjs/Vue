<template>
   <div class="attachments">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增交付物</span>
      </el-col>
      <div class="">
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
            width="40"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="交付物名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="附件"
            width="60">
            <template scope="scope">
              <a :href="scope.row.url" style="">下载</a>
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
      </div>
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span>新增交付物</span>
            </div>
            <div class="modal-content">
              <label for="">交付物名称</label>
              <el-input placeholder="交付物名称" v-model="form.name"></el-input>
              <label for="">附件</label>
              <input type="text" name="" value="" id="hiddens" v-model="form.url" :disabled="true">
              <input type="file" @change="uploadFile($event)" id="upLog">
              <label for="">描述</label>
              <el-input placeholder="描述" v-model="form.description"></el-input>
            </div>
            <div class="modal-footer">
              <el-button type="primary" @click="ensure">确认</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </div>
          </div>
        </div>
      </transition>
      <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
import upload from '../assets/js/upload'
export default {
    data() {
      return {
        tableData: [],
        addShow: false,
        loading: false,
        total: 1,
        form: {
          description: '',
          name: '',
          url: ''
        },
        page: 1,
      }
    },
    methods: {
      //  上传
      uploadFile(ele) {
        var _this = this
        upload(ele.target, 2, () => {
          _this.form.url = $("#hiddens").val()
        })
      },
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addOpen() {
        this.reset()
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        var _this = this
        if (this.id === '') {
          //  新增
          $.ajax({
            url: '/admin/api/v1/attachments',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(this.form),
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
          //  修改
          $.ajax({
            url: '/admin/api/v1/attachments/' + this.id,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(this.form),
            success: function(result) {
              _this.addShow = false
              _this.$message({
                message: result.message,
                type: 'success'
              })
              _this.query(_this.page)
            },
            error: function(err) {
              if (err.status == '401') {
                _this.$message.error(JSON.parse(err.responseText).message)
                _this.$router.push('/admin/signin')
              }
            }
          })
        }
      },
      //  列表查询
      query(page) {
        var _this = this
        this.page = page
        $.ajax({
          url: '/admin/api/v1/attachments?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          timeout: 5000,
          success: function(result) {
            var data = result.result
            _this.loading = false
            _this.total = data.total
            for (let i in data.items) {
              if (data.items[i].url === '' || data.items[i].url === null) {
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
      //  根据id查看详情和修改
      midClick(id) {
        var _this = this
        this.addShow = true
        this.id = id
        $.ajax({
          url: '/admin/api/v1/attachments/' + id,
          success: function(result) {
            var data = result.result
            _this.form = data
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/admin/signin')
            }
          }
        })
      }
    },
    created() {
      this.query(1)
    },
    components: {
      'v-pages': pages
    }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.attachments {
  .add_item {
    text-align: center;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    background-color: #027ee5;
    color: #fff;
    border-radius: 50px;
    margin-bottom: 40px;
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      font-size: 18px;
    }
  }
}
</style>
