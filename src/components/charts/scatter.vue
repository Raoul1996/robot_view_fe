<template lang="pug">
  ve-scatter(:data="chartData", :settings="chartSettings", :events="chartEvents", :extend="extend", :tooltip-visible="true", :legend-visible="false")
</template>
<script>
  export default {
    name: 'v-scatter',
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
      extend: {
        type:[Object,Array]
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
  }
</script>

<style scoped>

</style>
