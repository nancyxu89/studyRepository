<template>
  <div class="forget-psd">
    <div class="forget-title">
      <span>找回密码</span>
    </div>
    <form>
      <div class="psd-message">
        <label><span>*</span>用户名:</label>
        <input type="text" placeholder="请输入用户名"/>
      </div>
      <div class="psd-message">
        <label><span>*</span>手机号:</label>
        <input type="number" placeholder=""/>
      </div>
      <div class="psd-message verification-code">
        <label><span>*</span>验证码:</label>
        <input type="text" placeholder="请输入验证码"/>
        <button>获取验证码</button>
      </div>
      <div class="psd-message">
        <label><span>*</span>新密码:</label>
        <input type="password" placeholder="请输入密码"/>
      </div>
      <div class="psd-message">
        <label class="affirm-psd"><span>*</span>确认密码:</label>
        <input type="password" placeholder="请再次输入密码"/>
      </div>
      <div class="affirm-button">
        <button>确认更改</button>
        <a>返回登录</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
    }
  }
}
</script>

<style scoped lang='less'>
  .forget-psd{
    width:96%;
    height:auto;
    margin:0 auto;
    .forget-title{
      width:100%;
      height:32px;
      font-size:16px;
      font-weight:bold;
      margin-top:55px;
      border-bottom:1px solid #e2e2e2;
      text-align:center;
    }
    form{
      text-align:center;
      .psd-message{
        margin:30px 0px 0 0;
        span{
          color:red;
        }
        label{
          font-size:14px;
          margin-right:21px;
        }
        span{
          margin-right:3px;
        }
        input{
          width:220px;
          height:29px;
          border:1px solid #e2e2e2;
          padding-left:19px;
        }
        .affirm-psd{
          margin-left:-13px;
        }
      }
      .verification-code{
        input{
          width:129px;
          height:28px;
          border:1px solid #e2e2e2;
        }
        button{
          width:93px;
          height:30px;
          background:#3c99e9;
          color:#fff;
          margin:0px 0 1px -3px;
          vertical-align:middle
        }
      }

      .affirm-button{
        margin-top:35px;
        font-size:14px;
        button{
          width:130px;
          height:33px;
          background:#fd8524;
          color:#fff;
          border-radius:3px;
          margin-left:48px;
        }
        a{
          margin-left:26px;
          text-decoration:underline;
          color:#919191;
        }
      }
    }
  }
</style>
