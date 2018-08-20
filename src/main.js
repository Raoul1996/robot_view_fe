// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { routerMode } from './config/env'
import VCharts from 'v-charts'
import ECharts from 'vue-echarts/components/ECharts'
import store from './store'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/tooltip'
// import './config/rem'
import {
  Button,
  Select,
  Dialog,
  Form,
  FormItem,
  Upload,
  Input,
  Menu,
  MenuItem,
  Submenu,
  Option,
  Table,
  TableColumn,
  Container,
  Aside,
  Header,
  Main,
  MenuItemGroup,
  MessageBox,
  Message,
  Loading,
  Notification
} from 'element-ui'

Vue.use(VCharts)
Vue.config.productionTip = false
Vue.use(Dialog)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(MenuItemGroup)
Vue.use(Header)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Submenu)
Vue.use(Loading)
Vue.prototype.$store = store
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
/* eslint-disable no-new */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.component('chart', ECharts)
