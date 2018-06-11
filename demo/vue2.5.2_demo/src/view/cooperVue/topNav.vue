<template>
  <div class='topNav'>
    <ul class='clearFix'>
      <router-link tag='li' :to='{name:"entBaseInfo",query:query,params:params}' active-class="selected">基本信息</router-link>
      <router-link tag='li' :to='{name:"entRisk",query:query,params:params}' active-class="selected" :disabled="!isAttention">企业风险</router-link>
      <router-link tag='li' :to='{name:"entAssets",query:query,params:params}' active-class="selected" :disabled="!isAttention">无形资产</router-link>
      <router-link tag='li' :to='{name:"entInvestment",query:query,params:params}' active-class="selected" :disabled="!isAttention">对外投资</router-link>
      <router-link tag='li' :to='{name:"entAtlas",query:query,params:params}' active-class="selected" :disabled="!isAttention">关联图谱</router-link>
      <router-link tag='li' :to='{name:"entDynamicOpinion",query:query,params:params}' active-class="selected" :disabled="!isAttention">舆情动态</router-link>
      <router-link tag='li' :to='{name:"entExposeMsg",query:query,params:params}' active-class="selected" v-if="bok" :disabled="!isAttention">信息披露</router-link>
      <router-link tag='li' :to='{name:"entAnnualReport",query:query,params:params}' active-class="selected" v-if="!bok" :disabled="!isAttention">企业年报</router-link>
      <router-link tag='li' :to='{name:"entCustomTag",query:query,params:params}' active-class="selected" :disabled="!isAttention">自定义关联
        <br/>企业舆情</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'topNav',
  props: {
    bok: {
      type: Boolean
    },
    isAttention: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      params: this.$route.params,
      query: this.$route.query
    }
  }
}

</script>
<style scoped lang='less'>
.topNav {
  width: 100%;
  margin: 0 20px;
  .selected {
    background: #ff7713;
    color: #fff !important;
  }
  ul {
    width: 100%;
    margin-left: -18px;
    li {
      /*width: 12.36%;*/
      float: left;
      height: 52px;
      background: #f2f2f2;
      text-align: center;
      line-height: 52px;
      border-right: 1px solid #d5d5d5; // border-radius: 2px;
      font-size: 16px;
      cursor: pointer;
      white-space: normal;
      width: 12.4%;
      &[disabled] {
        opacity: .3;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
    li:nth-child(8) {
      line-height: 25px;
      border-right: none;
    }
  }
  .clearFix:after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>
