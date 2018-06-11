<template>
  <div :class="{full:mode!='s'}">
    网络出错，请稍后重试
  </div>
</template>
<script>
export default {
  name: 'jOffline',
  props: {
    mode: {
      type: String,
      default: 's'
    }
  }
}
</script>
<style scoped lang="less">
.full {
  height: 300px;
  margin: 0 auto;
  padding-top: 180px;
  box-sizing: border-box;
  background: url('../assets/images/offline.png') no-repeat center 50px;
  text-align: center;
  color: #ccc;
  font-size: 14px;
}
</style>
