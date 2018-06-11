import Vue from 'vue'
import {
  hasAuth
} from '../assets/js/auth'

function authValidation(el, binding) {
  if (binding.value && !hasAuth(binding.value)) {
    if (el.remove) {
      el.remove()
    } else {
      el.removeNode(true)
    }
  }
}

Vue.directive('auth', {
  bind: authValidation,
  // inserted: authValidation,
  update: authValidation
})
