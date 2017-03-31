<template lang="html">

</template>

<script>
export default {
  data() {
    return {
      isAdmin: true,

    }
  },
  props: {
    message: {
      type: Array,
      default: []
    }
  },
  mounted() {

  },
  created() {
    this.form.usiid = this.$route.query.id
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
