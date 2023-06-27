import { defineStore } from 'pinia'
import type { User } from '@/utils/model/user'
import type { Admin } from '@/utils/model/admin'
import { ref } from 'vue'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      admin: ref<Admin>({}),
      user: ref<User>({})
    }
  },
  persist: {
    enabled: true, //开启存储
    // 修改存储中使用的键名称，默认为当前 Store 的 id
    key: 'main',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    // paths:[]
  },
  getters: {},
  actions: {}
})
