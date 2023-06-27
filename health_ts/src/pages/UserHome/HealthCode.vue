<template>
  <Back class="fixed" />
  <div class="h-screen flex justify-center items-center">
    <div class="overflow-hidden bg-slate-100/80 h-[800px] w-[600px] rounded-2xl">
      <div class="bg-blue-400 text-slate-100">
        <p class="p-4 text-xl">{{ user.user_name }}({{ user.role }})</p>
        <p class="px-4">{{ user.department }}&nbsp;{{ user.major }}&nbsp;{{ user.classes }}</p>
        <h1 class="text-3xl pt-2 pb-5 text-center text-indigo-500 font-bold italic">校园通行码</h1>
      </div>
      <div class="text-center text-xl mt-8 italic">{{ times }}</div>
      <img :src="url" alt="健康码" class="scale-90 m-auto" />
      <div class="px-10 py-6 text-center">
        <span v-if="user.is_punch == '否'">
          提示：你今天还未完成健康打卡！
          <router-link class="text-blue-400" to="/healthpunch">点击前往每日打卡</router-link>
        </span>
        <span v-else-if="user.health_code_color == '绿'">
          凭此码可在本校范围内通行，请主动出示，配合检查;并做好自身防护工作，码值会根据您的健康申报由当地政府根据相关政策及时更新。
        </span>
        <span v-else-if="user.health_code_color == '黄'">
          您需要连续7天进行每日打卡，且打卡结果要满足绿色健康码条件，才能转为绿码。
        </span>
        <span v-else-if="user.health_code_color == '红'">
          您需要连续7天进行每日打卡，且打卡结果要满足绿色健康码条件，才能转为黄码。
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { queryHealthCode } from '@/api/query'
import { mainStore } from '@/store'
import { User } from '@/utils/model/user'

const store = mainStore()
const user = ref<User>(store.user)
const url = ref<string>('')
const times = ref<string>('')

queryHealthCode(store.user).then((res) => {
  url.value = res.data
})

// 时间
function time() {
  var date: Date = new Date()
  var year: number = date.getFullYear()
  var month: number = date.getMonth() + 1
  var day: number = date.getDate()
  var week: any = date.getDay()
  week = '星期' + '日一二三四五六'.charAt(week)
  var hour: number = date.getHours()
  var minute: number = date.getMinutes()
  var second: number = date.getSeconds()
  var temp: any[] = [month, day, hour, minute, second]
  for (var i in temp) {
    temp[i] = temp[i] < 10 ? '0' + temp[i] : temp[i]
  }
  var currentTime: string =
    year + '-' + temp[0] + '-' + temp[1] + ' ' + temp[2] + ':' + temp[3] + ':' + temp[4] + ' ' + week
  times.value = currentTime
}

setInterval(time, 1000)
</script>

<style scoped></style>
