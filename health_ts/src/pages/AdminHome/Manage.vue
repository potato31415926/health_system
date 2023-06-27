<template>
  <div>
    <Title value="信息管理" />
    <!-- 下拉框 -->
    <Selectors @onchange="changeOptions" />
    <!-- 新增和删除按钮 -->
    <div class="flex justify-end space-x-2 my-2">
      <Button @click="insert()" class="bg-green-500 hover:bg-green-400 active:bg-green-600">新增</Button>
      <Button class="bg-red-500 hover:bg-red-400 active:bg-red-600" @click="Delete">删除</Button>
    </div>
    <!-- 表格 -->
    <UserTable
      @onchange="getUsers"
      :department="options.department"
      :major="options.major"
      :classes="options.classes" />
    <InsertDialog :id="id" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { deleteUsers } from '@/api/update'
import router from '@/router'
import { User } from '@/utils/model/user'

const options = reactive({
  department: '',
  major: '',
  classes: ''
})

const users = ref<User[]>([])

const id = ref()

function changeOptions(val: any) {
  options.department = val[0].selected
  options.major = val[1].selected
  options.classes = val[2].selected
}

function insert() {
  id.value = Math.random()
}

// 获取users
function getUsers(val: User[]) {
  users.value = val
}

function Delete() {
  let ids: string[] = []
  console.log(users.value.length)
  for (let i = 0; i < users.value.length; i++) {
    ids.push(users.value[i].person_id)
  }
  deleteUsers(ids).then((res) => {
    console.log(res)
    router.go(0)
  })
}
</script>

<style lang="scss" scoped></style>
