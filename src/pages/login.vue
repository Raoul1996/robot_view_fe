<template lang="pug">
  .login-bg
    .login.card-border
      img.avatar(src="../assets/avatar.png")
      h1.title {{content.title}}
      el-form(:model="login", ref="login", :rules="rules")
        el-form-item(:label="label.username", prop="username")
          el-input(v-model="login.username", :placeholder="placeholder.username")
        el-form-item(:label="label.password", prop="password")
          el-input(@keyup.native.enter="submitForm('login')", type="password", v-model="login.password", :placeholder="placeholder.password", auto-complete="on")
        el-form-item(:label="label.captcha", prop="captcha")
          div.captcha-wrapper
            el-input.captcha-input(v-model="login.captcha", :placeholder="placeholder.captcha", type="text", )
            captcha.captcha(:flag="flag")
        el-form-item
          router-link.forget(to="forget") {{content.forget}}
        el-form-item
          el-button.login-button(type="primary", size="middle", @click="submitForm('login')")
            | {{content.submit}}
      .register-form
        router-link.register(to="register")
          | {{content.register}}
</template>

<script type="text/ecmascript-6">
  import {lazyGoto} from 'src/utils'
  import {mapActions, mapMutations} from 'vuex'
  import Captcha from '../components/captcha'
  import {validator, message, content, placeholder, label} from '../config/text'

  export default {
    components: {Captcha},
    name: 'login',
    data() {
      return {
        content: content.login,
        placeholder,
        label,
        flag: null,
        login: {
          // email: '',
          username: null,
          password: null,
          captcha: ''
        },
        rules: {
          username: [
            {required: true, message: validator.username, trigger: 'blur'},
          ],
          password: [
            {required: true, message: validator.password, trigger: 'blur'},
            {min: 6, message: validator.shortPass, trigger: 'blur'},
            {max: 20, message: validator.longPass, trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: validator.captcha, trigger: 'blur'}
          ]
        },
        msgFlag: true
      }
    },
    watch: {
      email: function (val, oldValue) {
        // console.log(val)
        // console.log(oldValue)
      }
    },
    methods: {
      ...mapActions([
        'loginAction'
      ]),
      ...mapMutations(['FLAG']),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.login
            this.loginAction(opt).then(async () => {
              this.$message(message.success.login)
              await lazyGoto(this, '/profile')
            })
          } else {
            this.$message(message.error.submitError)
            this.flag = new Date().getTime()
            this.FLAG(this.flag)
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login-bg {
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background url("../assets/bg.jpg") no-repeat
    background-size cover
    .login {
      position relative
      margin 12% 0 0 64%
      width 320px
      background rgba(255, 255, 255, .9)
      .title {
        margin 0
        padding 0
      }
      .avatar {
        position absolute
        left 252px
        top -186px
        z-index 4
      }
      .captcha-wrapper {
        position relative
        padding-right 40%
        text-align left
        .captcha-input {
          width 90%
        }
        .captcha {
          position absolute
          right 0
          bottom 1px
          height 38px
          width 40%
        }
      }
      .forget {
        margin-top -1em
        margin-bottom -1em
        float right
      }
      .login-button {
        width 100%
      }
      .forget, .register {
        text-decoration none
        color #1c8de0
        font-size 1em
      }
      .register-form {
        padding 10px 50px
      }
    }
  }

  @media screen and (max-width: 1300px) {
    .avatar {
      display none
    }

    .login {
      margin 0 auto !important
    }
  }
</style>
