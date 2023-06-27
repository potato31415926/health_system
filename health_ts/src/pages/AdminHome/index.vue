<template>
  <div class="h-full">
    <TopBar title="师生健康管理系统后台" class="h-[12%]" />
    <div class="h-[88%] flex">
      <SideBar />
      <router-view class="scroll bg-white h-full w-full p-4 overflow-auto"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
