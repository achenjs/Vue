const axios = require('axios')

module.exports = {
  data() {
    return {
      imgUrl: '',
      form: {
        captcha: '',
        username: '',
        password: ''
      }
    }
  },
  created() {
    //  验证码
    this.captcha()
    //  判断是否已登录
    this.isLogin()
  },
  mounted() {
    var _this = this
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        _this.signin()
      }
    }
  },
  methods: {
    //  验证码
    captcha() {
      var _this = this
      axios.get('/main/api/v1/captcha')
        .then((result) => {
          _this.imgUrl = result.data
        })
    },
    signin() {
      var _this = this
      axios.post('/admin/api/v1/',this.form)
        .then((result) => {
          _this.$message({
            message: result.data.message,
            type: 'success'
          })
          axios.get('/admin/api/v1/profile')
            .then((result) => {
              const userInfo = result.data.result
              const role_name = userInfo.role_name
              localStorage.setItem('role_name', role_name)
              setTimeout(function() {
                if (role_name === '硬件总监' || role_name === '硬件专员') {
                  _this.$router.push({path: '/indent_list', query: 1})
                } else {
                  _this.$router.push({path: '/admin_list', query: 1})
                }
              }, 1000)
            })
            .catch((err) => {
              _this.$message.error(err.message)
            })
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    },
    isLogin() {
      var _this = this
      axios.get('/admin/api/v1/')
        .then((result) => {
          _this.$router.push('/admin_list')
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    }
  }
}
