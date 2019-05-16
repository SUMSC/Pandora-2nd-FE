import Mock from 'mockjs'

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    'repo|1': ['SUMSC/pandora-demo'],
    'status|1': ['passed', 'failure', 'pending'],
    time: '@datetime',
    error_msg: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/grade',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
