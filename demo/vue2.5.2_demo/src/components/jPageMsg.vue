<template v-if="code!=Code.Success">
  <jNoData :hint="nodataHint" v-if="code==Code.NoData" :mode="mode" v-cloak></jNoData>
  <!--<jLoading v-else-if="code==Code.Loading" :mode="mode" v-cloak></jLoading>-->
  <jOffline v-else-if="code==Code.Offline" :mode="mode" v-cloak></jOffline>
  <jNoAuth v-else-if="code==Code.NoAuth" :mode="mode" v-cloak></jNoAuth>
  <div class="no-auth" v-else-if="code==Code.Overdue" :mode="mode" v-cloak>
    你的用户信息已过期，请重新
    <router-link :to="{path:'/index',query:{r:$route.fullPath}}"> 登录</router-link>！
  </div>
  <div v-else-if="code==Code.Error" :mode="mode" v-cloak>
    {{msg}}
  </div>
</template>
<script>
import jNoData from './jNoData.vue'
import jLoading from './jLoading.1.vue'
import jOffline from './jOffline.vue'
import jNoAuth from './jNoAuth.vue'
import { Code } from '../assets/js/operaCode.js'
export default {
  name: 'jPageMsg',
  props: {
    code: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'f'
    },
    msg: {
      type: String
    },
    nodataHint: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return { Code: Code }
  },
  watch: {
    code(curVal) {
      if (curVal === Code.Overdue) {
        setTimeout(() => {
          this.$router.push({
            path: '/index',
            query: {
              r: this.$route.fullPath
            }
          })
        }, 3000)
      }
    }
  },
  components: {
    jNoData,
    jLoading,
    jOffline,
    jNoAuth
  }
}
</script>
<style lang="less" scoped>
  .no-auth{
    padding: 20px 0;
    font-size: 14px;
    color: #555555;

    a{
      color:#1891ef;
    }
  }
</style>
