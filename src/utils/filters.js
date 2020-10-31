import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-CN')
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})

Vue.filter('time1', input => {
  return moment(input).fromNow()
})
