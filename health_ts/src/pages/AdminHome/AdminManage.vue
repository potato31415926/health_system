<template>
  <div>
    <Title value="管理员列表" />
    <div v-if="store.admin.role_name != '系统管理员'" class="flex justify-center">
      <AdminTable :title="store.admin.role_name" />
    </div>
    <div v-else>
      <AdminTable role="系统管理员" title="系统管理员" />
      <AdminTable role="校级管理员" title="校级管理员" />
      <AdminTable role="院级管理员" title="院级管理员" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store'
const store = mainStore()
</script>

<style lang="scss" scoped></style>
