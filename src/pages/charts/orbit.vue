<template>
  <div>
    <v-muti-scatter :options="scatter"></v-muti-scatter>
  </div>

</template>

<script>
  import VMutiScatter from '../../components/charts/muti-scatter'

  export default {
    name: 'orbit',
    components: { VMutiScatter },
    data() {
      return {
        scatter: {
          title: {
            text: 'robot 运行轨迹'
          },
          xAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            scale: true
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
        }
      }
    }
  }
</script>

<style scoped>

</style>
