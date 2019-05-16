import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const TokenKey = 'oss_token' // eForm-Auth Token

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function parsePayload(token) {
  return jwt.decode(token)
}
