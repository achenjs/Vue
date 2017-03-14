import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin/signin.vue'
import Home from '@/components/home.vue'
import admin_list from '@/pages/admin_list.vue'
import admin_new from '@/pages/admin_new.vue'
import Page3 from '@/pages/page3.vue'
import Page4 from '@/pages/page4.vue'
import Page5 from '@/pages/page5.vue'
import Page6 from '@/pages/page6.vue'
import Page7 from '@/pages/page7.vue'
import Page8 from '@/pages/page8.vue'
import Page9 from '@/pages/page9.vue'
import Page10 from '@/pages/page10.vue'
import Page11 from '@/pages/page11.vue'
import Page12 from '@/pages/page12.vue'
import Page13 from '@/pages/page13.vue'
import Page14 from '@/pages/page14.vue'
import NotFound from '@/pages/notFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/signin',
      hidden: true
    },
    {
      path: '/signin',
      name: '',
      component: signin,
      hidden: true
    },
    {
      path: '/404',
      name: '未找到该页面',
      component: NotFound,
      hidden: true
    },
    {
      path: '/home',
      name: '用户管理',
      iconCls: 'icon-user',
      component: Home,
      children: [
        {path: '/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'},
        {path: '/admin_new', component: admin_new, iconCls: 'icon-page2', name: '开通新账户'},
        {path: '/page3', component: Page3, iconCls: 'icon-page3', name: '身份及权限管理'}
      ]
    },
    {
      path: '/home',
      name: '项目管理',
      iconCls: 'icon-project',
      component: Home,
      children: [
        {path: '/page4', component: Page4, iconCls: 'icon-page4', name: '项目列表'},
        {path: '/page5', component: Page5, iconCls: 'icon-page5', name: '阶段管理'},
        {path: '/page6', component: Page6, iconCls: 'icon-page6', name: '交付物管理'}
      ]
    },
    {
      path: '/home',
      name: '服务包管理',
      iconCls: 'icon-server',
      component: Home,
      children: [
        {path: '/page7', component: Page7, iconCls: 'icon-page7', name: '服务包类别管理'},
        {path: '/page8', component: Page8, iconCls: 'icon-page8', name: '服务项管理'},
      ]
    },
    {
      path: '/home',
      name: '定制化需求管理',
      iconCls: 'icon-custom',
      component: Home,
      children: [
        {path: '/page9', component: Page9, iconCls: 'icon-page9', name: '定制化需求管理列表'}
      ]
    },
    {
      path: '/home',
      name: '交付物审核管理',
      iconCls: 'icon-examine',
      component: Home,
      children: [
        {path: '/page10', component: Page10, iconCls: 'icon-page10', name: '交付物列表'}
      ]
    },
    {
      path: '/home',
      name: '服务单管理',
      iconCls: 'icon-serverList',
      component: Home,
      children: [
        {path: '/page11', component: Page11, iconCls: 'icon-page11', name: '服务单列表'}
      ]
    },
    {
      path: '/home',
      name: '系统管理',
      iconCls: 'icon-system',
      component: Home,
      children: [
        {path: '/page12', component: Page12, iconCls: 'icon-page12', name: '操作员管理'},
        {path: '/page13', component: Page13, iconCls: 'icon-page13', name: '角色及权限管理'}
      ]
    },
     {
      path: '/home',
      name: 'BP管理',
      iconCls: 'icon-BP',
      component: Home,
      children: [
        {path: '/page14', component: Page14, iconCls: 'icon-page14', name: 'BP列表'},
      ]
    },
    {
      path: '*',
      redirect: {path: '/404'},
      hidden: true
    },
  ]
})
