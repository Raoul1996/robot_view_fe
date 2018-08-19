<template lang="pug">
  .forget-bg
    .forget
      h1.title {{content.title}}
      el-form.card-border(:model="forget", :rules="rules", ref="forget")
        <!--el-form-item(:label="label.mobile", prop="mobile")-->
        <!--el-input(v-model="forget.mobile", :placeholder="placeholder.mobile")-->
        el-form-item(v-if="!send", :label="label.email", prop="email")
          el-input(v-if="!send", v-model="forget.email", :placeholder="placeholder.email")
        el-form-item(v-if="send", :label="label.newPass", prop="newpassword")
          el-input(v-if="send", type="password", v-model="forget.newpassword", auto-complete="off", :placeholder="placeholder.newPass")
        el-form-item(v-if="send", :label="label.captcha", prop="findtoken")
          el-input(v-if="send", type="password", v-model="forget.findtoken", auto-complete="off", :placeholder="placeholder.captcha")
        el-form-item
          el-button.forget-button(v-if="!send" size="middle", type="warning", @click="sendMail('forget')") {{content.send}}
          el-button.forget-button(v-if="send" size="middle", type="warning", @click="submitForm('forget')") {{content.submit}}
</template>

<script type="text/ecmascript-6">
  import {lazyGoto} from '../utils'
  import {mapActions} from 'vuex'
  import {message, content, validator, label, placeholder} from '../config/text'

  export default {
    name: 'forget',
    data() {
      return {
        content: content.forget,
        label,
        placeholder,
        send: false,
        forget: {
          mobile: '',
          email: '',
          newpassword: '',
          findtoken: ''
        },
        rules: {
          mobile: [
            {required: true, message: '请填写手机号码', trigger: 'blur'},
            {len: 11, message: '请填写 11 位手机号码', trigger: 'blur'}
          ],
          email: [
            {required: true, message: validator.email, trigger: 'blur'},
            {type: "email", message: validator.emailError, trigger: 'blur'}
          ],
          newpassword: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {min: 6, message: '密码需要大于 6 位', trigger: 'blur'}
          ],
          findtoken: [
            {required: true, message: '请填写验证码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      ...mapActions(['forgetAction', 'sendAction']),
      sendMail(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.forget
            this.sendAction(opt).then(async () => {
              this.send = true
              this.$message({
                type: 'success',
                showClose: true,
                message: '发送邮件成功'
              })
            })
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: 'submit error'
            })
            return false
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = this.forget
            this.forgetAction(opt).then(async () => {
              this.$message({
                type: 'success',
                showClose: true,
                message: 'Reset Password successful'
              })
              await lazyGoto(this, 'login')
            })
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: 'submit error'
            })
            return false
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .forget-bg {
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background url("../assets/bg.jpg") no-repeat
    background-size cover
    .card-border {
      margin-top 0
      border none
    }
    .forget {
      width 30%
      border-radius 6px
      background rgba(255, 255, 255, .9)
      margin 50px auto
      min-width 400px
      .title {
        margin 0
        padding-top 10px
      }
      .forget-button {
        width 100%
      }
    }

  }

</style>
