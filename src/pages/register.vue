<template lang="pug">
  .register-bg
    .register
      h1.title {{content.title}}
      el-form.card-border(v-bind:model="register", v-bind:rules="rules", ref="register")
        el-form-item(:label="label.username", prop="username")
          el-input(v-model="register.username", :placeholder="placeholder.username")
        el-form-item(:label="label.email", prop="email")
          el-input(v-model="register.email", :placeholder="placeholder.email")
        <!--el-form-item(:label="label.mobile", prop="mobile")-->
          <!--el-input(v-model="register.mobile", :placeholder="placeholder.mobile")-->
        el-form-item(:label="label.password", prop="password")
          el-input(type="password", v-model="register.password", auto-complete="off", :placeholder="placeholder.password")
        el-form-item(:label="label.confirm", prop="checkPassword")
          el-input(type="password", @keyup.native.enter="submitForm('register')", v-model="register.checkPassword", auto-complete="off", :placeholder="placeholder.confirm")
        el-form-item
          el-button.register-button(size="middle", type="primary", @click="submitForm('register')")
            | {{content.submit}}
</template>
<script type="text/ecmascript-6">
  import {lazyGoto} from '../utils'
  import {mapActions} from 'vuex'
  import {validator, content, message,label,placeholder} from '../config/text'

  export default {
    username: 'register',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value !== this.register.password) {
          callback(new Error(validator.confirmError))
        } else {
          callback()
        }
      }
      return {
        content: content.register,
        label,
        placeholder,
        register: {
          username: '',
          // mobile: '',
          email: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          username: [
            {required: true, message: validator.username, trigger: 'blur'}
          ],
          email: [
            {required: true, message: validator.email, trigger: 'blur'},
            {type: 'email', message: validator.emailError, trigger: 'blur'}
          ],
          // mobile: [
          //   {required: true, message: validator.mobile, trigger: 'blur'},
          //   {len: 11, message: validator.mobileError, trigger: 'blur'}
          // ],
          password: [
            {required: true, message: validator.password, trigger: 'blur'},
            {min: 6, message: validator.shortPass, trigger: 'blur'},
            {max: 20, message: validator.longPass, trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: validator.confirm, trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'registerAction'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.register
            this.registerAction(opt).then(async () => {
              this.$message(message.success.register)
              await lazyGoto(this, 'login')
            })
          } else {
            this.$message(message.error.submitError)
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .register-bg {
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background url("../assets/bg.jpg") no-repeat
    background-size cover
    .register {
      width 30%
      min-width 400px
      border-radius 6px
      background rgba(255, 255, 255, .9)
      margin 50px auto
      .title {
        margin 0
        padding-top 10px
      }
      .card-border {
        margin-top 0
        border none
      }
      .register-button {
        margin-top 20px
        width 100%
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .avatar{
      display none
    }
    .register {
      margin 0 auto !important
    }
  }
</style>
