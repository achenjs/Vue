<template lang="html">
  <div class="project_details">
    <el-col :span="24">
      <el-form :label-position="right" label-width="120px">
        <el-form-item label="项目名称">
          <el-input placeholder="项目名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属行业">
          <el-select v-model="form.industry" placeholder="请选择">
            <el-option
            v-for="(key, index) in industries"
            :label="key"
            :value="index"
            :key="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="form.description" placeholder="项目描述" :maxlength="100" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit">
        <el-button type="primary" @click="ensure">确认</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      industries: {},
      examines: [
        {
          value: 'Accepted',
          label: '已通过'
        },
        {
          value: 'Rejected',
          label: '已驳回'
        },
        {
          value: 'Submitting',
          label: '待提交'
        },
        {
          value: 'Submitted',
          label: '已提交'
        },
      ],
      right: 'right',
      ProjectDetailsId: '',
      form: {
        name: '',
        industry: '',
        description: '',
      }
    }
  },
  created() {
    this.industrs()
    this.ProjectDetailsId = this.$route.params.id
    this.projects()
  },
  methods: {
    //  所属行业
    industrs() {
      axios.get('/main/api/v1/industries')
        .then((result) => {
          const data = result.data.result
          this.industries = data.industries
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    //  详情
    projects() {
      axios.get('/admin/api/v1/projects/' + this.ProjectDetailsId)
        .then((result) => {
          const data = result.data.result
          this.form = data
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    //  修改
    ensure() {
      if (this.form.gmt_modified === '') {
        this.form.gmt_modified = ''
      } else {
        this.form.gmt_modified = Date.parse(new Date(this.form.gmt_modified))
      }
      var status = this.form.status
      switch (status) {
        case '待提交':
          this.form.status = 'Submitting'
          break;
        case '已提交':
          this.form.status = 'Submitted'
          break;
        case '已驳回':
          this.form.status = 'Rejected'
          break;
        case '已通过':
          this.form.status = 'Accepted'
          break;
      }
      var industry = this.form.industry
      for (let i in this.industries) {
        if (industry == this.industries[i]) {
          this.form.industry = i
        }
      }
      axios.post('/admin/api/v1/projects/' + this.ProjectDetailsId, this.form)
        .then((result) => {
          this.$message({
            message: result.data.message,
            type: 'success'
          })
          this.$router.push('/project_list')
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    cancel() {
      this.$router.push('/project_list')
    }
  }
}
</script>

<style lang="scss">
.project_details {
  .submit {
    text-align: center;
  }
}
</style>
