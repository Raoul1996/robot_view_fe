import API from './api'
import {params2url} from '../utils'
import instance from '../config/axios'

export function userLogout(data) {
  return instance.post(API.logout, data)
}

export function getUser(param) {
  return instance.get(params2url(API.info, param))
}

export function postUser(data) {
  return instance.post(API.info, data)
}

export function forgetPassword(data) {
  return instance.post(API.forget, data)
}

export function sendMail(data) {
  return instance.post(API.send, data)
}

export function userLogin(data) {
  return instance.post(API.login, data)
}

export function userRegister(data) {
  return instance.post(API.register, data)
}


export function resetPassword(data) {
  return instance.post(API.password, data)
}

