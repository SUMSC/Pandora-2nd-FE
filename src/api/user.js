import request from '@/utils/request'
import axios from 'axios'
import { parsePayload, AUTH_URL } from '../utils/auth'

export function login(data) {
  return axios.post(`${AUTH_URL}/login`, data)
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }

export function insertUser(token) {
  const { id, name } = parsePayload(token)
  return request.post('/user', {
    id_tag: id,
    username: name
  })
}
