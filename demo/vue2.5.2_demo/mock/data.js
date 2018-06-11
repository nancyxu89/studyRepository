import Mock from 'mockjs'
const publicsentiments = /\/api\/publicsentiments(\?*)?/i
const privateTagsUrl = /\/api\/getPrivateTags/i
const publicTagsUrl = /\/api\/getPublicTags/i

var data = Mock.mock({
  'data|200': [{
    'subject': () => Mock.Random.cword(5, 10),
    'type|1': ['再融资类项目', '新三板类项目', '首发类项目', '优先股类项目', '债券类项目'],
    'rank|1': ['重大', '一般'],
    'title': () => Mock.Random.cword(15, 40)
  }]
}).data

Mock.mock(publicsentiments, function(option) {
  let { pageSize, pageIndex } = parseQueryString(option.url)
  let start = pageSize * (pageIndex - 1)
  let list = data.slice(start, start + (+pageSize))
  return {
    code: 1,
    data: {
      total: data.length,
      list
    }
  }
})
var privateTags = Mock.mock({
  'data|20': [{
    'id|+1': 100,
    'keyword': () => Mock.Random.cword(3, 6)
  }]
})
var publicTags = Mock.mock({
  'data|50': [{
    'id|+1': 500,
    'keyword': () => Mock.Random.cword(3, 6)
  }]
})
Mock.mock(privateTagsUrl, function(option) {
  return {
    code: 1,
    data: privateTags.data
  }
})
Mock.mock(publicTagsUrl, function(option) {
  return {
    code: 1,
    data: publicTags.data
  }
})

function parseQueryString(url) {
  var str = url.split('?')[1]
  var keyValues = str.split('&')
  var obj = {}
  for (var i = 0, l = keyValues.length; i < l; i++) {
    var [key, value] = keyValues[i].split('=')
    if (obj[key]) {
      obj[key] = [value, ...obj[key]]
    } else {
      obj[key] = value
    }
  }
  return obj
}
