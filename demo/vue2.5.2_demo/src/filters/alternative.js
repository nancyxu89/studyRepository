import Vue from 'vue'

Vue.filter('alternative', function(value, type = '', req = '-') {
  if (value === 0) {
    return value
  }
  if (!value) {
    return req
  }
  if (type === 'array') {
    return value.join(', ')
  }
  return value
})
