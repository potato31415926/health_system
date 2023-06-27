<template>
  <div class="w-full">
    <Title value="概览" />
    <Selectors @onchange="changeOptions" />
    <div class="w-full flex flex-wrap justify-around">
      <!-- 健康码统计 -->
      <Echarts text="健康码统计" id="1" :data="data.health" :name="name.health" />
      <!-- 打卡统计 -->
      <Echarts text="今日打卡情况统计" id="2" :data="data.punch" :name="name.punch" />
      <!-- 疫苗统计 -->
      <Echarts text="疫苗接种情况统计" id="3" :data="data.inject" :name="name.inject" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { queryCountInfo } from '@/api/query'

const options = reactive<any>({
  department: '',
  major: '',
  classes: ''
})

const data = reactive<any>({
  health: [],
  punch: [],
  inject: []
})

const name = reactive<any>({
  health: [],
  punch: [],
  inject: []
})

function changeOptions(val: any) {
  options.department = val[0].selected
  options.major = val[1].selected
  options.classes = val[2].selected
  count()
}

function count() {
  data.health.length = 0
  data.inject.length = 0
  data.punch.length = 0
  queryCountInfo(options.department, options.major, options.classes).then((res) => {
    let i = res.data
    data.health.push({ name: '绿码', value: i.green })
    data.health.push({ name: '红码', value: i.red })
    data.health.push({ name: '黄码', value: i.yellow })
    data.inject.push({ name: '已注射疫苗', value: i.is_injected })
    data.inject.push({ name: '未注射疫苗', value: i.no_injected })
    data.punch.push({ name: '今日已打卡', value: i.is_punch })
    data.punch.push({ name: '今日未打卡', value: i.no_punch })
    name.health.push('绿码')
    name.health.push('红码')
    name.health.push('黄码')
    name.inject.push('已注射疫苗')
    name.inject.push('未注射疫苗')
    name.punch.push('今日已打卡')
    name.punch.push('今日未打卡')
  })
}
</script>

<style lang="scss" scoped></style>
