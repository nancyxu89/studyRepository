<template>
  <div v-show="show" class="dialog">
    <!--遮罩层-->
    <div class="mask opacity" v-if="isMask">
    </div>
    <!--内容区域-->
    <div class="main-dialog" :class="{'bottom-right':position=='bottomright'}">
      <div class="body"  v-if="showTitle">
        <slot>
          <h3>{{initTitle}}<a class="close" @click="close">×</a></h3>
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
  data: function() {
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
    close: function() {
      let e = {
        cancleClose: false
      }
      this.$emit('closing', e)
      if (!e.cancleClose) {
        this.show = false
        this.$emit('closed')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .main-dialog {
    width: 100%;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 3px;
    background-color: rgb(250, 250, 250);
    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.32);
    &.bottom-right {
      top: 100vh;
      left: 100vw;
      transform: translate(-100%, -100%);
    }
    h3 {
      height: 43px;
      font-size: 18px;
      font-weight: normal;
      color: #fff;
      padding: 0 20px;
      line-height: 43px;
    }
    .close {
      font-size: 24px;
      float: right;
      color: #fff;
      cursor: pointer;
      transition: .2s transform ease-in-out;
      &:hover {
        transform: scale(1.3);
      }
    }
    .body {
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
