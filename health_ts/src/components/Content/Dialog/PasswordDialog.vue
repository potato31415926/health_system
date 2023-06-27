<template>
  <div>
    <el-dialog width="400" v-model="dialogFormVisible" title="修改密码">
      <el-form-item label="新密码" label-width="100" prop="phone">
        <el-input v-model="props.adminInfo.password" />
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
import { ref, watch } from 'vue'
import { changePassword } from '@/api/update'
import router from '@/router'

const props: any = defineProps({
  id: { required: true, type: Number },
  adminInfo: { required: true }
})

const dialogFormVisible = ref(false)

watch(props, (newval, oldval) => {
  dialogFormVisible.value = true
})

function cancel() {
  dialogFormVisible.value = false
}

function confirm() {
  changePassword(props.adminInfo.user_id, props.adminInfo.password).then((res) => {})
  router.go(0)
}
</script>
<style scoped></style>
