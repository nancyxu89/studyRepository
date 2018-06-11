<template>
  <span class="j_checkbox">
    <input class="checkbox" type="checkbox" :id="id" v-model="state" @change="change" >
    <label :for="id"></label>
  </span>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: this.value
    }
  },
  watch: {
    value() {
      this.state = this.value
    }
  },
  methods: {
    change() {
      this.$emit('input', this.state)
      this.$emit('change', this.state)
    }
  }
}
</script>

<style lang="less" scoped>
.j_checkbox {
  display: inline-block;
  vertical-align: middle;
  margin: -3px 10px 0 0px;
}

.checkbox {
  display: none;
  &+label {
    position: relative;
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    min-width: 18px;
    min-height: 18px;
    &:before {
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 100%;
      content: ' ';
      border: 1px solid #c0c0c0;
    }
  }
  &:checked+label:before {
    border-color: #1593ed;
    background: #1593ed;
  }
  &:checked+label:after {
    display: block;
    content: ' ';
    top: 15%;
    left: 40%;
    box-sizing: border-box;
    width: 30%;
    height: 60%;
    transform: rotate(45deg);
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    border-top: 0;
    border-left: 0;
    position: absolute;
  }
}
</style>
