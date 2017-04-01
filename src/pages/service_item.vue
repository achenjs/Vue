<template>
   <div class="service_item">
     <div class="xs">

     </div>
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增服务项</span>
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
            label="服务项名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="desc"
            label="服务项描述"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="category_name"
            label="类别"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="input"
            label="输入"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            width="120"
            prop="output"
            label="输出"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            width="50"
            label="附件">
            <template scope="scope">
              <a :href="scope.row.zip_url">下载</a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="price"
            width="80"
            label="报价(硬豆)"
            show-overflow-tooltip>
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
              <span>新增服务项</span>
            </div>
            <div class="modal-content">
              <label for="">服务项名称</label>
              <el-input placeholder="服务项名称" v-model="form.name"></el-input>
              <label for="">服务项描述</label>
              <el-input placeholder="服务项描述" v-model="form.desc"></el-input>
              <label for="">类别</label>
              <el-select placeholder="请选择" v-model="form.category_id">
                <el-option
                v-for="item in categorys"
                :label="item.name"
                :value="item.id"
                :key="item.id">
                </el-option>
              </el-select>
              <a href="javascript:;" class="file" style="margin: 10px 0;">上传附件
                <input type="file" name="" id="upLog" @change="uploadFile($event)">
              </a>
              <input type="hidden" id="hiddens" v-model="form.zip_url">
              <label for="">报价(硬豆)</label>
              <el-input placeholder="报价" v-model="form.price"></el-input>
              <label for="">输入</label>
              <el-input placeholder="输入" v-model="form.input"></el-input>
              <label for="">输出</label>
              <el-input placeholder="输出" v-model="form.output"></el-input>
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
        categorys: [],
        total: 1,
        categoryValue: '',
        form: {
          desc: '',
          name: '',
          price: '',
          category_id: '',
          output: '',
          input: '',
          zip_url: ''
        },
        loading: false,
        total: 1,
        page: '',
        id: ''
      }
    },
    created() {
      var _this = this
      this.query(1)

      //  服务类别
      $.ajax({
        url: '/admin/api/v1/service_categories?page=1',
        beforeSend: function() {
          _this.loading = true
        },
        timeout: 5000,
        success: function(result) {
          _this.loading = false
          var data = result.result
          _this.categorys = data.items
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
    methods: {
      //  上传
      uploadFile(ele) {
        var _this = this
        upload(ele.target, 2, () => {
          _this.form.zip_url = $("#hiddens").val()
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
            url: '/admin/api/v1/service_items',
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
            url: '/admin/api/v1/service_items/' + this.id,
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
      query(page) {
        var _this = this
        this.page = page
        $.ajax({
          url: '/admin/api/v1/service_items?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          success: function(result) {
            let data = result.result
            _this.loading = false
            _this.total = data.total
            for (let i in data.items) {
              if (data.items[i].zip_url === null || data.items[i].zip_url === '') {
                  data.items[i].zip_url = '#'
              } else {
                $.ajax({
                  url: '/main/api/v1/files/' + data.items[i].zip_url,
                  success: function(result) {
                    data.items[i].zip_url = result
                  }
                })
              }
            }
            _this.tableData = data.items
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
          url: '/admin/api/v1/service_items/' + id,
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
      },
    },
    components: { 'v-pages': pages }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.service_item {
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
