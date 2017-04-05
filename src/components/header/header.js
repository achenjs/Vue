const axios = require('axios')

module.exports = {
  props: {
    User: {
      type: Object
    }
  },
  methods: {
    //退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
      }).then(() => {
        axios.get('/admin/api/v1/logout')
          .then((result) => {
            _this.$router.push('/signin')
          })
      }).catch(() => {

      })
    }
  }
}
