<template>
  <div class="text-yellow-800 font-bold text-xl mb-6 whitespace-nowrap">>{{ props.value }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    required: true,
    type: String
  }
})
</script>

<style lang="scss" scoped></style>
