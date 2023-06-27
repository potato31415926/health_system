<template>
  <div>
    <el-dialog width="400" v-model="dialogFormVisible" title="新增管理员">
      <el-form-item label="姓名" label-width="100">
        <el-input v-model="admin.admin_name" />
      </el-form-item>
      <el-form-item label="工号" label-width="100">
        <el-input v-model="admin.admin_id" />
      </el-form-item>
      <el-form-item label="密码" label-width="100">
        <el-input v-model="admin.password" />
      </el-form-item>
      <el-form-item label="学院" label-width="100">
        <el-select v-model="admin.dept_name" placeholder="未选择">
          <el-option v-for="item in departments" :key="item.id" :label="item.value" :value="item.value" />
        </el-select>
      </el-form-item>
      <template #footer>
        <span>
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="confirm()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { queryDepartments } from '@/api/query'
import { insertAdmin } from '@/api/update'
import router from '@/router/index'

const props: any = defineProps({
  id: { required: true },
  role: { required: true }
})

const admin = reactive({
  password: '',
  admin_id: '',
  admin_name: '',
  dept_name: '',
  role_name: props.role
})

const dialogFormVisible = ref(false)

const departments = reactive<any[]>([])
// 访问接口
queryDepartments().then((res) => {
  for (let i = 0; i < res.data.length; i++) {
    departments.push({ id: i, value: res.data[i] })
  }
})

watch(props, (newval, oldval) => {
  dialogFormVisible.value = true
})

function cancel() {
  dialogFormVisible.value = false
}

function confirm() {
  if (admin.admin_id != '' && admin.admin_name != '' && admin.dept_name != '' && admin.password != '') {
    insertAdmin(admin).then((res) => {
      if (res.data != '添加成功') {
        alert('老师信息错误或已成为管理员')
      } else {
        router.go(0)
      }
    })
  } else {
    alert('输入不能为空')
  }
}
</script>
<style scoped></style>
