<template>
  <div class="person" v-loading.fullscreen.lock="loading" :element-loading-text="content.loading.text"
       :element-loading-spinner="content.loading.icon">
    <el-select v-model="value" :placeholder="placeholder" @change="handleChange">
      <el-option
        v-for="item in abnormal.name"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <h3 class="charts-title">{{chartsTitle}}</h3>
    <div class="charts-content">
      <v-histogram
        :charts="abnormal.nameRecord[value]"
        :columns="columns"
        :setting="chartSettings"
      />
    </div>
    <h3 class="charts-title">{{tableTitle}}</h3>
    <div class="table-content">
      <el-table
        :data="abnormal.nameRecord[value]"
        style="width: 100%"
        :stripe="true"
        :border="border"
        :default-sort="defaultSort"
      >
        <el-table-column v-for="item in tableConfig" :prop="item.prop" :label="item.label" :key="item.prop"
                         :sortable="item.sortable" />
      </el-table>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {content, placeholder} from '../../config/text'
  import VLine from '../../components/charts/line'
  import {EXCELLENT, GOOD, QUALIFED, LOADING, config} from '../../config'
  import VPie from '../../components/charts/pie'
  import VHistogram from '../../components/charts/histogram'

  export default {
    components: {
      VHistogram,
      VPie,
      VLine},
    name: 'analysis',
    data() {
      return {
        ...config.person,
        placeholder: placeholder.select,
        value: '',
        date: '',
        loading: true,
        content: content.analysis,
        navigator: content.analysis.navigator,
        border: true,
        type: this.$route.params.id,
        file: localStorage.getItem('file') || ''
      }
    },
    computed: {
      ...mapState(['abnormal']),
      chartsTitle: function () {
        return (this.value || '') + " " + (this.date || '') + ' 异常考勤图表'
      },
      tableTitle: function () {
        return (this.value || '') + " " + (this.date || '') + ' 异常考勤表格'
      }
    },
    created() {
      this.value = this.abnormal.name[0] || ''
    },
    watch: {
      loading: function (oldVal, newVal) {
        setTimeout(() => {
          if (oldVal) {
            this.loading = false
          }
        }, LOADING)
      }
    },
    mounted() {
      this.value = this.abnormal.name[0] || ''
      this.date = ''
      setTimeout(() => {
        this.loading = false
      }, LOADING)
    },
    destroyed() {
    },
    methods: {
      handleChange(e) {
        this.loading = true
      },
      tableRowClassName({row}) {
        const {grade} = row
        if (grade >= EXCELLENT) {
          return 'success-row'
        } else if (grade >= GOOD) {
          return 'success-row'
        } else if (grade >= QUALIFED) {
          return ''
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
