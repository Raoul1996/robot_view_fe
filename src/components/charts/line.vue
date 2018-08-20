<template lang="pug">
  ve-line(:data="chartData", :settings="chartSettings")
</template>

<script>
  export default {
    name: 'v-line',
    props: {
      charts: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      setting: {
        type: Object,
        required: true
      },
      markLine: {
        type: Object,
        required: false
      },
      markArea: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        chartData: {
          columns: this.columns,
          rows: this.charts
        },
        chartSettings: this.setting
        // markLine: this.markLine,
        // markArea: this.markArea
        // markPoint: {
        //   data: [
        //     {
        //       name: '最大值',
        //       type: 'max'
        //     }
        //   ]
        // }
      }
    }
    // mounted() {
    //   this.chartData.rows = this.data
    // }
  }
</script>

<style scoped>

</style>
