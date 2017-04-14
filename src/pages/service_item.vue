<template>
   <div class="service_item">
     <el-row>
       <el-col :span="5">
         <div style="width: 80%;">
           <label for="">服务项名称</label>
           <el-input placeholder="服务项名称" v-model="query.name"></el-input>
         </div>
       </el-col>
       <el-col :span="8">
         <div style="width: 80%;">
           <label for="">服务项类别</label>
           <el-select v-model="query.category_id" placeholder="请选择服务项类别">
             <el-option
             v-for="item in categorys"
             :label="item.name"
             :value="item.id"
             :key="item.name">
             </el-option>
           </el-select>
         </div>
       </el-col>
     </el-row>
     <div class="query">
       <span @click="search(1)">查&nbsp;&nbsp;询</span>
     </div>
     <div class="xs"></div>
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
              <span v-if="id == ''">新增服务项</span>
              <span v-else>编辑服务项</span>
            </div>
            <div class="modal-content">
              <label for=""><i>*</i>服务项名称</label>
              <el-input placeholder="服务项名称" v-model="form.name"></el-input>
              <label for="">服务项描述</label>
              <el-input type="textarea" :rows="2" placeholder="服务项描述" v-model="form.desc"></el-input>
              <label for=""><i>*</i>类别</label>
              <el-select placeholder="请选择" v-model="form.category_id">
                <el-option
                v-for="item in categorys"
                :label="item.name"
                :value="item.id"
                :key="item.id">
                </el-option>
              </el-select>
              <input type="hidden" id="hiddens" v-model="form.zip_url">
              <label for=""><i>*</i>报价(硬豆)</label>
              <el-input placeholder="报价" v-model="form.price"></el-input>
              <label for="">输入</label>
              <el-input type="textarea" :rows="2" placeholder="输入" v-model="form.input"></el-input>
              <label for="">输出</label>
              <el-input type="textarea" :rows="2" placeholder="输出" v-model="form.output"></el-input>
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
import axios from 'axios'
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
        query: {
          page: 1,
          name: '',
          category_id: ''
        },
        loading: false,
        total: 1,
        id: ''
      }
    },
    created() {
      this.search(1)
      this.categoryInfo(1)
    },
    mounted() {
      document.onkeydown = (ev) => {
        if (ev.keyCode == 13) {
          this.search(1)
        }
      }
    },
    methods: {
      //  服务类别
      categoryInfo(page) {
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
          this.categorys = data.items
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
      //  上传
      uploadFile(ele) {
        upload(ele.target, '')
      },
      reset() {
        for(let name in this.$data.form) {
          this.$data.form[name] = ''
        }
        this.$data.id = ''
      },
      addOpen() {
        this.reset()
        this.addShow = true
      },
      cancel() {
        this.addShow = false
      },
      ensure() {
        this.form.zip_url = $("#hiddens").val()
        if (this.id === '') {
          //  新增
          if (this.form.name === '' || this.form.price === '' || this.form.category_id === '') {
            this.$message.error('必填字段不能为空！')
          } else {
            axios.post('/admin/api/v1/service_items', this.form)
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
          //  修改
          if (this.form.name === '' || this.form.price === '' || this.form.category_id === '') {
            this.$message.error('必填字段不能为空！')
          } else {
            axios.post('/admin/api/v1/service_items/' + this.id, this.form)
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
      search(page) {
        this.query.page = page
        this.$store.dispatch('increment', {
          path: '/admin/api/v1/service_items',
          parameter: {
            page: this.query.page,
            name: this.query.name,
            category_id: this.query.category_id
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
          this.loading = false
          this.total = data.total
          for (let i in data.items) {
            if (data.items[i].zip_url === null || data.items[i].zip_url === '') {
                data.items[i].zip_url = '#'
            } else {
              axios.get('/main/api/v1/files/' + data.items[i].zip_url)
                .then((result) => {
                  if (result.data == '') {
                    data.items[i].zip_url = '#'
                  } else {
                    data.items[i].zip_url = result.data
                  }
                })
            }
          }
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
        axios.get('/admin/api/v1/service_items/' + id)
          .then((result) => {
            const data = result.data.result
            this.form = data
          })
          .catch((err) => {
            this.$message.error(err.message)
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
