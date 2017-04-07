import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin/signin.vue'
import Home from '@/components/home.vue'
import admin_list from '@/pages/admin_list.vue'
import admin_new from '@/pages/admin_new.vue'
import project_list from '@/pages/project_list.vue'
import project_details from '@/pages/project_details.vue'
import stage_manage from '@/pages/stage_manage.vue'
import attachments from '@/pages/attachments.vue'
import service_category from '@/pages/service_category.vue'
import service_item from '@/pages/service_item.vue'
import service_custom from '@/pages/service_custom.vue'
import deliverable_list from '@/pages/deliverable_list.vue'
import nextAtta from '@/pages/nextAtta.vue'
import attaDetails from '@/pages/attaDetails.vue'
import indent_list from '@/pages/indent_list.vue'
import indentDetails from '@/pages/indentDetails.vue'
import managers from '@/pages/managers.vue'
import department from '@/pages/department.vue'
import role from '@/pages/role.vue'
import bill_list from '@/pages/bill_list.vue'
import settings from '@/pages/settings.vue'
import bp_list from '@/pages/bp_list.vue'
import bp_manage from '@/pages/bp_manage.vue'
import bp_details from '@/pages/bp_details.vue'
import NotFound from '@/pages/notFound.vue'

Vue.use(Router)


var entries = []


var init_route = function ()
{
var permissions = localStorage.getItem('permissions')

entries.splice(0, entries.length)

if(permissions != null)
{
  permissions = permissions.split(',')

  // console.log(permissions)

  var kids = []

  var canShowStartupList = permissions.indexOf('StartupList') > -1
  if(canShowStartupList)
  {
    kids.push({path: '/admin_list', component: admin_list, iconCls: 'icon-page1', name: '会员列表'})
  }

  var canCreateStartup = permissions.indexOf('StartupNew') > -1
  if(canCreateStartup)
  {
    kids.push({path: '/admin_new', component: admin_new, iconCls: 'icon-page2', name: '开通新账户'})
  }

  if(canShowStartupList || canCreateStartup)
  {
        var child = {
        path: '/',
        name: '用户管理',
        iconCls: 'icon-user',
        component: Home,
        children: kids
      }

      entries.push(child)
  }


  if(permissions.indexOf('BPManagement') > -1)
  {
    var child =  {
        path: '/',
        name: 'BP管理',
        iconCls: 'icon-BP',
        component: Home,
        children: [
          {path: '/bp_list', component: bp_list, iconCls: 'icon-page14', name: 'BP列表', children: [
            {path: '/bp_list/:id', component: bp_details, name: '修改BP', hidden: true}
          ]},
          {path: '/bp_manage', name: '新建BP', component: bp_manage, hidden: true}
        ]
      }

      entries.push(child)
  }

  kids = []

  var canShowProjectList = permissions.indexOf('ProjectManagement') > -1
  if(canShowProjectList)
  {
    kids.push({path: '/project_list', component: project_list, iconCls: 'icon-page4', name: '项目列表', children: [{path: '/project_list/:id', component: project_details, name: '项目详情', hidden: true}]})
  }

  var canManageSystemPhase = permissions.indexOf('PhaseManagement') > -1
  if(canManageSystemPhase)
  {
    kids.push({path: '/stage_manage', component: stage_manage, iconCls: 'icon-page5', name: '阶段管理'})
  }

  var canManageSystemAttachments = permissions.indexOf('AttachmentManagement') > -1
  if(canManageSystemAttachments)
  {
    kids.push({path: '/attachments', component: attachments, iconCls: 'icon-page6', name: '交付物管理'})
  }

  if(canShowProjectList || canManageSystemPhase || canManageSystemAttachments)
  {
    var child = {
        path: '/',
        name: '项目管理',
        iconCls: 'icon-project',
        component: Home,
        children: kids
      }

      entries.push(child)
  }

  kids = []

  var canEditServiceCategory = permissions.indexOf('ServiceCategoryManagement') > -1

  if(canEditServiceCategory)
  {
    kids.push({path: '/service_category', component: service_category, iconCls: 'icon-page7', name: '服务项类别管理'})
  }


  var canEditServiceItem = permissions.indexOf('ServiceItemManagement') > -1
  if(canEditServiceItem)
  {
    kids.push({path: '/service_item', component: service_item, iconCls: 'icon-page8', name: '服务项管理'})
  }

  if(canEditServiceCategory || canEditServiceItem)
  {
    entries.push({
          path: '/',
          name: '服务项管理',
          iconCls: 'icon-server',
          component: Home,
          children: kids
        })
  }

  if(permissions.indexOf('CustomServiceItemManagement') > -1)
  {
    var child = {
        path: '/',
        name: '定制化需求管理',
        iconCls: 'icon-custom',
        component: Home,
        children: [
          {path: '/service_custom', component: service_custom, iconCls: 'icon-page9', name: '定制化需求管理列表'}
        ]
      }

      entries.push(child)
  }

  if(permissions.indexOf('UserAttachmentManagement') > -1)
  {
    var child =  {
        path: '/',
        name: '交付物审核管理',
        iconCls: 'icon-examine',
        component: Home,
        children: [
          {path: '/deliverable_list', component: deliverable_list, iconCls: 'icon-page10', name: '交付物列表', children: [
            {path: '/deliverable_list/:id', component: nextAtta, name: '交付物评审', hidden: true},
            {path: '/attaDetails/:id', component: attaDetails, name: '交付物详情', hidden: true}
          ]}
        ]
      }

      entries.push(child)
  }

  if(permissions.indexOf('OrdersManagement') > -1)
  {
    var child = {
        path: '/',
        name: '订单管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/indent_list', component: indent_list, iconCls: 'icon-page11', name: '订单列表', children: [
            {path: '/indent_list/:id', component: indentDetails, name: '服务项详情', hidden: true}
          ]}
        ]
      }

      entries.push(child)
  }

  if(permissions.indexOf('BillManagement') > -1)
  {
    var child = {
        path: '/',
        name: '交易管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/bill_list', component: bill_list, iconCls: 'icon-page11', name: '消费记录'}
        ]
      }

      entries.push(child)
  }

  kids = []

  var canEditAdmin = permissions.indexOf('AdminManagement') > -1
  if(canEditAdmin)
  {
    kids.push({path: '/managers', component: managers, iconCls: 'icon-page12', name: '操作员管理'})
  }

  var canEditDepartment = permissions.indexOf('DepartmentManagement') > -1
  if(canEditDepartment)
  {
    kids.push({path: '/department', component: department, iconCls: 'icon-page13', name: '部门管理'})
  }

  var canEditRole = permissions.indexOf('RoleManagement') > -1
  if(canEditRole)
  {
    kids.push({path: '/role', component: role, iconCls: 'icon-page11', name: '角色管理'})
  }

  var canEditProfile = permissions.indexOf('ProfileManagement') > -1
  if(canEditProfile)
  {
    kids.push({path: '/settings', component: settings, iconCls: 'icon-page8', name: '修改密码'})
  }

  if(canEditAdmin || canEditDepartment || canEditRole || canEditProfile)
  {
    entries.push({
            path: '/',
            name: '系统管理',
            iconCls: 'icon-system',
            component: Home,
            children: kids
          })
  }
}

entries.push(      {
        path: '/',
        name: '',
        component: Home,
        hidden: true
      })

entries.push({
        path: '/signin',
        name: '',
        component: signin,
        hidden: true
      }
  )

entries.push({
        path: '/404',
        name: '未找到该页面',
        component: NotFound,
        hidden: true
      }
  )

// entries.push({
//   path: '/home',
//   component: Home,
//   hidden: true
// })

entries.push({
        path: '*',
        redirect: {path: '/404'},
        hidden: true
      })

}
init_route()

var route = {
    mode: 'history',
    base: '/admin/',
    routes: entries
}

const router = new Router(route)

export default {init_route,router}
// exports.init_route = init_route
// exports.router = new Router(route)

// export default {
//   a: init_route,
//   b: new Router(route)
// }
// export default new Router(route)
