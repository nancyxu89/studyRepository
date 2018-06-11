<template>
  <!--关联舆情弹出框-->
  <j-dialog :initShowTitle="false"
            :initShow="false"
            class='err_dialog'
            ref="dialog">
    <div class='err'
         v-if="err.code==-101">
      用户过期，请重新登录后再操作！
    </div>
    <div class='err' v-else>
      {{err.msg}}
    </div>
  </j-dialog>
</template>
<script>
import { jDialog } from '../../components'
export default {
  data() {
    return {
    }
  },
  computed: {
    code() {
      var code = this.err.code || 1
      if (code === -101 || code === -102) {
        code = -101
      }
      return code
    },
    err: function() {
      return this.$store.state.err
    }
  },
  watch: {
    err(curVal) {
      if (curVal.msg) {
        this.$refs.dialog.show = true
        setTimeout(() => {
          this.$refs.dialog.show = false
        }, 3000)
      }
    }
  },
  methods: {
    colse() {
      if (this.code === -101) {
        this.$router.push({
          path: '/login',
          query: { r: this.$route.fullPath }
        })
      }
    }
  },
  components: {
    jDialog
  }
}
</script>
<style scoped lang='less'>
.err_dialog {
  width: 566px;
  height: 294px;
  color: rgba(0, 0, 0, 0.8);
}

.labelBox {
  .label-name {
    margin: 28px 0 0 67px;
    input {
      width: 333px;
      height: 34px;
      border: 1px solid #bebebe;
      margin-left: 19px;
      &:focus {
        border: 1px solid #ff4a2c;
      }
    }
    .jurisdiction {
      width: 201px;
      height: 23px;
      line-height: 23px;
      color: #ff4a2c;
      padding-left: 102px;
      margin-top: 11px;
      font-size: 12px;
      background-image: url(../../assets/images/label.png);
      background-repeat: no-repeat;
      background-position: 28% 40%;
    }
  }
  .label-rank {
    margin: 11px 0 0 67px;
    input {
      width: 13px;
      height: 13px;
      margin-left: 19px;
      vertical-align: middle;
    }
  }
  hr {
    width: 85%;
    margin: 0 auto;
    border: 1px solid #d5d5d5;
    margin-top: -10px;
  }
  .focus {
    margin: 10px 0 0 34px;
  }
  .btn {
    margin-top: 37px;
    text-align: center;
    button:nth-child(2) {
      margin-left: 37px;
    }
  }
}
</style>
