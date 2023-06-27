<template>
  <el-card class="box-card w-full my-10">
    <template #header>
      <div class="card-header flex justify-between">
        <span>{{ props.title }}</span>
        <Button v-if="props.role != 'self'" class="bg-blue-400" @click="addAdmin()">添加{{ role }}</Button>
      </div>
    </template>
    <div class="flex justify-center">
      <el-table :data="tableData.value" style="width: fit-content">
        <el-table-column prop="dept_name" label="学院" width="100" />
        <el-table-column prop="admin_id" label="工号" width="120" />
        <el-table-column prop="admin_name" label="姓名" width="80" />
        <el-table-column prop="role_name" label="职务" width="100" />
        <el-table-column prop="password" label="密码" width="120" />
        <el-table-column label="Operations" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleChangePassword(scope.$index, scope.row)">
              修改密码
            </el-button>
            <el-button link type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <PasswordDialog :id="id" :adminInfo="adminInfo" />
      <InsertAdminDialog :id="id2" :role="props.role" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { mainStore } from '@/store'
import { queryAdmins } from '@/api/query'
import { deleteAdmin } from '@/api/update'
import router from '@/router'

const store = mainStore()

const id = ref<number>(0)
const id2 = ref<number>(0)

const adminInfo = ref<any>()

const props = defineProps({
  role: { default: 'self' },
  title: { default: '' }
})

const tableData = reactive<any>({
  value: []
})

// 如果不是校级管理员的话，这里的 role 应为 self
if (props.role == 'self') {
  tableData.value.push({
    admin_id: store.admin.user_id,
    admin_name: store.admin.user_name,
    password: store.admin.password,
    dept_name: store.admin.dept_name,
    role_name: store.admin.role_name
  })
} else {
  let department = ''
  queryAdmins(props.role, department).then((res) => {
    tableData.value = res.data
  })
}

const handleChangePassword = (index: number, row: any) => {
  id.value = Math.random()
  adminInfo.value = {
    user_id: row.admin_id,
    password: row.password
  }
}

const handleDelete = (index: number, row: any) => {
  deleteAdmin(row.admin_id).then((res) => {})
  router.go(0)
}

function addAdmin() {
  id2.value = Math.random()
}
</script>

<style lang="scss" scoped></style>
