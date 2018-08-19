<template lang="pug">
  ve-bar(:data="chartData", :settings="chartSettings", :mark-line="markLine",
  :mark-area="markArea", :height="height")
</template>
<script>
  export default {
    name: 'v-bar',
    props: {
      height: {
        type: String,
        default: "700px",
        required: false
      },
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
