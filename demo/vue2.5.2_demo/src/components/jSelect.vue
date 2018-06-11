<template>
  <span class="select">
    <input type="text" class="input" readonly @focus="togglePanel(true)" @blur="blurHandle" v-model="text" :placeholder="placeholder" />
    <i :class="rightIcon"></i>
    <transition name="toggle">
      <div class="downlist" v-show="showPanel">
        <slot>
          <ul>
            <li class="option" v-for="(opt,index) in options" v-bind:key="index" @click="select(opt)">{{opt.text}}</li>
          </ul>
        </slot>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  props: {
    initItems: {
      type: Array,
      default() {
        return []
      }
    },
    displayKey: {
      type: String
    },
    valueKey: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    selectedIndex: {
      type: Number,
      default: -1
    },
    initShowPanel: {
      type: Boolean,
      default: false
    },
    blurClose: {
      type: Boolean,
      default: true
    },
    rightIcon: {
      type: String,
      default: 'triangle'
    },
    value: null
  },
  data: function() {
    return {
      text: '',
      options: [],
      showPanel: this.initShowPanel
    }
  },
  watch: {
    initItems(curVal, oldVal) {
      this.buildOptions()
    },
    initShowPanel(curVal, oldVal) {
      this.showPanel = curVal
    },
    selectedIndex(curVal, oldVal) {
      if (curVal >= 0 && curVal < this.options.length) {
        this.select(this.options[curVal])
      }
    }
  },
  created() {
    this.buildOptions()
  },
  methods: {
    blurHandle: function() {
      if (this.blurClose) {
        this.togglePanel(false)
      }
    },
    togglePanel: function(isShow) {
      this.showPanel = isShow === undefined ? !this.showPanel : isShow
    },
    select(option) {
      if (!option.selected) {
        this.options.forEach(opt => (opt.selected = false))
        option.selected = true
        this.text = option.text
        this.$emit('input', option.value)
        this.$emit('change', option.data)
      }
      this.togglePanel(false)
    },
    buildOptions() {
      let opts = []
      if (this.initItems) {
        opts = this.initItems.map(it => {
          let text = this.displayKey ? it[this.displayKey] : it.toString()
          let value = this.valueKey ? it[this.valueKey] : text
          return {
            text: text,
            value: value,
            data: it,
            selected: false
          }
        })
        var option = opts[this.selectedIndex]
        if (option) {
          this.select(option)
        }
      }
      this.options = opts
    }
  }
}
</script>

<style lang="less" scoped>
@color: #3b96e4;
.select {
  position: relative;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  background-color: #ffffff;
  border-radius: 5px;
  .iconfont {
    position: absolute;
    top: 0px;
    right: 10px;
    color: #bfdfff;
  }
  .triangle {
    display: block;
    width: 28px;
    height: 31px;
    /*background: @color;*/
    position: absolute;
    top: 1px;
    right: 0;
    border-radius: 0 4px 4px 0;
    pointer-events: none;
    &:after {
      content: ' ';
      border: 8px solid transparent;
      border-width: 8px 6px 8px 6px;
      border-top-color: #2881f0;
      position: absolute;
      right: 8px;
      top: 12px;
    }
  }
}

.input {
  height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff;
  padding: 0 32px 0 8px;
  width: calc(~'100% - 42px');
  &::-webkit-input-placeholder{
    color:#d9d9d9;
  }
}

.downlist {
  position: absolute;
  z-index: 10;
  width: 100%;
  ul {
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    padding: 3px 0;
    max-height: 480px;
    overflow-y: auto;
  }
}

.option {
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 24px;
  padding: 0 8px;
  color: #444;
  &:hover,
  &.selected {
    color: #fff;
    background: @color;
    cursor: pointer;
  }
}

.toggle-enter,
.toggle-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}

.toggle-enter-active,
.toggle-leave-active {
  transition: all ease 0.2s;
}
</style>
