<template>
  <el-table
    ref="multipleTableRef"
    @selection-change="handleSelectionChange"
    :data="tableData.slice((pageInfo.currentPage - 1) * pageInfo.pageSize, pageInfo.currentPage * pageInfo.pageSize)"
    style="width: 100%"
    :key="random.id"
    stripe>
    <el-table-column type="selection" fixed width="55" />
    <el-table-column label="身份证号" prop="person_id" min-width="120px" />
    <el-table-column label="学/工号" prop="user_id" min-width="120px" />
    <el-table-column label="姓名" prop="user_name" min-width="100px" />
    <el-table-column label="学院" prop="department" min-width="120px" />
    <el-table-column label="专业" prop="major" min-width="120px" />
    <el-table-column label="班级" prop="classes" min-width="120px" />
    <el-table-column label="角色" prop="role" min-width="100px" />
    <el-table-column label="健康码颜色" prop="health_code_color" min-width="100px" />
    <el-table-column label="是否打卡" prop="is_punch" />
    <el-table-column label="是否注射疫苗" prop="is_injected" min-width="120px" />
    <el-table-column label="打卡天数" prop="punch_days" />
    <el-table-column label="电话号码" prop="phone" min-width="100px" />

    <el-table-column label="操作" min-width="150px">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :page-size="pageInfo.pageSize"
    :page-count="pageInfo.pageCount"
    layout="prev,pager,next"
    :total="pageInfo.total"
    v-model:current-page="pageInfo.currentPage" />
  <EditDialog :id="id" :userInfo="userInfo" />
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { queryUsers } from '@/api/query'
import { deleteUsers } from '@/api/update'
import router from '@/router'
import { ElTable } from 'element-plus'
import { User } from '@/utils/model/user'

const emits = defineEmits(['onchange'])

const id = ref()
const userInfo = ref()

const pageInfo = reactive<any>({
  currentPage: 1,
  pageSize: 10,
  pageCount: 2,
  total: 20
})

const props: any = defineProps({
  department: {
    required: true
  },
  major: {
    required: true
  },
  classes: {
    required: true
  }
})

let random = reactive({ id: Math.random() })

EstablishTab()

watch(props, (newval, oldval) => {
  EstablishTab()
})

const handleEdit = (index: number, row: User) => {
  id.value = Math.random()
  userInfo.value = row
}

const handleDelete = (index: number, row: User) => {
  deleteUsers([row.person_id]).then((res) => {
    console.log(res)
  })
  router.go(0)
}

let tableData = reactive<User[]>([])

async function EstablishTab() {
  await queryUsers(props.department, props.major, props.classes).then((res) => {
    tableData = res.data
  })
  pageInfo.total = tableData.length
  // Math.ceil(d)向上取整
  pageInfo.pageCount = Math.ceil(pageInfo.total / pageInfo.pageSize)
  random.id = Math.random()
}

// 复选框函数
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  emits('onchange', val)
}
</script>
