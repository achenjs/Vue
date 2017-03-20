<template lang="html">
<div class="bp_manage">
    <el-upload
    class="upload-demo"
    ref="upload"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <el-tabs type="border-card">
    <el-tab-pane label="团队信息">
      <div class="Modular">
        <el-col :span="24">
          <el-form :label-position="right" label-width="120px">
            <el-form-item label="项目名称">
              <el-input placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-input placeholder="公司名称" v-model="form.company_name"></el-input>
            </el-form-item>
            <el-form-item label="预期融资额(万元)">
              <el-input placeholder="预期融资额(万元)"></el-input>
            </el-form-item>
            <el-form-item label="预期估值(万元)">
              <el-input placeholder="预期估值(万元)"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系人职位">
              <el-input placeholder="联系人职位"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input placeholder="联系方式"></el-input>
            </el-form-item>
            <el-form-item label="员工人数">
              <el-input placeholder="员工人数"></el-input>
            </el-form-item>
            <el-form-item label="成立时间">
              <el-input placeholder="成立时间"></el-input>
            </el-form-item>
            <el-form-item label="所属城市">
              <el-input placeholder="所属城市" v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="关联投资者">
              <el-input placeholder="关联投资者"></el-input>
            </el-form-item>
            <el-form-item label="关联机构">
              <el-input placeholder="关联机构"></el-input>
            </el-form-item>
            <el-form-item label="项目来源">
              <el-input placeholder="项目来源"></el-input>
            </el-form-item>
            <el-form-item label="所属行业">
              <el-input placeholder="所属行业"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input placeholder="关键词"></el-input>
            </el-form-item>
            <el-form-item label="一句话介绍">
              <el-input placeholder="一句话介绍"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" placeholder="备注" :maxlength="100" :rows="3"></el-input>
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
              <el-input placeholder="全职/兼职情况"></el-input>
            </el-form-item>
            <el-form-item label="CEO">
              <el-input placeholder="CEO" v-model="form.ceo"></el-input>
            </el-form-item>
            <el-form-item label="技术负责人">
              <el-input placeholder="技术负责人"></el-input>
            </el-form-item>
            <el-form-item label="市场负责人">
              <el-input placeholder="市场负责人"></el-input>
            </el-form-item>
            <el-form-item label="行业资源">
              <el-input placeholder="行业资源"></el-input>
            </el-form-item>
            <el-form-item label="目前股权结构">
              <el-input placeholder="目前股权结构"></el-input>
            </el-form-item>
            <el-form-item label="团队描述及组成">
              <el-input type="textarea" placeholder="团队描述及组成" :maxlength="100" :rows="3"></el-input>
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
              <el-input placeholder="市场占有估算"></el-input>
            </el-form-item>
            <el-form-item label="市场容量">
              <el-input placeholder="市场容量"></el-input>
            </el-form-item>
            <el-form-item label="市场增量">
              <el-input placeholder="市场增量"></el-input>
            </el-form-item>
            <el-form-item label="竞争对手分析">
              <el-input type="textarea" placeholder="竞争对手分析" :maxlength="100" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="痛点及需求描述">
              <el-input type="textarea" placeholder="痛点及需求描述" :maxlength="100" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="我们的资源匹配情况">
              <el-input type="textarea" placeholder="我们的资源匹配情况" :maxlength="100" :rows="3"></el-input>
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
              <el-input placeholder="产品形态"></el-input>
            </el-form-item>
            <el-form-item label="主要营收来源">
              <el-input placeholder="主要营收来源"></el-input>
            </el-form-item>
            <el-form-item label="营收状况">
              <el-input placeholder="营收状况"></el-input>
            </el-form-item>
            <el-form-item label="目标客户">
              <el-input placeholder="目标客户"></el-input>
            </el-form-item>
            <el-form-item label="获取用户方式">
              <el-input placeholder="获取用户方式"></el-input>
            </el-form-item>
            <el-form-item label="核心技术">
              <el-input placeholder="核心技术" v-model="form.tech"></el-input>
            </el-form-item>
            <el-form-item label="技术评估">
              <el-input placeholder="技术评估"></el-input>
            </el-form-item>
            <el-form-item label="核心资源">
              <el-input placeholder="核心资源" v-model="form.core_resource"></el-input>
            </el-form-item>
            <el-form-item label="近期业务规划">
              <el-input placeholder="近期业务规划"></el-input>
            </el-form-item>
            <el-form-item label="中期业务规划">
              <el-input placeholder="中期业务规划"></el-input>
            </el-form-item>
            <el-form-item label="未来定位">
              <el-input placeholder="未来定位"></el-input>
            </el-form-item>
            <el-form-item label="商业模式描述">
              <el-input type="textarea" placeholder="商业模式描述" :maxlength="100" :rows="3"></el-input>
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
              <el-input placeholder="需求描述"></el-input>
            </el-form-item>
            <el-form-item label="需求依据">
              <el-input placeholder="需求依据"></el-input>
            </el-form-item>
            <el-form-item label="融资计划">
              <el-input placeholder="融资计划"></el-input>
            </el-form-item>
            <el-form-item label="目标客户">
              <el-input placeholder="目标客户"></el-input>
            </el-form-item>
            <el-form-item label="财务预期营收">
              <el-input placeholder="财务预期营收"></el-input>
            </el-form-item>
            <el-form-item label="风险及应对策略">
              <el-input type="textarea" placeholder="风险及应对策略" :maxlength="100" :rows="3"></el-input>
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
              <el-input placeholder="需求"></el-input>
            </el-form-item>
            <el-form-item label="行业">
              <el-input placeholder="行业"></el-input>
            </el-form-item>
            <el-form-item label="产品">
              <el-input placeholder="产品"></el-input>
            </el-form-item>
            <el-form-item label="团队">
              <el-input placeholder="团队"></el-input>
            </el-form-item>
            <el-form-item label="资源">
              <el-input placeholder="资源"></el-input>
            </el-form-item>
            <el-form-item label="商业模式">
              <el-input placeholder="商业模式"></el-input>
            </el-form-item>
            <el-form-item label="估值">
              <el-input placeholder="估值"></el-input>
            </el-form-item>
            <el-form-item label="风险">
              <el-input placeholder="风险"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-col :span="8" :offset="8" style="text-align: center; margin-top: 20px;">
    <el-button type="primary" size="large">提交</el-button>
  </el-col>
</div>
</template>

<script>
  export default {
    data() {
      return {
        right: 'right',
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        form: {
          "bp_url": 0,
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
          "financing_sum": 0,
          "full_time": "",
          "future_aim": "",
          "future_plan": "",
          "income_status": "",
          "industry": "",
          "industry_resource": "",
          "investors": 0,
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
          "score_evaluation": 0,
          "score_industry": 0,
          "score_mode": 0,
          "score_needs": 0,
          "score_product": 0,
          "score_resource": 0,
          "score_risk": 0,
          "score_team": 0,
          "source": "",
          "start_from": "",
          "stock_structure": "",
          "tags": "",
          "team_desc": "",
          "tech_evaluation": "",
          "timestamp": "",
          "valuation": 0
        }
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style lang="scss">
.bp_manage {
  .Modular {
    .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #efefef;
      text-align: center;
      font-size: 20px;
      clear: both;
      margin-bottom: 5px;
    }
  }
}
</style>
