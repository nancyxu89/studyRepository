<template>
  <nav class="j-sub-nav">
    <router-link :class="['nav-item',item.isDisabled?'disabled':'']" v-for="(item,index) in items" v-bind:key="index" tag="li"
                 :title="item.isDisabled?'暂不开放':''" :disabled="item.isDisabled" :to="item.path">{{item.name}}</router-link>
  </nav>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.j-sub-nav {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;

  .nav-item {
    display: inline-block;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    color: #666666;
    padding: 10px 24px;
    cursor: pointer;
    border-bottom: solid 2px transparent;

    &:hover,
    &.selected {
      color: #1a75ca;
      border-bottom-color: #1a75ca;
      background-color: rgba(26, 117, 202, 0.1);
    }
  }

  .nav-item.disabled {
    &:hover {
      color: #666666;
      border-bottom-color: transparent;
      background-color: #fff;
    }
  }
}
</style>
