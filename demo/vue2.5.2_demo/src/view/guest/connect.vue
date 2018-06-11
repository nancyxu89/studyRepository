<template>
  <div>
    <div class="box">
      <dl>
        <dt><img :src="aboutLeft" /></dt>
        <dd v-if="flag==='jusfoun'">
          <p class="mar60">
            <span>商务对接：010-123456</span>
            <span>客服电话：010-123456</span>
          </p>
          <p class="mar60">
            <span>技术咨询：010-123456</span>
            <span>关注公众号，持续了解招商通</span>
          </p>
          <p class="mar60">
          </p>
          <p>
            <img src="../../assets/images/code.png" />
          </p>
        </dd>
        <dd class="amend-box" v-else-if="flag==='gbde'">
          <p v-for="(item,index) in infos" v-bind:key="index">
            <i v-if="index==0" class="iconfont icon-diqiu"></i>
            <i v-if="index==3" class="iconfont icon-duanxin"></i>
            <i v-if="index==4" class="iconfont icon-ai-tel"></i>
            <span v-if="index==4" class="mar25">400-818-3939</span>
            <span>{{item}}</span>
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'connect',
  data() {
    return {
      infos: [
        '公司总部地址：贵阳市观山湖区互联网金融特区大厦三层',
        '北京运营中心：北京市海淀区永泰庄北路1号6号楼',
        '上海运营中心：上海市徐汇区凤凰园田州路99号9号楼新茂大楼1009室',
        '702@GBDEX.com',
        '152-0104-6499',
        '参观采访： 152-0104-6499',
        '传真号码： 085188118962',
        '会员入会： 702@GBDEX.com',
        '数据销售： 6@GBDEX.com',
        '数据购买： 9@GBDEX.com',
        '招贤纳士： hr@gbdex.com'
      ]
    }
  },
  computed: {
    aboutLeft() {
      return window.about
    },
    flag() {
      return window.flag
    }
  }
}
</script>
<style scoped lang="less">
.box {
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  min-height: 585px;
  dl {
    width: 100%;
    display: flex;
    padding-top: 70px;
    padding-bottom: calc(~'100vh - 746px');
    dt {
      margin: 0 80px 0 65px;
      img {
        width: 350px;
        height: 500px;
        border: 1px solid #84ccff;
        border-radius: 4px;
      }
    }
    dd {
      padding-right: 80px;
      .mar60 {
        margin-bottom: 100px;
      }
      p {
        font-size: 16px;
        color: #666666;
        span {
          margin-left: 120px;
        }
      }
      p:last-child {
        position: relative;
        img {
          margin-left: 250px;
        }
      }
    }
  }

  .amend-box {
    height: 500px;
    display: flex;
    flex-direction: column;
    span {
      margin-left: 0;
    }
    p{
      flex:1;
      .iconfont{
        font-size: 25px;
        position: relative;
        top: 2px;
        margin-right: 2px;
      }
    }
    p:nth-child(2),p:nth-child(3){
      padding-left: 32px;
    }
  }
}
  .mar25{
    margin-right: 25px ;
  }
</style>
