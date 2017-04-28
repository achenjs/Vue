<template lang="html">
  <div class="Cooperation">
    <el-col :span="4" class="add_item">
      <span @click="addOpen">新建项目</span>
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
          prop="status"
          label="项目状态"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="100"
          label="立项名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="150"
          label="合作方单位名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="100"
          label="我方牵头人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="130"
          label="合作方联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="90"
          label="合作有效期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="合作文档"
          width="70">
          <template scope="scope">
            <span v-if="scope.row.url == '#'"></span>
            <a v-else :href="scope.row.url">下载</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          width="60"
          label="报道数"
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
            <span>请选择项目状态</span>
          </div>
          <div class="modal-content">
            <label for=""><i>*</i>项目状态</label>
            <el-input placeholder="交付物名称" v-model="form.name"></el-input>
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

export default {
  data () {
    return {
      form: {
        status: '',
        description: ''
      },
      tableData: [],
      addShow: false,
      loading: false,
      total: 1
    }
  },
  created () {
    this.query(1)
  },
  methods: {
    //  清空
    reset () {
      for (let i in this.form) {
        this.form[i] = ''
      }
    },
    //  编辑
    midClick (id) {

    },
    //  保存
    ensure () {

    },
    //  退出
    cancel () {
      this.reset()
      this.addShow = false
    },
    //  列表
    query (page) {

    },
    //  新建项目
    addOpen () {

    }
  },
  components: {
    'v-pages': pages
  }
}
</script>

<style lang="scss">
@import "../assets/css/modal.scss";
.Cooperation {
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
