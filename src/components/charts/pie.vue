<template lang="pug">
  ve-pie(:data="chartData", :settings="chartSettings", :events="chartEvents")
</template>
<script>
  export default {
    name: 'v-pie',
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
      }
    },
    data() {
      return {
        chartData: {
          columns: this.columns,
          rows: this.charts
        },
        chartSettings: this.setting,
        chartEvents: {
          click: (e) => {
            this.$emit('handleChange', e)
          }
        }
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
