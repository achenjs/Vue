<template>
   <div class="permissions">
      <el-col :span="4" class="add_item">
        <span @click="addOpen">创建权限</span>
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
            width="50"
            show-overflow-tooltip
            label="编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            width="150"
            show-overflow-tooltip
            label="权限名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            show-overflow-tooltip
            label="权限描述">
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            show-overflow-tooltip
            width="60"
            label="状态">
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
              <span>创建权限</span>
            </div>
            <div class="modal-content">
              <label for="">权限名称</label>
              <el-input placeholder="权限名称" v-model="form.name"></el-input>
              <label for="">权限描述</label>
              <el-input placeholder="权限描述" v-model="form.description"></el-input>
              <label for="">状态</label>
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                v-for="item in jurisdictions"
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
      <v-pages :total="total" v-on:currentChange="query"></v-pages>
   </div>
</template>

<script>
import pages from '../components/pages/pages.vue'
export default {
    data() {
      return {
        tableData: [],
        addShow: false,
        jurisdictions: [{
          value: true,
          label: '启用',
        }, {
          value: false,
          label: '禁用',
        }],
        form: {
          name: '',
          description: '',
          status: true
        },
        loading: false,
        page: '',
        id: '',
        total: 1,
      }
    },
    created() {
      this.query(1)
    },
    methods: {
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
          $.ajax({
            url: '/admin/api/v1/permissions',
            type: 'post',
            contentType:'application/json',
            data: JSON.stringify(this.form),
            success: function(result) {
              _this.$message({
                message: '创建成功!',
                type: 'success'
              })
              _this.addShow = false
            },
            error: function(err) {
              if (err.status == '401') {
                _this.$message.error(JSON.parse(err.responseText).message)
                _this.$router.push('/admin/signin')
              }
            }
          })
        } else {
          $.ajax({
            url: '/admin/api/v1/permissions/' + this.id,
            type: 'post',
            contentType:'application/json',
            data: JSON.stringify(this.form),
            success: function(result) {
              _this.$message({
                message: '创建成功!',
                type: 'success'
              })
              _this.query(_this.page)
              _this.addShow = false
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
      //  查询列表
      query(page) {
        var _this = this
        this.page = page
        //  获取所有权限
        $.ajax({
          url: '/admin/api/v1/permissions?page=' + page,
          beforeSend: function() {
            _this.loading = true
          },
          timeout: 5000,
          success: function(result) {
            _this.loading = false
            var data = result.result
            _this.total = data.total
            for(var i=0; i<data.items.length; i++) {
              if (data.items[i].status == true) {
                data.items[i].status = 'true'
              } else {
                data.items[i].status = 'false'
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
          url: '/admin/api/v1/permissions/' + id,
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
    components: {
      'v-pages': pages
    }
  }
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.permissions {
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
