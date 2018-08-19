/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 */
const productionUrl = 'http://attendbe.com'
const developmentUrl = 'http://attendbe.com'
const unKnowUrl = 'http://attendbe.com'
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = developmentUrl
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = productionUrl
} else {
  baseUrl = unKnowUrl
}

export {
  baseUrl
}
