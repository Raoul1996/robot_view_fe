import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
  login: false, // 登录状态
  info: {}, // 用户信息
  updateInfo: false,
  reset: false, // 是否重置密码
  token: null, // jwt token
  excel: {},
  file: '', // 上传的文件的名称
  name: [], // 可选姓名列表
  abnormal: {},
  message: {},
  attend: {},
  log: {},
  mail: false,
  flag: null
}
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
  state,
  // getters,
  actions,
  mutations,
  plugins: [vuexLocal.plugin]
})
export default store
