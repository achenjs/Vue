<template>
   <div class="attachments">
     <div class="xs"></div>
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
            width="50"
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
              <span v-if="scope.row.url == '#'"></span>
              <a v-else :href="scope.row.url">下载</a>
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
              <span v-if="id == ''">新增交付物</span>
              <span v-else>编辑交付物</span>
            </div>
            <div class="modal-content">
              <label for=""><i>*</i>交付物名称</label>
              <el-input placeholder="交付物名称" v-model="form.name"></el-input>
              <label for="">附件</label>
              <input type="text" name="" value="" id="filename" :disabled="true" v-model="form.url">
              <input type="hidden" name="" value="" id="hiddens">
              <a href="javascript:;" class="file" style="vertical-align: middle;">上传附件
                <input type="file" name="" id="upLog" @change="uploadFile($event)">
              </a>
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
import axios from 'axios'
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
        upload(ele.target, '')
      },
      reset() {
        for(var name in this.$data.form) {
          this.$data.form[name] = ''
        }
      },
      addOpen() {
        this.reset()
        this.id = ''
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        var _this = this
        if (this.form.name === '') {
          this.$message.error('必填字段不能为空!')
        } else {
          if (this.id === '') {
            //  新增
            axios.post('/admin/api/v1/attachments', this.form)
              .then((result) => {
                _this.addShow = false
                _this.$message({
                  message: result.data.message,
                  type: 'success'
                })
                _this.query(1)
              })
              .catch((err) => {
                _this.$message.error(err.message)
              })
          } else {
            //  修改
            _this.form.url = $("#hiddens").val()
            axios.post('/admin/api/v1/attachments/' + this.id, this.form)
              .then((result) => {
                _this.addShow = false
                _this.$message({
                  message: result.data.message,
                  type: 'success'
                })
                _this.query(_this.page)
              })
              .catch((err) => {
                _this.$message.error(err.message)
              })
          }
        }
      },
      //  列表查询
      query(page) {
        var _this = this
        this.page = page
        axios({
          url: '/admin/api/v1/attachments?page=' + this.page,
          transformResponse: [(data) => {
            _this.loading = true
            return data
          }],
          timeout: 10000
        })
          .then((result) => {
            const data = JSON.parse(result.data).result
            _this.loading = false
            _this.total = data.total
            for (let i in data.items) {
              if (data.items[i].url === '' || data.items[i].url === null) {
                  data.items[i].url = '#'
              } else {
                axios.get('/main/api/v1/files/' + data.items[i].url)
                  .then((result) => {
                    if (result.data == '') {
                      data.items[i].url = '#'
                    } else {
                      data.items[i].url = result.data
                    }
                  })
              }
            }
            _this.tableData = data.items
          })
          .catch((err) => {
            if (err.indexOf('timeout') >= 0) {
              _this.loading = false
              _this.$message.error('请求超时!')
            } else {
              _this.$message.error(err.message)
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
              _this.$router.push('/signin')
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
