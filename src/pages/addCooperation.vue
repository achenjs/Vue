<template lang="html">
  <div class="addCooperation">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="立项名称">
        <el-input v-model="form.name" placeholder="请输入立项名称"></el-input>
      </el-form-item>
      <el-form-item label="合作单位名称">
        <el-input v-model="form.partner_name" placeholder="请输入合作单位名称"></el-input>
      </el-form-item>
      <el-form-item label="合作单位性质">
        <el-select v-model="form.partner_type" placeholder="请选择">
          <el-option
          v-for="(key, index) in partners"
          :label="key"
          :value="index"
          :key="key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作方所在地区">
        <el-select placeholder="请选择国家" v-model="country">
          <el-option
          v-for="item in countrys"
          :label="item.name"
          :value="item.value"
          :key="item.value">
          </el-option>
        </el-select>
        <el-select placeholder="请选择省份" @change="city(region_name)" v-model="region_name">
          <el-option
          v-for="item in regions"
          :label="item.name"
          :value="item.area_id"
          :key="item.area_id">
          </el-option>
        </el-select>
        <el-select placeholder="请选择城市" @change="area(city_name)" v-model="city_name">
          <el-option
          v-for="item in citys"
          :label="item.name"
          :value="item.area_id"
          :key="item.area_id">
          </el-option>
        </el-select>
        <el-select placeholder="请选择区(县)" v-model="form.city">
          <el-option
          v-for="item in areas"
          :label="item.name"
          :value="item.area_id"
          :key="item.area_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作方联系人">
        <el-col v-for="item in form.contacts">
          <el-input v-model="item.name" placeholder="请输入姓名"></el-input>
          <el-input v-model="item.job" placeholder="请输入职位"></el-input>
          <el-input v-model="item.cell_number" placeholder="请输入联系方式"></el-input>
          <span>+</span>
          <span>X</span>
        </el-col>
      </el-form-item>
      <el-form-item label="我方牵头人">
        <el-input v-model="form.organizer" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="我方协同人">
        <el-input v-model="form.assistant" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="项目授权">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          <span>更多</span>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="合作有效期">
        <el-col :span="6">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.contract_start" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="6">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.contract_end" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="合作文档">
        <el-col v-for="item in form.documents">
          <el-input v-model="item.name" placeholder="请输入文档名称"></el-input>
          <el-select placeholder="请选择来源" @change="area(city_name)" v-model="item.cursor">
            <el-option
            v-for="item in citys"
            :label="item.name"
            :value="item.area_id"
            :key="item.area_id">
            </el-option>
          </el-select>
          <el-input v-model="item.version" placeholder="请输入文档版本"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="相关图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="相关报道">
        <el-col v-for="item in form.reports">
          <el-input v-model="item.title" placeholder="请输入标题"></el-input>
          <el-input v-model="item.source" placeholder="请输入平台名称"></el-input>
          <el-input v-model="item.link" placeholder="请输入相关链接"></el-input>
          <span>+</span>
          <span>X</span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
      	'name': '',
      	'partner_name': '',
      	'partner_type': '',
      	'region': '',
      	'organizer': '',
      	'assistant': '',
      	'contract_start': '',
      	'contract_end': '',
      	'reports': [
      		{
      			"title": '',
      			"source": '',
      			"link": ''
      		},
      		{
      			'title': '',
      			'source': '',
      			'link': ''
      		}
      	],
      	'authorizers': [
      		{
      			'filename': '',
      			'hash_name': ''
      		},
      		{
      			'filename': '',
      			'hash_name': ''
      		},
      	],
      	'contacts': [
      		{
      			'name': '',
      			'job': '',
      			'cell_number': ''
      		},
      		{
      			'name': '',
      			'job': '',
      			'cell_number': ''
      		}
      	],
      	'documents': [
      		{
      			'name': '',
      			'source': '',
      			'version': '',
      			'filename': '',
      			'hash_name': ''
      		},
      		{
      			'name': '',
      			'source': '',
      			'version': '',
      			'filename': '',
      			'hash_name': ''
      		}
      	],
      	'images': [
      		{
      			'filename': '',
      			'hash_name': ''
      		},
      		{
      			'filename': '',
      			'hash_name': ''
      		}
      	]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      countrys: [
        {name: '中国', value: 'china'}
      ],
      country: '',
      regions: '',
      region_name: '',
      citys: '',
      city_name: '',
      city_id: '',
      areas: '',
      partners: [], //  单位性质
    }
  },
  created () {
    this.region()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //  获取省级
    region() {
      axios.get('/main/api/v1/region?page=1')
        .then((result) => {
          const data = result.data.result
          this.regions = data
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    //  获取市级
    city(id) {
      axios.get('/main/api/v1/region/' + id +'?page=1')
        .then((result) => {
          const data = result.data.result
          this.citys = data
          this.city_name = data[0].area_id
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    // 获取区
    area(id) {
      axios.get('/main/api/v1/region/' + id +'?page=1')
        .then((result) => {
          const data = result.data.result
          this.areas = data
          this.form.city = data[0].area_id
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin-right: 15px;
}
.el-checkbox+.el-checkbox {
  margin-left: 0;
}
</style>
