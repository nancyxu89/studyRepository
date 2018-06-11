<template>
  <button :class="['sort-btn',state!==''?'btn-blue':'']" @click="sort">
    <span :class="['icon iconfont sort ',state===mode[0]?'down':'',state===mode[1]?'up':'']">{{text}}</span>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    initState: {
      type: String,
      default: ''
    },
    mode: {
      type: Array,
      default: function() {
        return ['DESC', 'ASC']
      }
    }
  },
  data: function() {
    return {
      state: this.initState
    }
  },
  methods: {
    sort: function() {
      if (this.state !== this.mode[0]) {
        this.state = this.mode[0]
      } else {
        this.state = this.mode[1]
      }
      this.$emit('sort', this.state)
    }
  }
}

</script>

<style lang="less" scoped>
  .sort-btn {
    min-width: 77px;
    height: 32px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 12px;
    border-radius: 3px;
    background: #f4f4f4;
    padding: 0 23px 0 10px;
    border: solid 1px #c2c2c2;
    cursor: pointer;
  }

  .btn-blue {
    background-image: linear-gradient(125deg, #0b82da 0%, #0479e8 100%), linear-gradient(#14aaff, #14aaff);
    background-blend-mode: normal, normal;
    border-color: #14aaff;
  }

  .sort {
    position: relative;
    display: inline-block;
    color: #000000;
    font-size: 14px;
  }

  .sort.up, .sort.down {
    color: #fff;
  }

  .sort:before,
  .sort:after {
    position: absolute;
    right: -15px;
    z-index: 1;
    font-size: 12px;
    top: 3px;
    color: #b1b1b1;
  }

  .sort:before {
    content: "\e7fe";
  }

  .sort:after {
    content: "\e7a7";
  }

  .sort.down:before {
    color: #b2d6ff;
  }

  .sort.down:after {
    color: #fff;
  }

  .sort.up:before {
    color: #fff;
  }

  .sort.up:after {
    color: #b2d6ff;
  }
</style>
