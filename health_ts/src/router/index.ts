import { createRouter, createWebHashHistory } from 'vue-router'

import UserLogin from '@/pages/Login/User.vue'
import AdminLogin from '@/pages/Login/Admin.vue'
import AdminHome from '@/pages/AdminHome/index.vue'
import Manage from '@/pages/AdminHome/Manage.vue'
import Import from '@/pages/AdminHome/Import.vue'
import Overview from '@/pages/AdminHome/OverView.vue'
import AdminManage from '@/pages/AdminHome/AdminManage.vue'
import UserHome from '@/pages/UserHome/index.vue'
import HealthPunch from '@/pages/UserHome/HealthPunch.vue'
import HealthCode from '@/pages/UserHome/HealthCode.vue'

const routes = [
  {
    path: '/',
    redirect: '/login/admin'
  },
  {
    path: '/login/user',
    component: UserLogin
  },
  {
    path: '/login/admin',
    component: AdminLogin
  },
  {
    path: '/admin/home',
    redirect: '/manage',
    component: AdminHome,
    meta: { AdminLogin: true, UserLogin: false },
    children: [
      {
        path: '/manage',
        component: Manage,
        meta: { AdminLogin: true, UserLogin: false }
      },
      {
        path: '/import',
        component: Import,
        meta: { AdminLogin: true, UserLogin: false }
      },
      {
        path: '/adminmanage',
        component: AdminManage,
        meta: { AdminLogin: true, UserLogin: false }
      },
      {
        path: '/overview',
        component: Overview,
        meta: { AdminLogin: true, UserLogin: false }
      }
    ]
  },
  {
    path: '/user/home',
    component: UserHome,
    meta: { AdminLogin: false, UserLogin: true }
  },
  {
    path: '/healthpunch',
    component: HealthPunch,
    meta: { AdminLogin: false, UserLogin: true }
  },
  {
    path: '/healthcode',
    component: HealthCode,
    meta: { AdminLogin: false, UserLogin: true }
  }
]

const router:Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
