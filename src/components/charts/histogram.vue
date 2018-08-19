<template lang="pug">
  ve-histogram(:data="chartData", :settings="chartSettings", :mark-line="markLine",
  :mark-area="markArea")
</template>
<script>
  export default {
    name: 'histogram',
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
        chartSettings: this.setting,
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
    },
    watch: {
      charts() {
        this.chartData.rows = this.charts
      }
    },
    created() {
      this.chartData = {
        rows: this.charts
      }
    }
  }
</script>

<style scoped>

</style>
