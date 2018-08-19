<template lang="pug">
  .profile
    .card-border
      info.info-card(:info="info")
    .card-border
      excel
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapState} from 'vuex'
  import Info from '../components/info'
  import Excel from './excel'

  export default {
    components: {
      Info,
      Excel,
    },
    name: 'profile',
    data() {
      return {
        users: {
          id: '',
          name: '',
          email: '',
          mobile: ''
        }
      }
    },
    computed: mapState([
      'info',
      'updateInfo'
    ]),
    created() {
      this.getUserMsg()
    },
    methods: {
      ...mapActions([
        'infoAction',
        'updateInfoAction'
      ]),
      getUserMsg() {
        // 这里的参数留着以后用
        this.infoAction(this.info.id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .profile {
    margin 20px auto
    width 800px
  }
</style>
