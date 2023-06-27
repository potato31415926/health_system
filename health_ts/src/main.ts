import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import '@/assets/css/index.css'

import '@/router'
import '@/assets/icon/iconfont.css'
import '@/assets/icon/iconfont'

import '@/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from '@/axios'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

router.beforeEach((to, from, next) => {
  // session 中有数据
  if (sessionStorage.length !== 0) {
    let main = sessionStorage.getItem('main')
    main = JSON.parse(main)
    // 需要管理员登录但无登录信息
    if (to.meta.AdminLogin && main.admin.user_id == '') {
      next({ path: '/' })
      // 需要用户登录但无登录信息
    } else if (to.meta.UserLogin && main.user.user_id == '') {
      next({ path: '/login/user' })
      // 不需要登录
    } else {
      next()
    }
    // session 中无数据
  } else {
    // 不需要登录
    if (!to.meta.AdminLogin && !to.meta.UserLogin) {
      next()
      // 需要管理员登录
    } else if (to.meta.AdminLogin) {
      next({ path: '/' })
      // 需要用户登录
    } else if (to.meta.UserLogin) {
      next({ path: '/login/user' })
    }
  }
})

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios = axios //配置axios的全局引用
