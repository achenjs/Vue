import Vue from 'vue'
import Router from 'vue-router'
const signin = resolve => require(['@/components/signin/signin.vue'], resolve)
const Home = resolve => require(['@/components/Home.vue'], resolve)
const admin_list = resolve => require(['@/pages/admin_list.vue'], resolve)
const admin_new = resolve => require(['@/pages/admin_new.vue'], resolve)
const project_list = resolve => require(['@/pages/project_list.vue'], resolve)
const project_details = resolve => require(['@/pages/project_details.vue'], resolve)
const stage_manage = resolve => require(['@/pages/stage_manage.vue'], resolve)
const attachments = resolve => require(['@/pages/attachments.vue'], resolve)
const service_category = resolve => require(['@/pages/service_category.vue'], resolve)
const service_item = resolve => require(['@/pages/service_item.vue'], resolve)
const service_custom = resolve => require(['@/pages/service_custom.vue'], resolve)
const deliverable_list = resolve => require(['@/pages/deliverable_list.vue'], resolve)
const nextAtta = resolve => require(['@/pages/nextAtta.vue'], resolve)
const attaDetails = resolve => require(['@/pages/attaDetails.vue'], resolve)
const indent_list = resolve => require(['@/pages/indent_list.vue'], resolve)
const indentDetails = resolve => require(['@/pages/indentDetails.vue'], resolve)
const managers = resolve => require(['@/pages/managers.vue'], resolve)
const department = resolve => require(['@/pages/department.vue'], resolve)
const role = resolve => require(['@/pages/role.vue'], resolve)
const bill_list = resolve => require(['@/pages/bill_list.vue'], resolve)
const settings = resolve => require(['@/pages/settings.vue'], resolve)
const bp_list = resolve => require(['@/pages/bp_list.vue'], resolve)
const bp_manage = resolve => require(['@/pages/bp_manage.vue'], resolve)
const bp_details = resolve => require(['@/pages/bp_details.vue'], resolve)
const NotFound = resolve => require(['@/pages/NotFound.vue'], resolve)

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
            {path: '/nextAtta', component: nextAtta, name: '交付物评审', hidden: true, children: [
              {path: '/attaDetails', component: attaDetails, name: '交付物详情', hidden: true}
            ]}
          ]}
        ]
      }

      entries.push(child)
  }

  if(permissions.indexOf('OrdersManagement') > -1)
  {
    var child = {
        path: '/',
        name: '服务单管理',
        iconCls: 'icon-serverList',
        component: Home,
        children: [
          {path: '/indent_list', component: indent_list, iconCls: 'icon-page11', name: '服务单列表', children: [
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

  entries.push({
    path: '/signin',
    name: '',
    component: signin,
    hidden: true
  })

  entries.push({
    path: '/',
    name: '',
    component: Home,
    hidden: true
  })

  // entries.push({
  //   path: '',
  //   name: '',
  //   redirect: 'signin',
  //   hidden: true
  // })

  entries.push({
    path: '/404',
    name: '未找到该页面',
    component: NotFound,
    hidden: true
  })

  // entries.push({
  //   path: '/home',
  //   component: Home,
  //   hidden: true
  // })

  entries.push({
    path: '*',
    redirect: '/404',
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
