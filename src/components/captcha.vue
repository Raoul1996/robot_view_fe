<template lang="pug">
  div.captcha(@click="getCaptchaUrl")
    img(:src='captchaUrl', alt="captcha", :flag="new Date().getTime()")
</template>

<script>
  import {baseUrl} from 'src/config/env'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'captcha',
    data() {
      return {
        captchaUrl: '',
      }
    },
    computed: {
      ...mapState(['flag'])
    },
    watch: {
      flag: function () {
        this.getCaptchaUrl()
      }
    },
    created() {
      this.getCaptchaUrl()
    },
    methods: {
      ...mapMutations(['FLAG']),
      getCaptchaUrl() {
        this.captchaUrl = `${baseUrl}/captcha?timestamp=${this.flag + new Date().getTime()}`
      }
    }
  }
</script>

<style scoped>
  .captcha {
    height: 40px;
  }

  .captcha img {
    width: 100%;
    height: 100%;
  }
</style>
