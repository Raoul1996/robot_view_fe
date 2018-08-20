<template>
  <div>
    <v-scatter :columns="columns" :charts="rows" :setting="setting" :extend="extend"></v-scatter>
  </div>
</template>

<script>
  import VScatter from '../../components/charts/scatter'

  export default {
    name: 'orbit',
    components: { VScatter },
    data() {
      return {
        setting:{
          metrics: ['x','y'],
          // 横轴
          dimension: ['t'],
        },
        extend: {
          xAxis: {
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: true
            },
          },
          yAxis: {
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: true
            }
          },
          series: [{
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
          }]
        },
        columns: ['x', 'y'],
        rows: [
          { t: 1, x: 1, y: 2 },
          { t: 2, x: 1.05, y: 2.1 },
          { t: 3, x: 1.05, y: 2.2 },
          { t: 4, x: 1.1, y: 2.3 },
          { t: 5, x: 1.3, y: 2.2 },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
