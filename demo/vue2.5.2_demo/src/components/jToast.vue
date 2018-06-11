<template>
  <div class="toast"
       v-show="show"
       :style="{top:toTop+'px',left:toLeft+'px'}"
       @click="click">
    {{content}}</div>
</template>
<script>
export default {
  data: function() {
    return {
      show: this.initShow,
      top: this.top
    }
  },
  props: {
    content: {
      type: String
    },
    initShow: {
      type: Boolean,
      default: false
    },
    toTop: {
      type: Number
    },
    toLeft: {
      type: Number
    }
  },
  methods: {
    click: function() {
      this.show = false
    }
  },
  watch: {
    initShow: function() {
      this.show = this.initShow
      var _this = this
      if (this.show) {
        setTimeout(function() {
          _this.show = false
        }, 3000)
      }
    }
  }
}
</script>
<style>
.toast {
  padding: 5px 10px;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  border-radius: 5px;
  position: absolute;
}
</style>
