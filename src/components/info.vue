<template lang="pug">
  .info
    .avatar
      img(:src="url")
    ul.users-list
      li.users-item.title {{name}}： {{info.username}}
      li.users-item.email {{email}}：{{info.email}}
    div.edit-button
      el-button(@click="dialogFormVisible = true") {{edit}}
    el-dialog(:title="update", :visible.sync="dialogFormVisible")
      el-form(:model="profile", ref="profile", :rules="rules")
        <!--el-form-item(:label="label.oldName", prop="username")-->
          <!--el-input(v-model="profile.username", :placeholder="placeholder.username" disabled=true)-->
        el-form-item(:label="label.oldPass", prop="password")
          el-input(type="password", v-model="profile.password", :placeholder="placeholder.password", auto-complete="on")
        el-form-item(:label="label.newName", prop="newusername")
          el-input(v-model="profile.newusername", :placeholder="placeholder.username")
        el-form-item(:label="label.newPass", prop="newpass")
          el-input(type="password", v-model="profile.newpass", :placeholder="placeholder.password", auto-complete="on")
      .dialog-footer(slot="footer")
        el-button(@click="handleCancel") 取 消
        el-button(type="primary",  @click="submitForm('profile')") 确 定
</template>

<script>
  import {validator, message, content, placeholder, label} from '../config/text'
  import {mapActions} from 'vuex'

  export default {
    name: 'info',
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        ...content.profile,
        placeholder: placeholder,
        label: label,
        message: message,
        formLayout: [
          {label: '原用户名', type: 'text', model: 'username', prop: 'username'},
          {label: '原密码', type: 'password', model: 'password', prop: 'password'},
          {label: '新用户名', type: 'text', model: 'newusername', prop: 'newusername'},
          {label: '新密码', type: 'password', model: 'newpass', prop: 'newpass'},
        ],
        url: 'https://avatars3.githubusercontent.com/u/18366474?s=400&u=9d001b5e917bfdeeb99c66051ffe9d6c827797ae&v=4',
        dialogFormVisible: false,
        profile: {
          username: this.info.username,
          password: '',
          newusername: '',
          newpass: ''
        },
        formLabelWidth: '120px',
        rules: {
          username: [
            {required: true, message: validator.username, trigger: 'blur'},
          ],
          password: [
            {required: true, message: validator.password, trigger: 'blur'},
            {min: 6, message: validator.shortPass, trigger: 'blur'},
            {max: 20, message: validator.longPass, trigger: 'blur'}
          ],
          newusername: [
            {required: true, message: validator.username, trigger: 'blur'},
          ],
          newpass: [
            {required: true, message: validator.password, trigger: 'blur'},
            {min: 6, message: validator.shortPass, trigger: 'blur'},
            {max: 20, message: validator.longPass, trigger: 'blur'}
          ],
        },
      }
    },
    watch: {
      profile: function () {
        this.profile.username = this.info.username
      }
    },
    methods: {
      ...mapActions([
        'updateInfoAction',
        'infoAction',
      ]),

      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const opt = Object.assign({},this.profile,{username:this.info.username})
            this.updateInfoAction(opt).then(async () => {
              this.dialogFormVisible = false
            }).then(() => {
              for (let i in this.profile) {
                if (i === 'username') continue
                this.profile[i] = ''
              }
              this.infoAction(this.info.id)
            })
          } else {
            this.dialogFormVisible = true
          }
        })

      },
      handleCancel() {
        for (let i in this.profile) {
          if (i === 'username') continue
          this.profile[i] = ''
        }
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .info {
    display flex
    .avatar {
      flex 0 0 160px
      /*margin 0 auto*/
      width 150px
      height 150px
      img {
        max-width 150px
      }
    }
    .users-list {
      display flex
      flex-direction column
      flex 0 0 400px
      padding 0
      text-align left
      .users-item {
        list-style none
        flex 1
        line-height 75px
      }
      .title {
        font-size 1.3em
      }
      .email {
        font-size 1.2em
      }
    }
    .edit-button {
      flex 1
      display flex
      flex-direction column-reverse
      margin 30px auto
    }
  }
</style>
