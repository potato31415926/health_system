<template>
  <div class="flex p-1">
    <span class="font-bold px-2">{{ props.property }}：</span>
    <span class="flex-1 text-center">{{ props.value }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  property: { required: true },
  value: { required: true }
})
</script>

<style scoped></style>
