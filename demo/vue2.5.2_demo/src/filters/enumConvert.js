import store from '../store'
import Vue from 'vue'

Vue.filter('enumConvert', function(value, splitChar, enums) {
  if (value == null) return '--'
  if (splitChar) {
    value = value.split(splitChar)
  }
  if (!(value instanceof Array)) {
    value = [value]
  }
  enums || (enums = store.state.enums)
  return value.map(v => {
    var item = enums.find(e => e.value === v) || {
      name: '--'
    }
    return item.name
  }).join(splitChar)
})
