<template>
  <div class="all" v-loading.fullscreen.lock="loading" :element-loading-text="content.loading.text"
       :element-loading-spinner="content.loading.icon">
    <h3 class="charts-title">{{content.all.chartsTitle}}</h3>
    <div class="charts-content">
      <histogram
        :charts="attend.record"
        :columns="columns"
        :setting="chartSettings"
        :markLine="markLine"
        :markArea="markArea"
      />
    </div>
    <h3 class="charts-title">{{content.all.tableTitle}}</h3>
    <div class="table-content">
      <el-table
        :data="attend.record"
        style="width: 100%"
        :stripe="false"
        :border="border"
        :default-sort="defaultSort"
        :row-class-name="tableRowClassName">
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
  import {EXCELLENT, GOOD, QUALIFED, LOADING, config} from '../../config'

  export default {
    components: {Histogram},
    name: 'analysis',
    data() {
      return {
        ...config.all,
        loading: true,
        content: content.analysis,
        border: true,
        type: this.$route.params.id,
        file: localStorage.getItem('file') || ''
      }
    },
    computed: {
      ...mapState(['attend'])
    },
    created() {
      // this.getAttendAction({filename: this.file})
    },
    mounted() {
      setTimeout(() => {
        this.loading = false
      }, LOADING)
    },
    destroyed() {
    },
    methods: {
      // ...mapActions([
      //   'getAttendAction'
      // ]),
      tableRowClassName({row}) {
        const grade = row['成绩']
        if (grade >= EXCELLENT) {
          return 'success-row'
        } else if (grade >= GOOD) {
          return 'success-row'
        } else if (grade >= QUALIFED) {
          return 'success-row'
        } else {
          return 'warning-row'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .all {

  }

</style>
