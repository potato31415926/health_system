<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end p-4">
      <router-link to="/login/user">
        <Button class="bg-blue-600 scale-125">用户登录页面</Button>
      </router-link>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <div class="w-96 h-80 flex flex-col justify-center items-center space-y-4 rounded-2xl bg-blue-50/80">
        <h1 class="font-sans text-2xl italic">管理员登录界面</h1>
        <div class="">
          <p>工号</p>
          <input
            type="text"
            v-model="Input.user_id"
            class="rounded-full w-60 h-10 p-4 bg-slate-200 hover:bg-gray-100 focus:bg-gray-300 focus:outline-none" />
        </div>
        <div>
          <p>密码</p>
          <input
            type="password"
            v-model="Input.password"
            class="rounded-full w-60 h-10 p-4 bg-slate-200 hover:bg-gray-100 focus:bg-gray-300 focus:outline-none" />
        </div>
        <el-button type="primary" size="large" class="w-40" @click="submit" round>登录</el-button>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { adminLogin } from '@/api/login'
import router from '@/router'
import { mainStore } from '@/store'

const store = mainStore()
const Input = reactive({
  user_id: '100000000000',
  password: '123456abcd'
})

function submit() {
  adminLogin(Input.user_id, Input.password).then((res) => {
    if (res.data.message === '登录成功') {
      let adminInfo: any = res.data.adminInfo
      // 赋值
      adminInfo.user_id = adminInfo.admin_id
      adminInfo.user_name = adminInfo.admin_name
      // 删除不需要的元素
      delete adminInfo.admin_id
      delete adminInfo.admin_name
      store.$patch((state) => {
        state.admin = adminInfo
      })
      router.push('/admin/home')
    } else if (res.data.message === '登录信息错误') {
      alert('密码错误，请重新输入！')
      Input.password = ''
    } else {
      alert('该管理员账户不存在，请重新输入！')
      Input.password = ''
      Input.user_id = ''
    }
  })
}
</script>

<style lang="scss" scoped></style>
