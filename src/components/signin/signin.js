const axios = require('axios')
const index = require('../../router/index.js')
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
    // 判断用户浏览器
    var explorerInfo = this.getExplorerInfo()
    var type = explorerInfo.type
    if (type == 'IE') {
      this.$notify({
        title: '警告',
        message: '建议您采用最新版chrome浏览器体验性更好',
        type: 'warning'
      })
    }
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
      axios.get('/main/api/v1/captcha?time=' + new Date())
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
              const permissions = userInfo.permissions
              localStorage.removeItem('permissions')
              localStorage.setItem('permissions', permissions)

              index.default.init_route()

              // var start_path = _this.$router.options.routes[0].path
              // _this.$router.push(start_path)
              // console.log()
              _this.$router.push({path: '/', query: 1})
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
          var start_path = _this.$router.options.routes[0].children[0].path
          _this.$router.push(start_path)
        })
        .catch((err) => {
          _this.$message.error(err.message)
        })
    },
    getExplorerInfo() {
       var explorer = window.navigator.userAgent.toLowerCase()
       //ie
       if (explorer.indexOf("msie") >= 0) {
          var ver=explorer.match(/msie ([\d.]+)/)[1];
          return {type:"IE",version:ver};
       }
       //firefox
       else if (explorer.indexOf("firefox") >= 0) {
          var ver=explorer.match(/firefox\/([\d.]+)/)[1];
          return {type:"Firefox",version:ver};
       }
       //Chrome
       else if(explorer.indexOf("chrome") >= 0){
          var ver=explorer.match(/chrome\/([\d.]+)/)[1];
          return {type:"Chrome",version:ver};
       }
       //Opera
       else if(explorer.indexOf("opera") >= 0){
         var ver=explorer.match(/opera.([\d.]+)/)[1];
         return {type:"Opera",version:ver};
       }
       //Safari
       else if(explorer.indexOf("Safari") >= 0){
         var ver=explorer.match(/version\/([\d.]+)/)[1];
         return {type:"Safari",version:ver};
       }
     }
  }
}
