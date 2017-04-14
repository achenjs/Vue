const axios = require('axios')
const index = require('../../router')
module.exports = {
  data() {
    return {
      imgUrl: '',
      form: {
        captcha: '',
        username: '',
        password: ''
      },
      checked: false
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
    document.onkeydown = (ev) => {
      if (ev.keyCode == 13) {
        this.signin()
      }
    }

    //  判断用户是否勾选了保存
    var userInfo = this.$cookie.get('userInfo')
    if (userInfo) {
      this.checked = true
      this.form.username = userInfo
    }
  },
  methods: {
    //  验证码
    captcha() {
      axios.get('/main/api/v1/captcha?time=' + new Date().getTime())
        .then((result) => {
          this.imgUrl = result.data
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    signin() {
      axios.post('/admin/api/v1/',this.form)
        .then((result) => {
          this.$message({
            message: result.data.message,
            type: 'success'
          })
          //  是否勾选保存用户信息
          if (this.checked) {
            this.$cookie.set('userInfo', this.form.username, 7)
          } else {
            this.$cookie.delete('userInfo')
          }
          axios.get('/admin/api/v1/profile')
            .then((result) => {
              const userInfo = result.data.result
              const permissions = userInfo.permissions
              localStorage.removeItem('permissions')
              localStorage.setItem('permissions', permissions)

              index.default.init_route()

              this.$router.push({path: '/', query: {id: 1}})
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    isLogin() {
      axios.get('/admin/api/v1/')
        .then((result) => {
          if (this.$router.options.routes[0].children) {
            var start_path = this.$router.options.routes[0].children[0].path
            this.$router.push(start_path)
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
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
