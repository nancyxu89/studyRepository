<template>
  <!--404页面-->
  <div class='errorPageContent'>
    <div class='bgPage'>
      <div class='errorMsg'>
        <div class='errorData'>
          <p>您访问的地址不存在！</p>
          <p>请检查您输入的网址是否正确。</p>
          <router-link class='return'
                       to="/homepage"
                       tag="button"
                       active-class="selected">返回首页</router-link>
          <p class='autoReturn'>{{time}}秒后将自动返回</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: 5
    }
  },
  methods: {
    countTime() {
      var _this = this
      setTimeout(function() {
        _this.time--
        if (_this.time <= 0) {
          _this.$router.replace({
            path: '/'
          })
        } else {
          _this.countTime()
        }
      }, 1000)
    }
  },
  mounted() {
    this.countTime()
  }
}
</script>
<style scoped lang='less'>
@import '../../assets/css/main.css';
.errorPageContent {
  height: 100%;
  font-family: "微软雅黑";
  width: 100%;
  .bgPage {
    width: 100%;
    height: 100%;
    background: url(../../assets/images/404bg.png) no-repeat center;
    background-size: 100% 100%;
    .errorMsg {
      width: 1000px;
      height: 418px;
      background: url(../../assets/images/404.png) no-repeat 20% center;
      position: relative;
      margin: 0 auto;
      .return {
        width: 100px;
        height: 32px;
        background: #f6ae4b;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
      }
      .errorData {
        position: absolute;
        right: 12%;
        top: 28%;
        padding-left: 90px;
        border-left: 2px solid rgba(204, 218, 232, 0.5);
      }
      p:nth-child(1) {
        font-size: 24px;
        color: #3c8ce6;
      }
      p:nth-child(2) {
        font-size: 14px;
        color: #3c8ce6;
        margin-bottom: 28px;
      }
      .autoReturn {
        font-size: 14px;
        color: #ff8c03;
        margin-top: 8px;
      }
    }
  }
}
</style>
