import {
  userLogin,
  getUser,
  postUser,
  userRegister,
  forgetPassword,
  sendMail,
  resetPassword
} from '../service/request'
import {
  USER_LOGIN,
  USER_INFO,
  USER_TOKEN,
  USER_FORGET,
  SEND_MAIL,
  LOGOUT,
  RESET_PASS,
  UPDATE_INFO
} from './mutation-types'

export default {
  async infoAction({commit, state}, data) {
    let res = await getUser(data)
    commit(USER_INFO, res.data)
  },
  async updateInfoAction({commit,state},data){
    let res = await postUser(data)
    commit(UPDATE_INFO,res)
  },
  async loginAction({commit, state}, data) {
    const res = await userLogin(data)
    if (res && res.data && res.data.token) {
      window.localStorage.setItem('token', res.data.token)
      commit(USER_TOKEN, res.token)
    }
    commit(USER_LOGIN, true)
    commit(USER_INFO, res)
  },
  async registerAction({commit, state}, data) {
    const res = await userRegister(data)
    commit(USER_INFO, res)
  },
  async forgetAction({commit, state}, data) {
    const bool = await forgetPassword(data)
    commit(USER_FORGET, bool)
    commit(LOGOUT)
  },
  async sendAction({commit, state}, data) {
    const bool = await sendMail(data)
    commit(SEND_MAIL, bool.msg)
    commit(LOGOUT)
  },
  async resetPasswordAction({commit, state}, data) {
    const bool = await resetPassword(data)
    commit(RESET_PASS, bool)
  },
}
