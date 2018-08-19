<template>
  <div class="person" v-loading.fullscreen.lock="loading" :element-loading-text="content.loading.text"
       :element-loading-spinner="content.loading.icon">
    <el-select v-model="value" :placeholder="placeholder" @change="handleChange">
      <el-option
        v-for="item in abnormal.realTime"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <div v-if="abnormal.timeRecord[value]">
      <h3 class="charts-title">{{chartsTitle}}</h3>
      <div class="charts-content">
        <v-bar
          :charts="abnormal.timeRecord[value]"
          :columns="columns"
          :setting="chartSettings"
        />
      </div>
      <h3 class="charts-title">{{tableTitle}}</h3>
      <div class="table-content">
        <el-table
          :data="abnormal.timeRecord[value]"
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
    <div v-if="!abnormal.timeRecord[value]"><v-dog /></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {content, placeholder} from '../../config/text'
  import {EXCELLENT, GOOD, QUALIFED, LOADING, config} from '../../config'
  import VBar from '../../components/charts/bar'
  import VDog from '../../components/dog'

  export default {
    components: {
      VDog,
      VBar
    },
    name: 'analysis',
    data() {
      return {
        ...config.daily,
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
        return (this.value || '') + " " + (this.date || '') + ' 统计图表'
      },
      tableTitle: function () {
        return (this.value || '') + " " + (this.date || '') + ' 统计表格'
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
      this.value = this.abnormal.time[0] || ''
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
  .person {

  }

</style>
