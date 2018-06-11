<template>
  <div class="tags_box">
    <span class="tag" :class="{'selecting':tag.selecting,'selected': tag.selected}" v-for="(tag,index) in tags" v-bind:key="index" @click="selected(tag)">{{tag.name}}</span>
    <span class="tag tag-empty"></span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array
    },
    keyword: {
      type: String
    }
  },

  data() {
    return {
      tags: this.value
    }
  },
  watch: {
    'value': function(curValue) {
      this.tags = curValue
    },
    'keyword': function(curValue) {
      this.filter(curValue)
    }
  },
  created() {
    this.filter(this.keyword)
  },
  methods: {
    selected(tag) {
      tag.selected = !tag.selected
      this.$emit('input', this.tags)

      this.$emit('tagClick', tag)
    },
    filter(keyword) {
      let key = keyword && keyword.trim()
      this.tags.forEach((tag) => {
        tag.selecting = key && tag.name.includes(key)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.tags_box {
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 10px -10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.tag {
  padding: 0px 15px;
  margin: 5px 10px;
  flex-grow: 1;
  border-radius: 2px;
  background: rgb(238, 242, 247);
  height: 32px;
  line-height: 32px;
  border: 1px solid rgb(204, 204, 204);
  color: #4a4a4a;
  cursor: pointer;
  &:hover {
    color: #3b80d5;
  }
  &.selecting {
    border: 1px solid #bcdbf6;
    color: #2299ff;
    &:after {
      content: ' ';
      counter-increment: selectingCnt;
    }
  }
  &.selected {
    border: 1px rgb(37, 133, 253) solid;
    background-color: rgb(94, 165, 253);
    color: #fff;
    counter-increment: selectedCnt;
  }
  &.tag-empty {
    flex-grow: 1000;
    height: 1px;
    background: transparent;
    border: none;
  }
}
</style>
