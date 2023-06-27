<template>
  <div>
    <el-dialog width="400" v-model="dialogFormVisible" title="新增用户">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="身份证" label-width="100">
          <el-input v-model="form.person_id" disabled />
        </el-form-item>
        <el-form-item label="学工号" label-width="100">
          <el-input v-model="form.user_id" disabled />
        </el-form-item>
        <el-form-item label="姓名" label-width="100">
          <el-input v-model="form.user_name" disabled />
        </el-form-item>
        <el-form-item label="学院" label-width="100">
          <el-select
            v-model="form.department"
            placeholder="未选择"
            @change="Init(0, form.department)">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" label-width="100" v-if="isVisible">
          <el-select
            v-model="form.major"
            placeholder="未选择"
            @change="Init(1, form.major)">
            <el-option
              v-for="item in majors"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" label-width="100" v-if="isVisible">
          <el-select v-model="form.classes" placeholder="未选择">
            <el-option
              v-for="item in classes"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="健康码颜色" label-width="100">
          <el-radio-group v-model="form.health_code_color">
            <el-radio :label="1">绿</el-radio>
            <el-radio :label="2">红</el-radio>
            <el-radio :label="3">黄</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否打卡" label-width="100">
          <el-radio-group v-model="form.is_punch">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否注射疫苗" label-width="100">
          <el-radio-group v-model="form.is_injected">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="打卡天数" label-width="100">
          <el-input v-model="form.punch_days" />
        </el-form-item>
        <el-form-item label="手机号" label-width="100" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form>
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
import { queryDepartments, queryMajors, queryClasses } from '@/api/query'
import { editUser } from '@/api/update'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router/index'

const props = defineProps({
  id: { required: true },
  userInfo: { required: true }
})

const formRef = ref<FormInstance>()

const form = ref<any>()

const rules = <FormRules>{
  phone: [{ required: true, trigger: 'blur', message: '手机号必填' }]
}

const isVisible = ref(true)

const dialogFormVisible = ref(false)

watch(props, (newval, oldval) => {
  dialogFormVisible.value = true
  form.value = props.userInfo
  if (form.value.role == '学生') {
    isVisible.value = true
  } else {
    isVisible.value = false
  }
  if (typeof form.value.is_punch != 'number') {
    form.value.health_code_color =
      form.value.health_code_color == '绿'
        ? 1
        : form.value.health_code_color == '红'
        ? 2
        : 3
    form.value.is_injected = form.value.is_injected == '是' ? 1 : 2
    form.value.is_punch = form.value.is_punch == '是' ? 1 : 2
  }
})

const departments = reactive<any>([])
const majors = reactive<any>([])
const classes = reactive<any>([])

// 访问接口
queryDepartments().then((res) => {
  for (let i = 0; i < res.data.length; i++) {
    departments.push({ id: i, value: res.data[i] })
  }
})

// 初始化majors和classes的函数
function Init(id: number, val: any) {
  if (id === 0) {
    //学院改变，获取专业信息
    //清空majors和classes
    majors.length = 0
    classes.length = 0
    //清空major和class
    form.value.major = ''
    form.value.classes = ''
    queryMajors(val).then((res) => {
      if (res.data !== '\r\n') {
        for (let i = 0; i < res.data.length; i++) {
          majors.push({ id: i, label: res.data[i], value: res.data[i] })
        }
      }
    })
  } else if (id === 1) {
    //专业改变，获取班级信息
    //清空classes
    classes.length = 0
    //清空class
    form.value.classes = ''
    queryClasses(val).then((res) => {
      if (res.data != '') {
        for (let i = 0; i < res.data.length; i++) {
          classes.push({ id: i, label: res.data[i], value: res.data[i] })
        }
      }
    })
  }
}

function cancel() {
  dialogFormVisible.value = false
}

// 1学生 2老师
// 1绿 2红 3黄
// 1是 2否
function confirm() {
  formRef.value!.validate((valid, errObj) => {
    if (valid) {
      form.value.health_code_color =
        form.value.health_code_color === 1
          ? '绿'
          : form.value.health_code_color === 2
          ? '红'
          : '黄'
      form.value.is_injected = form.value.is_injected === 1 ? '是' : '否'
      form.value.is_punch = form.value.is_punch === 1 ? '是' : '否'
      editUser(form.value).then((res) => {
        console.log(res)
      })
      router.go(0)
    } else {
      alert('有必填信息未填写')
    }
  })
}
</script>
<style scoped></style>
