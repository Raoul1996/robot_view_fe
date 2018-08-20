<template>
  <figure>
    <chart
      :options="options"
      :init-options="initOptions"
      auto-resize
    />
  </figure>
</template>

<script>
  import qs from 'qs'
  import ECharts from '../ECharts.vue'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/chart/effectScatter'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/geo'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/dataset'

  import 'echarts-liquidfill'

  // built-in theme
  import 'echarts/theme/dark'

  // custom theme
  import theme from '../../data/theme.json'

  // registering custom theme
  ECharts.registerTheme('ovilia-green', theme)

  export default {
    name:'muti-scatter',
    props: {
      options: {
        type:[Object,Array],
        required:true
      }
    },
    components: {
      chart: ECharts
    },
    data() {
      let options = qs.parse(location.search, { ignoreQueryPrefix: true })
      return {
        options,
        initOptions: {
          renderer: 'canvas'
        },
        seconds: -1,
        asyncCount: false,
        metricIndex: 0,
        open: false,
        img: {}
      }
    }
  }
</script>

