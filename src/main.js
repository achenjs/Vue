// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/reset.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'

// router.beforeEach((to, from, next) => {
//   if (!sessionStorage.getItem('user')) {
//     if (to.path === '/admin/signin') {
//       next()
//     } else {
//       next({path: '/admin/signin'})
//     }
//   } else {
//     next()
//   }
// })

$('window').ajaxError(function(event,xhr,options,exc) {
  console.log(event)
})


Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
