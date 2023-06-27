<template>
  <div class="h-full overflow-hidden whitespace-nowrap w-[50px] bg-blue-300/80 hover:w-44 transition-[1s]">
    <router-link
      v-for="item in listInfo"
      :key="item.id"
      :to="item.url"
      class="block bg-blue-300/80 px-3 py-4 cursor-pointer hover:bg-blue-200 active:bg-blue-500/50"
      @click="Active(item.id)"
      :class="{ 'bg-blue-400/50': active.index == item.id }">
      <i :class="item.icon" class="pl-1 pr-4"></i>
      <span>{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { mainStore } from '@/store'

const store = mainStore()

const active = reactive({
  index: sessionStorage.getItem('activeIndex') ? sessionStorage.getItem('activeIndex') : 0
})

const listInfo = reactive([
  {
    id: 0,
    name: '信息管理',
    icon: 'iconfont icon-wodexinxi_jibenxinxi',
    url: '/manage'
  },
  {
    id: 1,
    name: '管理员列表',
    icon: 'iconfont icon-guanliyuan',
    url: '/adminmanage'
  },
  {
    id: 2,
    name: '概览',
    icon: 'iconfont icon-gailan',
    url: '/overview'
  },
  {
    id: 3,
    name: '导入',
    icon: 'iconfont icon-daoru',
    url: '/import'
  }
])

// 权限管理
if (store.admin.role_name !== '系统管理员') {
  listInfo.splice(3, 1)
}

// active状态变化
function Active(index: number) {
  active.index = index
  sessionStorage.setItem('activeIndex', index.toString())
}
</script>

<style lang="scss" scoped></style>
