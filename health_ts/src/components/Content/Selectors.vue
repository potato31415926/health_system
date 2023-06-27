<template>
  <div class="flex justify-start flex-nowrap">
    <div v-for="Item in all" :key="Item.id" class="whitespace-nowrap flex items-baseline">
      <span class="text-cyan-700">{{ Item.range }}</span>
      <el-select v-model="Item.selected" @change="Init(Item.id, Item.selected)" class="m-2" placeholder="全部">
        <el-option v-for="item in Item.content" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
  <el-divider />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { mainStore } from '@/store'
import { queryDepartments, queryMajors, queryClasses } from '@/api/query'

const emits = defineEmits(['onchange'])
const store = mainStore()

const all = reactive<any[]>([
  {
    id: 0,
    content: [],
    range: '学院',
    selected: ''
  },
  {
    id: 1,
    content: [],
    range: '专业',
    selected: ''
  },
  {
    id: 2,
    content: [],
    range: '班级',
    selected: ''
  }
])

if (store.admin.role_name !== '院级管理员') {
  emits('onchange', all)
  queryDepartments().then((res) => {
    all[0].content.push({ label: '全部', value: '' })
    for (let i = 0; i < res.data.length; i++) {
      all[0].content.push({ label: res.data[i], value: res.data[i] })
    }
  })
} else {
  all[0].selected = store.admin.dept_name
  Init(0, store.admin.dept_name)
}

// 初始化majors和classes的函数
function Init(id: number, val: string) {
  if (id === 0) {
    //学院改变，获取专业信息
    //清空majors和classes
    all[1].content = []
    all[2].content = []
    //清空major和class
    all[1].selected = ''
    all[2].selected = ''
    queryMajors(val).then((res) => {
      if (res.data !== '\r\n') {
        all[1].content.push({ label: '全部', value: '' })
        for (let i = 0; i < res.data.length; i++) {
          all[1].content.push({ label: res.data[i], value: res.data[i] })
        }
      }
    })
  } else if (id === 1) {
    //专业改变，获取班级信息
    //清空classes
    all[2].content = []
    //清空class
    all[2].selected = ''
    queryClasses(val).then((res) => {
      if (res.data != '') {
        all[2].content.push({ label: '全部', value: '' })
        for (let i = 0; i < res.data.length; i++) {
          all[2].content.push({ label: res.data[i], value: res.data[i] })
        }
      }
    })
  }
  // 向父组件传值
  emits('onchange', all)
}
</script>
