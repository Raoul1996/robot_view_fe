<template>
  <div class="all" v-loading.fullscreen.lock="loading" :element-loading-text="content.loading.text"
       :element-loading-spinner="content.loading.icon">
    <h3 class="charts-title">{{content.level.chartsTitle}}</h3>
    <div class="charts-content">
      <v-pie
        :charts="attend.status"
        :columns="columns"
        :setting="chartSettings"
        @handleChange="toggleTable"
      />
    </div>
    <h3 class="charts-title">{{content.level.tableTitle}}</h3>
    <div class="table-content">
      <el-table
        :data="level"
        style="width: 100%"
        :stripe="true"
        :border="border"
        :default-sort="defaultSort">
        <el-table-column type="index" label="序号" />
        <el-table-column v-for="item in tableConfig" :prop="item.prop" :label="item.label" :key="item.prop"
                         :sortable="item.sortable" />
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {content} from '../../config/text'
  import Histogram from '../../components/charts/histogram'
  import {LOADING, config, TIMEOUT} from '../../config'
  import VPie from '../../components/charts/pie'

  export default {
    components: {
      VPie,
      Histogram
    },
    name: 'analysis',
    data() {
      return {
        ...config.level,
        loading: true,
        content: content.analysis,
        border: true,
        level: [],
        type: this.$route.params.id,
        file: localStorage.getItem('file') || ''
      }
    },
    computed: {
      ...mapState(['attend'])
    },
    created() {
      this.level = this.attend.level
      // this.getAttendAction({filename: this.file})
    },
    watch: {
      level() {
        setTimeout(() => {
          this.level = this.attend.level
        }, TIMEOUT)
      }
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, LOADING)
    },
    destroyed() {
    },
    methods: {
      toggleTable(e) {
        const {data: {name}} = e
        this.level = this.attend.level.filter(item => {
          return item["等级"] === name
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .level {

  }

</style>
