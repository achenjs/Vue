// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/reset.scss'
import ElementUI from 'element-ui'
require('es6-promise').polyfill()
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import route from './router'

const router = route.router

axios.defaults.withCredentials = true

router.beforeEach ((to, from, next) => {
  next()
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        router.push('/signin')
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
