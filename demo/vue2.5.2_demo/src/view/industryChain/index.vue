<template>
  <div class="chain-wrap">
    <jSubNav :items="items"></jSubNav>
    <router-view></router-view>
  </div>
</template>
<script>
import { jSubNav } from '../../components'
export default {
  name: 'industryChain',
  components: { jSubNav },
  data() {
    return {
      items: [
        { index: 0, name: '区域产业链分析', path: '/industryChain/areaAnalysis', isDisabled: false },
        { index: 1, name: '园区产业链分析', path: '/industryChain/parkAnalysis', isDisabled: false },
        { index: 2, name: '企业推荐', path: '/industryChain/recommendedEnt', isDisabled: true },
        { index: 3, name: '产业链金融', path: '/industryChain/chainFinancial', isDisabled: true }
      ]
    }
  }
}
</script>
<style lang="less" scoped>

</style>
