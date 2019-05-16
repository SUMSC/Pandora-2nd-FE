import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/grade',
    method: 'get',
    params
  })
}

export function updateRepo(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}
