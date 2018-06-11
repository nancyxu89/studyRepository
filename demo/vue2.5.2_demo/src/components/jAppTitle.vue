<template>
  <div class="app-title-box">
    <img :src="logo" alt="">
    <span class="company-name">{{companyName}}</span>
    <span class="app-name">{{appName}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyName: window.companyName,
      appName: window.appShortName,
      logo: window.logo
    }
  }
}
</script>
<style lang="less" scoped>
.app-title-box {
  height: 74px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  padding-left: 30px;
  font-family: FZY1JW--GB1-0;
  font-weight: normal;

  img {
    width: 83px;
    height: 74px;
    display: inline-block;
  }
}

.company-name {
  color: #f0f0f0;
  margin-right: 10px;
  border-right: solid 2px #fff;
  line-height: 21px;
  padding-right: 10px;
}

.app-name {
  display: inline-block;
  color: #fff;
  line-height: 21px;
}
</style>
