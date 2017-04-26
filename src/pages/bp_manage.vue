<template lang="html">
  <div class="bp_manage">
    <a href="javascript:;" class="file">上传BP
      <input type="file" name="" id="upLog" @change="uploadFile($event)">
    </a>
    <div class="">
      <input type="text" id="filename" value="" disabled>
    </div>
    <input type="hidden" id="hiddens" v-model="form.bp_url">
    <div class="xs"></div>
    <el-tabs type="border-card" style="margin-top: 30px;">
      <el-tab-pane label="项目／企业信息">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item required label="项目名称">
                <el-input placeholder="请输入项目名称" v-model="form.project_name"></el-input>
              </el-form-item>
              <el-form-item label="公司名称">
                <el-input placeholder="请输入公司名称" v-model="form.company_name"></el-input>
              </el-form-item>
              <el-form-item label="预期融资额(万元)">
                <el-input placeholder="请输入预期融资额(万元)" v-model="form.financing_sum"></el-input>
              </el-form-item>
              <el-form-item label="预期估值(万元)">
                <el-input placeholder="请输入预期估值(万元)" v-model="form.valuation"></el-input>
              </el-form-item>
              <el-form-item label="当前融资情况">
                <el-input type="textarea" :rows="3" placeholder="请输入当前融资情况" v-model="form.current_financing_status"></el-input>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input placeholder="请输入联系人" v-model="form.contact"></el-input>
              </el-form-item>
              <el-form-item label="联系人职位">
                <el-input placeholder="请输入联系人职位" v-model="form.contact_title"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input placeholder="请输入联系电话" v-model="form.contact_phone"></el-input>
              </el-form-item>
              <el-form-item label="员工人数">
                <el-input placeholder="请输入员工人数" v-model="form.employees"></el-input>
              </el-form-item>
              <el-form-item label="成立时间">
                <el-date-picker
                  :editable="false"
                  v-model="form.start_from"
                  type="date"
                  placeholder="请输入成立时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="所在地区">
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
              <el-form-item label="关联投资者">
                <el-input placeholder="请输入关联投资者" v-model="form.investors"></el-input>
              </el-form-item>
              <el-form-item label="关联机构">
                <el-input placeholder="请输入关联机构" v-model="form.organization"></el-input>
              </el-form-item>
              <el-form-item label="项目来源">
                <el-input placeholder="请输入项目来源" v-model="form.source"></el-input>
              </el-form-item>
              <el-form-item required label="所属行业">
                <el-select placeholder="请选择" v-model="form.industry">
                  <el-option
                  v-for="(key, index) in industries"
                  :label="key"
                  :value="index"
                  :key="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关键词">
                <el-input placeholder="请输入关键词" v-model="form.tags"></el-input>
              </el-form-item>
              <el-form-item label="一句话介绍">
                <el-input placeholder="请输入一句话介绍" v-model="form.description"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" autosize v-model="form.comment" placeholder="请输入备注" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="团队分析">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item label="全职/兼职情况">
                <el-input placeholder="请输入全职/兼职情况" v-model="form.full_time"></el-input>
              </el-form-item>
              <el-form-item label="CEO">
                <el-input placeholder="请输入CEO" v-model="form.ceo"></el-input>
              </el-form-item>
              <el-form-item label="技术负责人">
                <el-input placeholder="请输入技术负责人" v-model="form.cto"></el-input>
              </el-form-item>
              <el-form-item label="市场负责人">
                <el-input placeholder="请输入市场负责人" v-model="form.cmo"></el-input>
              </el-form-item>
              <el-form-item label="行业资源">
                <el-input placeholder="请输入行业资源" v-model="form.industry_resource"></el-input>
              </el-form-item>
              <el-form-item label="目前股权结构">
                <el-input placeholder="请输入目前股权结构" v-model="form.stock_structure"></el-input>
              </el-form-item>
              <el-form-item label="团队描述及组成">
                <el-input type="textarea" autosize v-model="form.team_desc" placeholder="请输入团队描述及组成" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="市场分析">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item label="市场占有估算">
                <el-input placeholder="请输入市场占有估算" v-model="form.market_rate"></el-input>
              </el-form-item>
              <el-form-item label="市场容量">
                <el-input placeholder="请输入市场容量" v-model="form.market_capacity"></el-input>
              </el-form-item>
              <el-form-item label="市场增量">
                <el-input placeholder="请输入市场增量" v-model="form.market_proficiency"></el-input>
              </el-form-item>
              <el-form-item label="竞争对手分析">
                <el-input type="textarea" autosize v-model="form.rival" placeholder="请输入竞争对手分析" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="痛点及需求描述">
                <el-input type="textarea" autosize v-model="form.pain_point" placeholder="请输入痛点及需求描述" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="我们的资源匹配情况">
                <el-input type="textarea" autosize v-model="form.our_resource" placeholder="请输入我们的资源匹配情况" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="投资亮点/关键技术">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item label="产品形态">
                <el-input placeholder="请输入产品形态" v-model="form.product_status"></el-input>
              </el-form-item>
              <el-form-item label="主要营收来源">
                <el-input placeholder="请输入主要营收来源" v-model="form.main_income"></el-input>
              </el-form-item>
              <el-form-item label="营收状况">
                <el-input placeholder="请输入营收状况" v-model="form.income_status"></el-input>
              </el-form-item>
              <el-form-item label="目标客户">
                <el-input placeholder="请输入目标客户" v-model="form.dest_customers"></el-input>
              </el-form-item>
              <el-form-item label="获取用户方式">
                <el-input placeholder="请输入获取用户方式" v-model="form.customers_resource"></el-input>
              </el-form-item>
              <el-form-item label="核心技术">
                <el-input placeholder="请输入核心技术" v-model="form.core_tech"></el-input>
              </el-form-item>
              <el-form-item label="技术评估">
                <el-input placeholder="请输入技术评估" v-model="form.tech_evaluation"></el-input>
              </el-form-item>
              <el-form-item label="核心资源">
                <el-input placeholder="请输入核心资源" v-model="form.core_resource"></el-input>
              </el-form-item>
              <el-form-item label="近期业务规划">
                <el-input placeholder="请输入近期业务规划" v-model="form.recent_plan"></el-input>
              </el-form-item>
              <el-form-item label="中期业务规划">
                <el-input placeholder="请输入中期业务规划" v-model="form.future_plan"></el-input>
              </el-form-item>
              <el-form-item label="未来定位">
                <el-input placeholder="请输入未来定位" v-model="form.future_aim"></el-input>
              </el-form-item>
              <el-form-item label="商业模式描述">
                <el-input type="textarea" autosize v-model="form.business_mode" placeholder="请输入商业模式描述" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="融资/需求方案">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item label="需求描述">
                <el-input placeholder="请输入需求描述" v-model="form.needs_desc"></el-input>
              </el-form-item>
              <el-form-item label="需求依据">
                <el-input placeholder="请输入需求依据" v-model="form.needs_support"></el-input>
              </el-form-item>
              <el-form-item label="融资计划">
                <el-input placeholder="请输入融资计划" v-model="form.financing_plan"></el-input>
              </el-form-item>
              <el-form-item label="财务预期营收">
                <el-input placeholder="请输入财务预期营收" v-model="form.potential_income"></el-input>
              </el-form-item>
              <el-form-item label="风险及应对策略">
                <el-input type="textarea" v-model="form.risk" placeholder="请输入风险及应对策略" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="风险分析">
                <el-input type="textarea" v-model="form.risk_detail" placeholder="请输入风险分析" :maxlength="100" :rows="3"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目打分(10分制,无小数点)">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item label="需求评分">
                <el-input-number :min="0" :max="10" v-model="form.score_needs"></el-input-number>
              </el-form-item>
              <el-form-item label="行业评分">
                <el-input-number :min="0" :max="10" v-model="form.score_industry"></el-input-number>
              </el-form-item>
              <el-form-item label="产品评分">
                <el-input-number :min="0" :max="10" v-model="form.score_product"></el-input-number>
              </el-form-item>
              <el-form-item label="团队评分">
                <el-input-number :min="0" :max="10" v-model="form.score_team"></el-input-number>
              </el-form-item>
              <el-form-item label="资源评分">
                <el-input-number :min="0" :max="10" v-model="form.score_resource"></el-input-number>
              </el-form-item>
              <el-form-item label="商业模式评分">
                <el-input-number :min="0" :max="10" v-model="form.score_mode"></el-input-number>
              </el-form-item>
              <el-form-item label="估值评分">
                <el-input-number :min="0" :max="10" v-model="form.score_evaluation"></el-input-number>
              </el-form-item>
              <el-form-item label="风险评分">
                <el-input-number :min="0" :max="10" v-model="form.score_risk"></el-input-number>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-col :span="8" :offset="8" style="text-align: center; margin-top: 20px;">
      <el-button type="primary" size="large" @click="submitBP">提交</el-button>
    </el-col>
  </div>
</template>

<script>
import axios from 'axios'
import upload from '../assets/js/upload'
  export default {
    data() {
      return {
        region_name: '',
        city_name: '',
        area_name: '',
        right: 'right',
        fileList: [],
        countrys: [
          {name: '中国', value: 'china'}
        ],
        country: 'china',
        form: {
          "bp_url": "",
          "business_mode": "",
          "ceo": "",
          "city": "",
          "cmo": "",
          "comment": "",
          "company_name": "",
          "contact": "",
          "contact_phone": "",
          "contact_title": "",
          "core_resource": "",
          "current_financing_status": "",
          "core_tech": "",
          "cto": "",
          "customers_resource": "",
          "description": "",
          "dest_customers": "",
          "employees": "",
          "financing_plan": "",
          "financing_sum": 0,
          "full_time": "",
          "future_aim": "",
          "future_plan": "",
          "income_status": "",
          "industry": "",
          "industry_resource": "",
          "investors": "",
          "main_income": "",
          "market_capacity": "",
          "market_proficiency": "",
          "market_rate": "",
          "needs_desc": "",
          "needs_support": "",
          "organization": "",
          "our_resource": "",
          "pain_point": "",
          "potential_income": "",
          "product_status": "",
          "project_name": "",
          "recent_plan": "",
          "risk": "",
          "risk_detail": "",
          "rival": "",
          "score_evaluation": "",
          "score_industry": "",
          "score_mode": "",
          "score_needs": "",
          "score_product": "",
          "score_resource": "",
          "score_risk": "",
          "score_team": "",
          "source": "",
          "start_from": "",
          "stock_structure": "",
          "tags": "",
          "team_desc": "",
          "tech_evaluation": "",
          "timestamp": "",
          "valuation": 0
        },
        fileData: {},
        regions: [],
        citys: [],
        areas: [],
        industries: {}
      }
    },
    created() {
      this.industr()
      this.region()
    },
    methods: {
      // 获取全部行业
      industr() {
        axios.get('/main/api/v1/industries')
          .then((result) => {
            const data = result.data.result
            Object.assign(this.industries, data.industries)
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
      },
      //  上传
      uploadFile(ele) {
        upload(ele.target, '')
      },
      //  创建BP
      submitBP() {
        this.form.bp_url = $("#hiddens").val()
        var financing_sum = this.form.financing_sum
        var valuation = this.form.valuation
        if (this.form.start_from === '') {
          this.form.start_from = ''
        } else {
          this.form.start_from = Date.parse(new Date(this.form.start_from))
        }
        if (!(/^[0-9]*$/.test(this.form.employees))) {
          this.$message.error('请输入正确的员工人数')
          return false
        }
        if (parseFloat(financing_sum) || parseFloat(financing_sum) === 0) {
          this.form.financing_sum = parseFloat(financing_sum)
        } else {
          this.$message.error('输入的预期融资额格式不对，应该为数字！')
          return false
        }
        if (parseFloat(valuation) || parseFloat(valuation) === 0) {
          this.form.valuation = parseFloat(valuation)
        } else {
          this.$message.error('输入的预期融资额格式不对，应该为数字！')
          return false
        }
        if (this.form.project_name === '') {
          this.$message.error('请输入正确的项目名称!')
          return false
        }
        if (this.form.industry === '') {
          this.$message.error('请输入正确的所属行业!')
          return false
        }
        axios.post('/admin/api/v1/bps', this.form)
          .then((result) => {
            this.$message({
              message: result.data.message,
              type: 'success'
            })
            this.$router.push('/bp_list')
          })
          .catch((err) => {
            this.$message.error(err.message)
          })
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
