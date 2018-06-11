<template>
  <j-operaMsg ref="operaMsg" :msg="msg" :delay="delay" :code="code" :class="classes" class="sync-msg" @close="closeHandle">
    <div class="panel" v-if="code==2">
      <i class="icon"></i>
      <div class="msg">
        <p>这家企业已在企业库中！</p>
        <p class="ent-msg" :title="data.entName">{{data.entName}}
          <a class="link" @click="gotoEntDetail">查看详情</a>
        </p>
      </div>
    </div>
    <div class="panel" v-else-if="code==3">
      <i class="icon"></i>
      <div class="msg">
        <p>系统正在为您抓取该企业的各项数据，添加企业信息将在48小时后可以查看！</p>
        <p>您可以在
          <a class="link" @click="gotoCustomEntList">个人设置/添加企业记录</a>中查看添加企业的状态。
        </p>
      </div>
    </div>
    <div class="panel" v-else-if="code==4">
      <i class="icon"></i>
      <div class="msg">
        <p>正在为您同步该企业的信息，请您稍后查看！</p>
        <p>您可以在
          <a class="link" @click="gotoCustomEntList">个人设置/添加企业记录</a>中查看添加企业的状态。
        </p>
      </div>
    </div>
  </j-operaMsg>
</template>
<script>
import jDialog from './jDialog.vue'
import jOperaMsg from './jOperaMsg'
export default {
  name: 'jSyncEntMsg',
  props: {
    msg: {
      type: String,
      default: 'sfsafsa'
    },
    delay: {
      type: Number,
      default: 2000
    },
    code: {
      type: String | Number,
      default: -1
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    classes() {
      return {
        'existed': this.code === 2,
        'wait-sync': this.code === 3,
        'sync': this.code === 4
      }
    }
  },
  methods: {
    show() {
      this.$refs.operaMsg.show()
    },
    close() {
      this.$refs.operaMsg.close()
    },
    gotoEntDetail() {
      this.close()
      this.$router.push({ name: 'entDetail', params: { id: this.data.entId }, query: { entName: this.data.entName } })
    },
    gotoCustomEntList() {
      this.close()
      this.$router.push({ name: 'entSyncList' })
    },
    closeHandle() {
      this.$emit('close')
    }
  },
  components: {
    jDialog,
    jOperaMsg
  }
}
</script>
<style lang="less" scoped >
.sync-msg {
  width: 460px;
  height: 290px;
  .msg {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }
  .icon {
    width: 100px;
    height: 100px;
    background: no-repeat;
    display: block;
    margin: 10px auto 0;
  }
  .panel {
    height: 240px;
  }
}

.existed {
  .ent-msg {
    height: 38px;
    line-height: 38px;
    margin: 50px 10px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background: #f8f8f8;
    text-align: left;
    padding: 0 100px 0 10px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    position: absolute;
    right: 10px;
  }
  .icon {
    background-image: url('../assets/images/warn.png')
  }
}

.wait-sync {
  .icon {
    background-image: url('../assets/images/wait-sync.png')
  }
  p {
    margin: 25px;
  }
}

.sync {
  .icon {
    background-image: url('../assets/images/sync.png')
  }
  p {
    margin: 25px;
  }
}

// .sync-msg {
//   width: 300px;
//   height: 200px;
//   .icon {
//     width: 100px;
//     height: 100px;
//     background: no-repeat;
//     display: block;
//     margin: 10px auto 0;
//   }
//   .msg {
//     text-align: center;
//     font-size: 14px;
//     line-height: 1.5;
//   }
// }
// .success {
//   .icon {
//     background-image: url('../assets/images/success.png')
//   }
// }
// .error {
//   .icon {
//     background-image: url('../assets/images/error.png')
//   }
// }
// .warn {
//   .icon {
//     background-image: url('../assets/images/warn.png')
//   }
// }
// .sync {
//   .icon {
//     background-image: url('../assets/images/sync.png')
//   }
// }
</style>
