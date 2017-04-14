<template>
   <div class="service_category">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">新增服务项类别</span>
      </el-col>
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
          label="类别名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="类别描述"
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
      <transition name="fade">
        <div class="modal" v-if="addShow">
          <div class="modal-dialog">
            <div class="modal-header">
              <span v-if="id == ''">新增类别</span>
              <span v-else>编辑类别</span>
            </div>
            <div class="modal-content">
              <label for=""><i>*</i>服务项类别名称</label>
              <el-input placeholder="服务项类别名称" v-model="form.name"></el-input>
              <label for="">服务项类别描述</label>
              <el-input type="textarea" :rows="4" placeholder="服务项类别描述" v-model="form.description"></el-input>
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
export default {
    data() {
      return {
        tableData: [],
        addShow: false,
        loading: false,
        total: 1,
        form: {
          name: '',
          description: ''
        },
        id: '',
        page: '',
        regions: [],
        citys: []
      }
    },
    created() {
      this.category(1)
    },
    methods: {
      category(page) {
        //  获取所有服务项
        axios({
          url: '/admin/api/v1/service_categories?page=' + page,
          timeout: 10000,
          transformResponse: [(data) => {
            this.loading = true
            return data
          }]
        })
          .then((result) => {
            this.loading = false
            const data = JSON.parse(result.data).result
            this.total = data.total
            this.tableData = data.items
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
      reset() {
        for(let name in this.$data.form) {
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
        if (this.id === '') {
          if (this.form.name === '') {
            this.$message.error('服务项类别名称不能为空!')
          } else {
            axios.post('/admin/api/v1/service_categories', this.form)
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
          }
        } else {
          if (this.form.name === '') {
            this.$message.error('服务项类别名称不能为空!')
          } else {
            axios.post('/admin/api/v1/service_categories/' + this.id, this.form)
              .then((result) => {
                this.addShow = false
                this.$message({
                  message: result.data.message,
                  type: 'success'
                })
                this.query(this.page)
              })
              .catch((err) => {
                this.$message.error(err.message)
              })
          }
        }
      },
      query(page) {
        this.page = page
        axios({
          url: '/admin/api/v1/service_categories?page=' + page,
          timeout: 10000,
          transformResponse: [(data) => {
            this.loading = true
            return data
          }]
        })
          .then((result) => {
            this.loading = false
            const data = JSON.parse(result.data).result
            this.total = data.total
            this.tableData = data.items
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
      //  根据id查看详情和修改
      midClick(id) {
        this.addShow = true
        this.id = id
        axios.get('/admin/api/v1/service_categories/' + id)
          .then((result) => {
            const data = result.data.result
            this.form = data
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
    },
    components: {
      'v-pages': pages
    }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.service_category {
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
