<template>
  <div class="box">
    <h3 class="title">登录招商通,找到你合适的园区</h3>
    <p class="log-p">
      <input ref="userInput" type="text" placeholder="请输入手机号" class="news" v-model="phone" @keyup.13="keyUp" @keydown.enter="passValue">
      <i class="iconfont icon-geren"></i>
    </p>
    <p class="log-p mar25">
      <input type="password" placeholder="请输入您的密码" class="news" v-model="password" @keyup.13="keyUp" @keydown.enter="passValue">
      <i class="iconfont icon-mima"></i>
    </p>
    <p class="register">
      <span>没有账号？</span>
      <span class="jump" @click="jump">注册</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String
    },
    value: {
      type: Object,
      default() {
        return {
          username: '',
          password: ''
        }
      }
    }
  },
  data() {
    return {
      phone: this.value.username,
      password: this.value.password
    }
  },
  watch: {
    msg(value) {
      this.errMsg = value
      this.loginning = !value
    },
    phone(to, from) {
      this.value.username = to
    },
    password(to, from) {
      this.value.password = to
    }
  },
  mounted() {
    this.$refs.userInput.focus()
  },
  methods: {
    focusObj() {
      this.$refs.userInput.focus()
    },
    passValue() {
      this.$emit('passValue')
    },
    keyUp() {
      this.passValue()
    },
    jump() {
      this.$emit('jump')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.box {
  width: 100%;
  box-sizing: border-box;
}
.title {
  padding: 23px 0;
  text-align: center;
  font-size: 16px;
  color: #f7f7f7;
  margin-bottom: 5px;
}
.log-p {
  width: 100%;
  height: 37px;
  border-radius: 4px;
  background-color: white;
  position: relative;
  & > i {
    position: absolute;
    color: #ced4d7;
    font-size: 21px;
    left: 12px;
    top: 8px;
  }
  & > input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 45px;
    border-radius: 4px;
    font-size: 15px;
    color: #d6d6d6;
  }
  .news:focus {
    color: #73c6ff;
    outline: none;
    transition: all 0.2s;
    &::-webkit-input-placeholder {
      color: #73c6ff;
    }
  }
  .news:focus + i {
    color: #30aafb;
  }
}
.mar25 {
  margin-top: 25px;
}
input::-webkit-input-placeholder {
  color: #d6d6d6;
}
.register {
  position: absolute;
  bottom: 20px;
  box-sizing: border-box;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  & > span {
    color: #73c4f2;
  }
  & > .jump {
    cursor: pointer;
    color: #e8a43a;
  }
}
</style>
