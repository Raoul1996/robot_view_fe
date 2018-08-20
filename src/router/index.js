import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/pages/Hello'
import store from '../store'
// 配置路由懒加载
const Login = () => import(/* webpackChunkName: "user" */ 'pages/login.vue')
const Register = () => import(/* webpackChunkName: "user" */ 'pages/register.vue')
const profile = () => import(/* webpackChunkName: "user" */ 'pages/profile.vue')
const Update = () => import(/* webpackChunkName: "user" */ 'pages/update.vue')
const Forget = () => import(/* webpackChunkName: "user" */ 'pages/forget.vue')
const Excel = () => import(/* webpackChunkName: "analysis" */ 'pages/excel.vue')
const Analysis = () => import(/* webpackChunkName: "analysis" */ 'pages/analysis.vue')
const All = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/all.vue')
const Person = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/person.vue')
const Level = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/level.vue')
const Daily = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/daily.vue')
const Every = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/every.vue')
const Abnormal = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/abnormal.vue')
const Orbit = () => import(/* webpackChunkName: "analysis" */ 'pages/charts/orbit.vue')
Vue.use(Router)
/**
 * @param requireAuth: 是否需要在登录之后才能进
 */
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/excel',
      name: 'excel',
      meta: {
        requireAuth: true
      },
      component: Excel
    }, {
      path: '/analysis',
      meta: {
        requireAuth: true
      },
      component: Analysis,
      children: [
        {
          path: 'all', meta: {
            requireAuth: true
          }, component: All
        },
        {
          path: 'person', meta: {
            requireAuth: true
          }, component: Abnormal
        },
        {
          path: 'level', meta: {
            requireAuth: true
          }, component: Level
        },
        {
          path: 'daily', meta: {
            requireAuth: true
          }, component: Daily
        },
        {
          path: 'every', meta: {
            requireAuth: true
          }, component: Every
        },
        {
          path: 'abnormal', meta: {
            requireAuth: true
          }, component: Person
        },
        {
          path: 'orbit', meta: {
            requireAuth: true
          }, component: Orbit
        }
      ]
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        requireAuth: true
      },
      component: profile
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        requireAuth: false
      },
      component: Register
    },
    {
      path: '/update',
      name: 'update',
      meta: {
        requireAuth: true
      },
      component: Update
    },
    {
      path: '/forget',
      name: 'Forget',
      meta: {
        requireAuth: false
      },
      component: Forget
    },
    {
      path: '*',
      name: '404',
      component: () => import('pages/404.vue')
    }
  ]
})
router.beforeResolve((to, from, next) => {
  // 判断该路由是否需要登录权限
  next()
  // if (to.meta.requireAuth) {
  //   // 通过vuex state获取当前是否登录
  //   if (store.state.login) {
  //     next()
  //   } else {
  //     next({
  //       path: '/login',
  //       // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //       query: {redirect: to.fullPath}
  //     })
  //   }
  // } else {
  //   next()
  // }
})
// router.go({
//   path: '/vote/doing',
//   force: true
// })
export default router
