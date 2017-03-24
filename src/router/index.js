import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin/signin.vue'
import Home from '@/components/home.vue'
import admin_list from '@/pages/admin_list.vue'
import admin_new from '@/pages/admin_new.vue'
import project_list from '@/pages/project_list.vue'
import stage_manage from '@/pages/stage_manage.vue'
import attachments from '@/pages/attachments.vue'
// import comment_list from '@/pages/comment_list.vue'
import service_category from '@/pages/service_category.vue'
import service_item from '@/pages/service_item.vue'
import service_custom from '@/pages/service_custom.vue'
import deliverable_list from '@/pages/deliverable_list.vue'
import indent_list from '@/pages/indent_list.vue'
import managers from '@/pages/managers.vue'
import department from '@/pages/department.vue'
import role from '@/pages/role.vue'
import permissions from '@/pages/permissions.vue'
import bill_list from '@/pages/bill_list.vue'
import settings from '@/pages/settings.vue'
import bp_list from '@/pages/bp_list.vue'
import bp_manage from '@/pages/bp_manage.vue'
import bp_details from '@/pages/bp_details.vue'
import NotFound from '@/pages/notFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: '',
      redirect: '/admin/admin_list',
      hidden: true
    },
    {
      path: '/admin/signin',
      name: '',
      component: signin,
      hidden: true
    },
    {
      path: '/admin/404',
      name: '未找到该页面',
      component: NotFound,
      hidden: true
    },
    {
      path: '/admin/admin_list',
      name: '用户管理',
      iconCls: 'icon-user',
      component: Home,
      children: [
        {path: '/admin/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'},
        {path: '/admin/admin_new', component: admin_new, iconCls: 'icon-page2', name: '开通新账户'},
        // {path: '/page3', component: Page3, iconCls: 'icon-page3', name: '身份及权限管理'}
      ]
    },
    {
      path: '/admin/project_list',
      name: '项目管理',
      iconCls: 'icon-project',
      component: Home,
      children: [
        {path: '/admin/project_list', component: project_list, iconCls: 'icon-page4', name: '项目列表'},
        {path: '/admin/stage_manage', component: stage_manage, iconCls: 'icon-page5', name: '阶段管理'},
        {path: '/admin/attachments', component: attachments, iconCls: 'icon-page6', name: '交付物管理'},
        // {path: '/comment_list', component: comment_list, name: '点评记录'}
      ]
    },
    {
      path: '/admin/service_category',
      name: '服务包管理',
      iconCls: 'icon-server',
      component: Home,
      children: [
        {path: '/admin/service_category', component: service_category, iconCls: 'icon-page7', name: '服务包类别管理'},
        {path: '/admin/service_item', component: service_item, iconCls: 'icon-page8', name: '服务项管理'},
      ]
    },
    {
      path: '/admin/service_custom',
      name: '定制化需求管理',
      iconCls: 'icon-custom',
      component: Home,
      children: [
        {path: '/admin/service_custom', component: service_custom, iconCls: 'icon-page9', name: '定制化需求管理列表'}
      ]
    },
    {
      path: '/admin/deliverable_list',
      name: '交付物审核管理',
      iconCls: 'icon-examine',
      component: Home,
      children: [
        {path: '/admin/deliverable_list', component: deliverable_list, iconCls: 'icon-page10', name: '交付物列表'}
      ]
    },
    {
      path: '/admin/indent_list',
      name: '订单管理',
      iconCls: 'icon-serverList',
      component: Home,
      children: [
        {path: '/admin/indent_list', component: indent_list, iconCls: 'icon-page11', name: '订单列表'}
      ]
    },
    {
      path: '/admin/bill_list',
      name: '交易管理',
      iconCls: 'icon-serverList',
      component: Home,
      children: [
        {path: '/admin/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
      ]
    },
    {
      path: '/admin/managers',
      name: '系统管理',
      iconCls: 'icon-system',
      component: Home,
      children: [
        {path: '/admin/managers', component: managers, iconCls: 'icon-page12', name: '操作员管理'},
        {path: '/admin/department', component: department, iconCls: 'icon-page13', name: '部门管理'},
        {path: '/admin/role', component: role, iconCls: 'icon-page11', name: '角色管理'},
        {path: '/admin/permissions', component: permissions, iconCls: 'icon-page7', name: '权限管理'},
        {path: '/admin/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'}
      ]
    },
     {
      path: '/admin/bp_list',
      name: 'BP管理',
      iconCls: 'icon-BP',
      component: Home,
      children: [
        {path: '/admin/bp_list', component: bp_list, iconCls: 'icon-page14', name: 'BP列表'},
        {path: '/admin/bp_manage', name: '新建BP', component: bp_manage, hidden: true},
        {path: '/admin/bp_details', name: '修改BP', component: bp_details, hidden: true},
      ]
    },
    {
      path: '*',
      redirect: {path: '/admin/404'},
      hidden: true
    },
  ]
})
