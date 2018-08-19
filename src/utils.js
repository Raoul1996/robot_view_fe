'use strict'
import _ from 'lodash'

/**
 * 延时函数
 * @param ms 延时时间（分钟）
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
    // console.log(`sleep ${ms / 1000}s`)
  })
}

/**
 * 拼接 url
 * @param url
 * @param params
 * @returns {*}
 */
export function params2url(url, params) {
  if (params) {
    if (typeof params === 'object') {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          url = url + '/' + params[key]
        }
      })
    } else {
      url = url + '/' + params
    }
  }
  return url
}

/**
 * 拼接 url 函数
 * @param url 传入的 base Url
 * @param query 传入的query
 * @returns {*}
 */
export function query2url(url, query) {
  let dataStr = '' // 数据拼接字符串
  if (query) {
    Object.keys(query).forEach(key => {
      dataStr += key + '=' + query[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  return url
}

/**
 * 路由跳转
 * @param that 传入的this
 * @param path 需要跳转的路由地址
 * @param fix 如果路由地址前面不是 '/'，是否添加
 */
export function goto(that, path, fix = true) {
  // 修复不是绝对地址的情况，需要根据 fix 的值进行判断
  if (path[0] !== '/' && fix) {
    let pathArr = path.split('')
    pathArr.unshift('/')
    path = pathArr.join('')
  }
  that.$router.push(path)
}

/**
 * 延时跳转函数
 * @param that 传入的 this
 * @param path 跳转的路由地址
 * @param ms 延时时间（分钟）
 * @returns {Promise.<void>}
 */
export async function lazyGoto(that, path, ms = 1000) {
  await sleep(ms)
  goto(that, path)
}

export function calcMin(start, end) {
  try {
    const hourS = start.split(':')[0]
    const minS = start.split(':')[1]
    const hourN = end.split(':')[0]
    const minN = end.split(':')[1]
    return +(hourN - hourS) * 60 + +(minN - minS)
  } catch (e) {
    return 0
  }
}

export function calcTime(args) {
  const [startM, endM, startN, endN] = [...args]
  const data = args.filter(item => item)
  let res = {'工作时间（分钟）': 0}
  if (data.length === 4) {
    res['工作时间（分钟）'] = calcMin(startM, endM) + calcMin(startN, endN)
  } else {
    if (startM && endM) {
      res['工作时间（分钟）'] = calcMin(startM, endM)
    }
    if (startN && endN) {
      res['工作时间（分钟）'] = calcMin(startN, endN)
    }
  }
  return res
}

export function formatArray(array) {
  const uni = _.uniq(array, true)
  const startM = uni.filter(item => {
    return item < '11:00'
  }).reverse()[0] || undefined
  const endM = uni.filter(item => {
    return item < '14:00' && item >= '11:00'
  }).reverse()[0] || undefined
  const startN = uni.filter(item => {
    return item > '14:00' && item <= '17:00'
  }).reverse()[0] || undefined
  const endN = uni.filter(item => {
    return item > '17:00'
  }).reverse()[0] || undefined
  return [startM, endM, startN, endN]
}
