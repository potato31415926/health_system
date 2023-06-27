<template>
  <div>
    <form
      action="http://localhost:8080/health/upload"
      method="post"
      enctype="multipart/form-data"
      class="space-y-4"
      onsubmit="importForms()">
      <input
        type="file"
        class="bg-blue-200 cursor-pointer"
        ref="choiceExcel"
        name="choiceExcel" />
      <input
        type="submit"
        @click="importForms"
        class="ml-2 bg-blue-400 w-12 h-6 rounded text-gray-200 text-center text-sm scale-125 block"
        value="导入" />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const choiceExcel = ref()

function importForms() {
  var path = choiceExcel.value.files[0].name
  if (path === '') {
    alert('请选择上传文件!')
    return false
  }
  var getSuffixOne = path.substring(path.length - 5, path.length)
  if (getSuffixOne !== '.xlsx') {
    alert('只能上传".xlsx" 文件')
    return false
  }
  return true
}
</script>

<style lang="scss" scoped></style>
