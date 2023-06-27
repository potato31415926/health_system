<template>
  <div class="bg-blue-500/80 p-6 flex justify-between whitespace-nowrap">
    <h2 class="text-2xl self-center">{{ props.title }}</h2>
    <router-link
      :to="url"
      class="self-end text-sm px-3 py-2 bg-blue-500 rounded-2xl text-slate-200 hover:bg-blue-400"
      @click.native="clearSession">
      退出登录
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const url = ref('/login/user')

const props = defineProps({
  title: { required: true }
})

if (props.title == '师生健康管理系统后台') {
  url.value = '/login/admin'
}

function clearSession() {
  sessionStorage.removeItem('activeIndex')
  sessionStorage.removeItem('main')
}
</script>

<style scoped></style>
