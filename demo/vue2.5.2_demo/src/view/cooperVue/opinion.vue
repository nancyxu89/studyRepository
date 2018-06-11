<template>
  <!--舆情动态-->
  <div class="public-list">
    <p class="no-available">暂不开放此信息</p>
    <!--<div class='opinionType clearFix'>-->
      <!--<router-link tag='div' :to='{name:"entDynamicOpinion",query:query,params:params}' active-class="active">主体舆情</router-link>-->
      <!--<router-link tag='div' :to='{name:"entAffiliateOpinion",query:query,params:params}' active-class="active">关联方舆情</router-link>-->
    <!--</div>-->
    <!--<router-view></router-view>-->
  </div>
</template>
<script>

export default {
  name: 'opinion',
  data() {
    return {
      params: this.$route.params,
      query: this.$route.query
    }
  }
}

</script>
<style scoped lang='less'>
.opinionType {
  width: 99.7%;
  height: 53px;
  background: #f4f4f4;
  border-bottom: 1px solid #d5d5d5;
  border-top: 1px solid #d5d5d5;
  margin-left: 2px;
  div {
    float: left;
    width: 13%;
    height: 53px;
    line-height: 53px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
  .active {
    color: #1593ed;
  }
}
</style>
