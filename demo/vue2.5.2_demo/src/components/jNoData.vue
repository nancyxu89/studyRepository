<template>
  <div :class="{full:mode!='s'}">
    {{hint}}
  </div>
</template>
<script>
export default {
  name: 'noData',
  props: {
    mode: {
      type: String,
      default: 's'
    },
    hint: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="less">
.full {
  height: 300px;
  margin: 0 auto;
  padding-top: 190px;
  box-sizing: border-box;
  background: url('../assets/images/nodata.png') no-repeat center 50px;
  text-align: center;
  color: #ccc;
  font-size: 14px;
}
</style>
