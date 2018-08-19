<template>
  <div class="analysis">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">{{navigator.title}}</template>
            <el-menu-item-group v-for="(item, index) in navigator.group" :key="item.key" :index="''+index">
              <template slot="title">{{item.title}}</template>
              <el-menu-item v-for="(subItem,i) in item.item" :key="subItem.key" :index="''+index+i"
                            @click="handleClick(subItem)" style="cursor: pointer">{{subItem.title}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div class="header-bar">
            <span class="logo"></span>
            <span class="filename" @click="handleBack" style="cursor: pointer">{{file}}</span>
            <span class="profile-entry" @click="gotoProfile('profile')" style="cursor: pointer">个人中心</span>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {content} from '../config/text'
  import {goto} from '../utils'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'analysis',
    data() {
      return {
        loading: true,
        content: content.analysis,
        navigator: content.analysis.navigator
      }
    },
    computed: {...mapState(['file'])},
    methods: {
      ...mapMutations(['LOGOUT']),
      handleClick(item) {
        const {key} = item
        goto(this, `/analysis/${key}`)
      },
      gotoProfile(item) {
        goto(this, `${item}`)
      },
      handleBack() {
        this.$confirm('是否重新上传文件进行分析?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(async () => {
          this.LOGOUT()
          goto(this, `/excel`)
        }).catch((e) => {
          // console.log(e)
          if (e === 'cancel') {
            this.$message({
              type: 'info',
              message: '取消'
            })
          } else {
            console.error(e)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .analysis {
    min-width 800px
    .filename {
      cursor pointer
    }
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
      font-size 12px
      text-align right
      .header-bar {
        display flex
        justify-content space-between
      }
    }

    .el-aside {
      color: #333;
    }

  }

</style>
