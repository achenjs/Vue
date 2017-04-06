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
              const userInfo = result.data.result;
              const permissions = userInfo.permissions;
              localStorage.setItem('permissions', permissions);
              setTimeout(function() {

                str_path = _this.$router.options.routes[0].path

                  _this.$router.push({path: str_path, query: 1})
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
          str_path = _this.$router.options.routes[0].path

          _this.$router.push(str_path)
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    }
  }
}
