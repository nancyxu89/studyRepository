<template>
  <div >
    你无权限执行该操作，请<router-link :to="{name:'login',query:{r:$route.fullPath}}">切换用户</router-link>继续操作，如有疑问请联系管理员
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
