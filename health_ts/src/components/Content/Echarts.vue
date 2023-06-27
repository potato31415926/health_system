<template>
  <div :id="props.id" class="w-[400px] h-[400px]"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, watch } from 'vue'

const props = defineProps({
  text: { required: true },
  id: { default: '' },
  data: { required: true },
  name: { required: true }
})

var option: any
var myChart: any
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById(props.id)!)
  // 绘制图表
  option = {
    color: ['#3CB371', '#FF4500', '#FFD700'],
    title: {
      text: props.text,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: props.name
    },
    series: [
      {
        name: '数据',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  myChart.setOption(option)
})
watch(props, (newval, oldval) => {
  myChart.setOption(option)
})
</script>

<style lang="scss" scoped></style>
