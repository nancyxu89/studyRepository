<template>
  <a class="btn" :class="className" @click="clickHandle">
    <slot>
      <i class="iconfont icon-export" v-if="download"></i>
      <i class="iconfont icon-up" v-if="sort"></i>
      <i class="iconfont icon-down" v-if="sort"></i>
      {{text}}
    </slot>
  </a>
</template>
<script>
export default {
  props: {
    text: String,
    download: Boolean,
    fill: Boolean,
    sort: Boolean,
    small: Boolean,
    state: Object,
    disabled: Boolean,
    notHover: Boolean
  },
  data() {
    return {
      stateVal: {},
      className: {}
    }
  },
  watch: {
    download() {
      this.getClassName()
    },
    fill() {
      this.getClassName()
    },
    sort() {
      this.getClassName()
    },
    small() {
      this.getClassName()
    },
    disabled() {
      this.getClassName()
    },
    state: {
      handler() {
        this.stateVal = this.state
        this.getClassName()
      },
      deep: true

    }
  },
  methods: {
    clickHandle() {
      if (this.sort) {
        this.stateVal.desc = !this.stateVal.desc
        this.getClassName()
      }
      this.$emit('click', this.stateVal)
    },
    getClassName() {
      let classes = {
        'btn-export': this.download,
        'btn-sort': this.sort,
        'btn-fill': this.fill,
        'btn-small': this.small,
        'not-hover': this.notHover,
        'disabled': this.disabled
      }
      if (this.sort && this.stateVal.desc !== undefined) {
        classes.desc = this.stateVal.desc
        classes.asc = !classes.desc
      }
      this.className = classes
    }
  },
  created() {
    this.stateVal = this.state || {}
    this.getClassName()
  }
}
</script>
