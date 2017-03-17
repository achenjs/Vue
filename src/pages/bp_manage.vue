<template lang="html">
<div class="">
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
  <div class="">
    <div class="title">
      <span>团队信息</span>
    </div>
    <el-col :span="8">
      <div style="width: 80%;">
        <label for="">项目名称</label>
        <el-input placeholder="项目名称"></el-input>
        <label for="">公司名称</label>
        <el-input placeholder="公司名称"></el-input>
        <label for="">预期融资额(万元)</label>
        <el-input placeholder="预期融资额"></el-input>
        <label for="">预期估值(万元)</label>
        <el-input placeholder="预期估值"></el-input>
      </div>
    </el-col>
    <el-col :span="8">
      <div style="width: 80%;">
        <label for="">联系人</label>
        <el-input placeholder="联系人"></el-input>
        <label for="">员工人数</label>
        <el-input placeholder="员工人数"></el-input>
        <label for="">成立时间</label>
        <el-input placeholder="预期融资额"></el-input>
        <label for="">所属城市</label>
        <el-input placeholder="所属城市"></el-input>
      </div>
    </el-col>
    <el-col :span="8">
      <div style="width: 80%;">
        <label for="">关联投资者</label>
        <el-input placeholder="关联投资者"></el-input>
        <label for="">关联机构</label>
        <el-input placeholder="关联机构"></el-input>
        <label for="">项目来源</label>
        <el-input placeholder="项目来源"></el-input>
        <label for="">所属行业</label>
        <el-input placeholder="所属行业"></el-input>
      </div>
    </el-col>
    <el-col :span="24">
      <div style="width: 90%;">
        <label for="">关键词</label>
        <el-input placeholder="关键词" :maxlength="34"></el-input>
        <label for="">一句话介绍</label>
        <el-input placeholder="一句话介绍" :maxlength="34"></el-input>
        <label for="">备注</label>
        <el-input type="textarea" placeholder="备注" :maxlength="100" :rows="6"></el-input>
      </div>
    </el-col>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ]
      };
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
</style>
