import moment from './../../static/js/moment.min'
import Vue from 'vue'

Vue.filter('dateFormat', function(value, format) {
  if (!value) return '--'
  format = (format || 'YYYY-MM-DD')
  var m = moment(+value)
  var str = m.isValid() ? m.format(format) : '--'
  return str
})
