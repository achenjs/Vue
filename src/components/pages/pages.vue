<template lang="html">
  <div class="pages">
    <el-pagination
      v-show="total > 0"
      layout="prev, pager, next"
      :current-page="currenPage"
      :total="total"
      v-on:current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagesize: Number
    }
  },
  props: {
    total: {
      type: Number,
      default: 1
    },
    currenPage: {
      type: Number,
      default: 1
    }
  },
  created() {
  },
  methods: {
    currentChange(page) {
      this.$emit('currentChange', page)
    }
  }
}
</script>

<style lang="scss">
.pages {
  margin-top: 40px;
  text-align: center;
}
</style>
