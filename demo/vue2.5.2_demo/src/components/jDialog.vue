<template>
  <div v-show="show" class="dialog">
    <!--遮罩层-->
    <div class="mask opacity" v-if="isMask">
    </div>
    <!--内容区域-->
    <div class="main-dialog" :class="{'bottom-right':position=='bottomright'}">
      <div class="header" v-if="showTitle">
        <slot name="header">
          <h3>{{initTitle}}
            <a class="close" @click="close">×</a>
          </h3>
        </slot>
      </div>
      <div class="body">
        <slot>
        </slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'jDialog',
  props: {
    initTitle: {
      type: String
    },
    initShowTitle: {
      type: Boolean,
      default: true
    },
    initShow: {
      type: Boolean,
      default: false
    },
    position: {
      type: String
    },
    isMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: this.initShow,
      showTitle: this.initShowTitle
    }
  },
  watch: {
    initShow() {
      this.show = this.initShow
    }
  },
  methods: {
    close() {
      let e = {
        cancleClose: false
      }
      this.$emit('closing', e)
      if (!e.cancleClose) {
        this.show = false
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.dialog {
  position: absolute;
  top:20vh;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
}

.main-dialog {
  width: 100%;
  position: absolute;
  /*top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);*/
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.32);
  &.bottom-right {
    top: 100vh;
    left: 100vw;
    transform: translate(-100%, -100%);
  }
  .header {
    /*background-color: #3b80d5;*/
    background-image: linear-gradient(-23deg, #2f81ee 0%,#3f8ffa 100%),linear-gradient(#35bcfc,#35bcfc);
    height: 45px;
  }
  h3 {
    height: 43px;
    font-size: 18px;
    font-weight: normal;
    color: #fff;
    padding: 0 0 0 20px;
    line-height: 43px;
  }
  .close {
    font-size: 24px;
    float: right;
    position: absolute;
    right: 20px;
    color: #fff;
    cursor: pointer;
  }
  .body {
    background-color: #fafafa;
    padding: 20px;
  }
}

.mask {
  height: 100%;
  width: 100%;
  position: fixed;
  _position: absolute;
  top: 0;
  left: 0;
}

.opacity {
  opacity: 0.3;
  filter: alpha(opacity=30);
  background-color: #000;
}
</style>
