<template>
  <div class="h-screen overflow-hidden">
    <TopBar title="师生健康管理系统用户界面" class="h-[12%]" />
    <div class="h-[88%] flex">
      <el-card class="min-w-[300px] whitespace-nowrap">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
        <Information property="姓名" :value="userInfo.user_name" />
        <Information property="身份证号" :value="userInfo.person_id" />
        <Information property="学工号" :value="userInfo.user_id" />
        <Information property="学院" :value="userInfo.department" />
        <Information property="专业" :value="userInfo.major" />
        <Information property="班级" :value="userInfo.classes" />
        <Information property="角色" :value="userInfo.role" />
        <Information property="健康码颜色" :value="userInfo.health_code_color" />
        <Information property="今日是否打卡" :value="userInfo.is_punch" />
        <Information property="是否接种疫苗" :value="userInfo.is_injected" />
        <Information property="连续打卡天数" :value="userInfo.punch_days" />
        <Information property="手机号码" :value="userInfo.phone" />
      </el-card>
      <div class="flex-1 bg-white flex justify-center items-center space-x-20">
        <router-link to="/healthcode" class="flex flex-col items-center hover:scale-105">
          <svg class="iconfont w-40 h-40">
            <use xlink:href="#icon-jiankangma"></use>
          </svg>
          <p class="text-xl font-semibold text-blue-500">健康码</p>
        </router-link>
        <div @click="punch()" class="flex flex-col items-center hover:scale-105">
          <svg class="iconfont w-40 h-40">
            <use xlink:href="#icon-paibandaka"></use>
          </svg>
          <p class="text-xl font-semibold text-green-600">每日健康打卡</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { mainStore } from '@/store'
import { User } from '@/utils/model/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const store = mainStore()
const userInfo = ref<User>(store.user)

function punch() {
  if (userInfo.value.is_punch != '是') {
    router.push('/healthpunch')
  } else {
    open()
  }
}

const open = () => {
  ElMessage({
    message: '每日只能打卡一次，不能重复打卡',
    type: 'warning'
  })
}
</script>

<style scoped>
.el-card {
  background-color: rgb(210, 233, 242);
}
.el-card :deep(.el-card__header) {
  padding: 2px 10px;
  color: rgb(223, 224, 144);
  text-align: center;
  background-color: rgb(103, 154, 235);
}
.el-card :deep(.el-card__body) {
  padding: 0px;
  background-color: rgb(210, 233, 242);
}
</style>
