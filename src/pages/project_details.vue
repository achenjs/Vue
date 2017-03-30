<template lang="html">
  <div class="project_details">
    <el-col :span="24">
      <el-form :label-position="right" label-width="120px">
        <el-form-item label="项目名称">
          <el-input placeholder="项目名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input placeholder="负责人" v-model="form.contact_name"></el-input>
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
        <el-form-item label="有利条件">
          <el-input type="textarea" v-model="form.advantage" placeholder="有利条件" :maxlength="100" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="form.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="邮箱" v-model="form.contact_email"></el-input>
        </el-form-item>
        <el-form-item label="所在阶段">
          <el-input placeholder="所在阶段" v-model="form.phase_index"></el-input>
        </el-form-item>
        <!-- <el-form-item label="完成时间">
          <el-date-picker
            format="yyyy-MM-dd"
            v-model="form.gmt_modified"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="附件">
          <el-input placeholder="附件" v-model="form.bp_url" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核">
          <el-select v-model="form.status">
            <el-option
            v-for="key in examines"
            :label="key.label"
            :value="key.value"
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
        contact_name: '',
        industry: '',
        contact_phone: '',
        phase_index: '',
        status: '',
        description: '',
        contact_email: '',
        bp_url: '',
        gmt_modified: '',
        advantage: ''
      }
    }
  },
  created() {
    var _this = this
    //  所属行业
    $.ajax({
      url: '/main/api/v1/industries',
      success: function(result) {
        var data = result.result
        _this.industries = data.industries
      },
      error: function(err) {
        if (err.status == '401') {
          _this.$message.error(JSON.parse(err.responseText).message)
          _this.$router.push('/admin/signin')
        }
      }
    })
    this.ProjectDetailsId = localStorage.getItem('ProjectDetailsId')
    this.projects()
  },
  methods: {
    //  详情
    projects() {
      var _this = this
      $.ajax({
        url: '/admin/api/v1/projects/' + this.ProjectDetailsId,
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
    //  修改
    ensure() {
      var _this = this
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
      for (var i in this.industries) {
        if (industry == this.industries[i]) {
          this.form.industry = i
        }
      }
      $.ajax({
        url: '/admin/api/v1/projects/' + this.ProjectDetailsId,
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(this.form),
        success: function(result) {
          _this.$message({
            message: result.message,
            type: 'success'
          })
          _this.$router.push('/admin/project_list')
        },
        error: function(err) {
          if (err.status == '401') {
            _this.$message.error(JSON.parse(err.responseText).message)
            _this.$router.push('/admin/signin')
          }
        }
      })
    },
    cancel() {
      this.$router.push('/admin/project_list')
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
