<template>
  <button class="verification" @click="ifVerCode" :disabled="!show">
    <span v-show="show">获取短信验证码</span>
    <span v-show="!show">{{count}} s</span>
  </button>
</template>
<script>
import { stayPark as api } from '../../api'

export default {
  props: {
    phone: {
      type: String
    }
  },
  data() {
    return {
      show: true,
      count: '',
      timer: null,
      errMsg: ''
    }
  },
  methods: {
    ifVerCode() {
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone))) {
        this.$emit('errData', this.errMsg = '手机号不符合规则')
        return
      }
      // 检查用户是否存在
      api
        .findByUser({
          userName: this.phone,
          userType: 0
        })
        .then(rst => {
          this.$emit('errData', this.errMsg = '该手机号已注册')
        })
        .catch(err => {
          if (err.code === -1) {
            this.verCode()
          }
        })
    },
    verCode() {
      const codeJson = {
        userName: this.phone,
        userType: 0
      }
      const TIME_COUNT = 60
      // 发送验证码接口
      api
        .getCode(codeJson)
        .then(rst => {
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        })
        .catch(() => {
          this.$emit('errData', this.errMsg = '发送验证码失败')
        })
    }
  },
  mounted() {
  },
  components: {

  }
}
</script>
<style scoped lang='less'>
  .verification{
    width: 105px;
    height: 37px;
    border-radius: 4px;
    background-image: linear-gradient(169deg,#f6a312 0%,#fb9c0f 0%,#ff950c 0%,#e48b00 100%),linear-gradient(#f6f6f6,#f6f6f6);
    position: absolute;
    right: -116px;
    top: 0;
    color: white;
    font-size: 12px;
    cursor: pointer;
  }
</style>
