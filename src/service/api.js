import {baseUrl} from '../config/index'

const ApiMaker = (path) => {
  return `${baseUrl}/${path}`
}
export default {
  host: ApiMaker(''),
  // users
  login: ApiMaker('user/login'),
  register: ApiMaker('user/reg'),
  forget: ApiMaker('user/findchange'),
  send: ApiMaker('user/findsend'),
  info: ApiMaker('user/profile'),
  password: ApiMaker('update/password'),
  captcha: ApiMaker('captcha'),
  logout: ApiMaker('logout'),
  // mock
  del: ApiMaker('del'),
  test: ApiMaker('test')
}
