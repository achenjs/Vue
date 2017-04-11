<template lang="html">
  <div class="bp_manage">
    <a href="javascript:;" class="file">上传BP
      <input type="file" name="" id="upLog" @change="uploadFile($event)">
    </a>
    <input type="hidden" id="hiddens" v-model="form.bp_url">
    <div class="xs"></div>
    <el-tabs type="border-card" style="margin-top: 30px;">
      <el-tab-pane label="项目／企业信息">
        <div class="Modular">
          <el-col :span="24">
            <el-form :label-position="right" label-width="120px">
              <el-form-item label="项目名称">
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
              <el-form-item label="联系人">
                <el-input placeholder="请输入联系人" v-model="form.contact"></el-input>
              </el-form-item>
              <el-form-item label="联系人职位">
                <el-input placeholder="请输入联系人职位" v-model="form.contact_title"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input placeholder="请输入联系方式" v-model="form.contact_phone"></el-input>
              </el-form-item>
              <el-form-item label="员工人数">
                <el-input placeholder="请输入员工人数" v-model="form.employees"></el-input>
              </el-form-item>
              <el-form-item label="成立时间">
                <el-date-picker
                  v-model="form.start_from"
                  type="date"
                  placeholder="请输入成立时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="所属城市">
                <el-select placeholder="请输入请选择省份" @change="city(region_name)" v-model="region_name">
                  <el-option
                  v-for="item in regions"
                  :label="item.name"
                  :value="item.area_id"
                  :key="item.area_id">
                  </el-option>
                </el-select>
                <el-select placeholder="请输入请选择城市" v-model="form.city">
                  <el-option
                  v-for="item in citys"
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
              <el-form-item label="所属行业">
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
              <el-form-item label="需求">
                <el-input placeholder="请输入需求" v-model="form.score_needs"></el-input>
              </el-form-item>
              <el-form-item label="行业">
                <el-input placeholder="请输入行业" v-model="form.score_industry"></el-input>
              </el-form-item>
              <el-form-item label="产品">
                <el-input placeholder="请输入产品" v-model="form.score_product"></el-input>
              </el-form-item>
              <el-form-item label="团队">
                <el-input placeholder="请输入团队" v-model="form.score_team"></el-input>
              </el-form-item>
              <el-form-item label="资源">
                <el-input placeholder="请输入资源" v-model="form.score_resource"></el-input>
              </el-form-item>
              <el-form-item label="商业模式">
                <el-input placeholder="请输入商业模式" v-model="form.score_mode"></el-input>
              </el-form-item>
              <el-form-item label="估值">
                <el-input placeholder="请输入估值" v-model="form.score_evaluation"></el-input>
              </el-form-item>
              <el-form-item label="风险">
                <el-input placeholder="请输入风险" v-model="form.score_risk"></el-input>
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
import upload from '../assets/js/upload'
  export default {
    data() {
      return {
        region_name: '',
        right: 'right',
        fileList: [],
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
          "core_tech": "",
          "cto": "",
          "customers_resource": "",
          "description": "",
          "dest_customers": "",
          "employees": "",
          "financing_plan": "",
          "financing_sum": "",
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
          "valuation": ""
        },
        fileData: {},
        regions: [],
        citys: [],
        industries: {
          '': '全部行业'
        }
      }
    },
    created() {
      this.industr()
      this.region()
    },
    methods: {
      // 获取全部行业
      industr() {
        var _this = this
        $.ajax({
          url: '/main/api/v1/industries',
          success: function(result) {
            var data = result.result
            Object.assign(_this.industries, data.industries)
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/signin')
            }
          }
        })
      },
      //  上传
      uploadFile(ele) {
        upload(ele.target)
      },
      //  创建BP
      submitBP() {
        var _this = this
        this.form.bp_url = $("#hiddens").val()
        if (this.form.start_from === '') {
          this.form.start_from = ''
        } else {
          this.form.start_from = Date.parse(new Date(this.form.start_from))
        }
        $.ajax({
          url: '/admin/api/v1/bps',
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(this.form),
          success: function(result) {
            _this.$message({
              message: result.message,
              type: 'success'
            })
            _this.$router.push('/bp_list')
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/signin')
            }
          }
        })
      },
      //  获取省级
      region() {
        var _this = this
        $.ajax({
          url: '/main/api/v1/region?page=1',
          success: function(result) {
            var data = result.result
            _this.regions = data
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/signin')
            }
          }
        })
      },
      //  获取市级
      city(id) {
        var _this = this
        $.ajax({
          url: '/main/api/v1/region/' + id +'?page=1',
          success: function(result) {
            var data = result.result
            _this.citys = data
            _this.form.city = data[0].area_id
          },
          error: function(err) {
            if (err.status == '401') {
              _this.$message.error(JSON.parse(err.responseText).message)
              _this.$router.push('/signin')
            }
          }
        })
      }
    }
  }
</script>
