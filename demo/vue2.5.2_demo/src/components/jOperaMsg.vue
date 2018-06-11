<template>
  <j-dialog ref="dialog" :initShow="false" :initShowTitle="false" class="opera-msg" :class="classes">
    <slot>
      <div>
        <slot name="icon">
        <i class="icon"></i>
        </slot>
        <slot name="msg">
        <p class="msg" v-if="msg" v-html="msg"></p>
        </slot>
      </div>
    </slot>
  </j-dialog>
</template>
<script>
import jDialog from './jDialog.vue'
export default {
  name: 'jOperaMsg',
  props: {
    msg: {
      type: String
    },
    delay: {
      type: Number,
      default: 2000
    },
    code: {
      type: String | Number,
      default: -1
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
        'success': this.code === 1,
        'warn': this.code === 0,
        'error': this.code === -1
      }
    }
  },
  methods: {
    show() {
      if (this.isShow) return
      this.$refs.dialog.show = true
      setTimeout(() => {
        window.addEventListener('click', this.close)
      }, 1000)
      this.isShow = true
      if (this.delay <= 0) return
      setTimeout(this.close, this.delay)
    },
    close() {
      if (!this.isShow) return
      this.isShow = false
      this.$refs.dialog.close() // = false;
      this.$emit('close')
      window.removeEventListener('click', this.close)
    }
  },
  components: {
    jDialog
  }
}
</script>
<style lang="less" scoped >
.opera-msg {
  width: 300px;
  height: 200px;
  .icon {
    width: 100px;
    height: 100px;
    background: no-repeat;
    display: block;
    margin: 10px auto 0;
  }
  .msg {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }
}

.success {
  .icon {
    background-image: url('../assets/images/success.png')
  }
}

.error {
  .icon {
    background-image: url('../assets/images/error.png')
  }
}

.warn {
  .icon {
    background-image: url('../assets/images/warn.png')
  }
}

.sync {
  .icon {
    background-image: url('../assets/images/sync.png')
  }
}
</style>
