import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zhCN from './zh_CN'

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  }
}

// VeeValidate语言包切换,放自定义提示前
VeeValidate.Validator.localize('zh_CN', {
  ...zhCN
})
Vue.use(VeeValidate, config)
VeeValidate.Validator.extend('tel', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})

VeeValidate.Validator.extend('notallempty', {
  messages: {
    zh_CN: field => field + '不能全部为空'
  },
  validate: value => {
    return isNotEmpty(value)
  }
})

function isNotEmpty(value) {
  if (value == null) return false
  if (Array.isArray(value)) {
    if (!value.length) return false
    for (var i = 0, l = value.length; i < l; i++) {
      if (isNotEmpty(value[i])) return true
    }
    return false
  } else {
    return !!value.toString()
  }
}
