<template>
  <div>
    <div class="login-zzc"></div>
    <div class="login-page">
      <div class="login-hea">
        <span class="login-delete" @click="turn"><i class="icon iconfont icon-delete"></i></span>
      </div>
      <div class="login-con">
        <span>
           忘记密码请联系相关园区负责人，或拨打010-8888888
        </span>
      </div>
      <div class="login-footer">
        <p class="sign">
          <button @click="deterMine">确定</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean
    },
    resMsg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    turn() {
      this.$emit('turn')
    },
    deterMine() {
      this.$emit('deterMine')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login-zzc {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 0;
  overflow: hidden;
  z-index: 400;
}
.login-page {
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
  z-index: 500;
  width: 338px;
  height: 375px;
  background-image: linear-gradient(
      0deg,
      rgba(23, 78, 146, 0.95) 0%,
      rgba(23, 121, 204, 0.96) 100%
    ),
    linear-gradient(#ffffff, #ffffff);
  box-shadow: 0 7px 11px 0 rgba(0, 12, 29, 0.35);
  border-radius: 2%;
}
.login-hea {
  .login-delete {
    z-index: 999;
    position: absolute;
    right: 12px;
    top: 9px;
.icon-delete{
  color:#5ba4ff;
  font-size: 20px;
  cursor: pointer;
}
    .icon-delete:hover{
      font-size: 23px;
      color: #82d8ff;
    }
  }
  .login-zc{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    text-align: center;
    color: white;
    font-size: 20px;
    position: relative;
    .login-line{
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      top:19px;
      img{
        width: 100%;
      }
    }
  }
}
.login-con {
  width: 100%;
  box-sizing: border-box;
  padding: 0 33px;
  margin-top: 120px;
  color: white;
  span{
    line-height: 30px;
    font-size: 15px;
  }
}
.login-footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0 33px;
  margin-top: 50px;
  .sign {
    width: 100%;
    margin-top:11px;
    button {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border-radius: 4px;
      background: linear-gradient(-90deg, #2881f0 0%, #29bbff 100%),
      linear-gradient(#196db3, #196db3);
      font-size: 18px;
      color: white;
      cursor: pointer;
    }
  }
}
input::-webkit-input-placeholder{
  color: #d6d6d6;
}
</style>
