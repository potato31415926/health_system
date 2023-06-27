<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-end p-4">
      <router-link to="/login/admin">
        <Button class="bg-blue-600 scale-125">管理员登录页面</Button>
      </router-link>
    </div>
    <div class="h-full flex justify-center items-center">
      <div class="w-96 h-96 flex flex-col justify-center items-center space-y-4 bg-blue-50/80 rounded-2xl">
        <h1 class="font-sans text-2xl italic">用户登录界面</h1>
        <div class="">
          <p>姓名</p>
          <input
            type="text"
            v-model="Input.user_name"
            class="rounded-full w-60 h-10 p-4 bg-slate-200 hover:bg-gray-100 focus:bg-gray-300 focus:outline-none" />
        </div>
        <div>
          <p>学/工号</p>
          <input
            type="text"
            v-model="Input.user_id"
            class="rounded-full w-60 h-10 p-4 bg-slate-200 hover:bg-gray-100 focus:bg-gray-300 focus:outline-none" />
        </div>
        <div>
          <p>身份证后8位</p>
          <input
            type="password"
            v-model="Input.person_id"
            class="rounded-full w-60 h-10 p-4 bg-slate-200 hover:bg-gray-100 focus:bg-gray-300 focus:outline-none" />
        </div>
        <el-button type="primary" size="large" class="w-40" round @click="submit()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { userLogin } from '@/api/login'
import { mainStore } from '@/store'
import router from '@/router'

const store = mainStore()

const Input = reactive({
  user_id: '111111111111',
  user_name: '鱼哈哈',
  person_id: '23456789'
})

function submit() {
  userLogin(Input.user_name, Input.user_id, Input.person_id).then((res) => {
    if (res.data.message === '登录成功') {
      let userInfo = res.data.userInfo
      store.$patch((state) => {
        state.user = userInfo
      })
      router.push('/user/home')
    } else if (res.data.message === '登录信息错误') {
      alert('姓名或身份证后8位错误，请重新输入！')
      Input.user_name = ''
      Input.person_id = ''
    } else {
      alert('该用户账户不存在，请重新输入！')
      Input.user_name = ''
      Input.person_id = ''
      Input.user_id = ''
    }
  })
}
</script>

<style lang="scss" scoped></style>
