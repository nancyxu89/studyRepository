<template>
  <renderless-add-tag v-model="tags" @validate="validate">
    <div class="tag-box" slot-scope="{ tags,removeTag,addTag,inputAttrs,inputEvents }">
      <p class="err-msg">{{errMsg}}</p>
      <div class="tag-header"><input v-bind="inputAttrs" v-on="inputEvents" @keydown.enter.prevent="addTag" v-model="newTag" type="text">
        <i class="icon iconfont icon-cc-plus-circle"></i>
        <span @click="addTag">{{hint}}</span>
      </div>
      <div class="tag-list">
        <span class="tag-item" v-for="(tag,index) in tags" v-bind:key="index">{{tag}}
          <i class="icon iconfont icon-delete" @click="removeTag(tag)"></i>
        </span>
      </div>
    </div>
  </renderless-add-tag>
</template>
<script>
import renderlessAddTag from '../../components/addTag/jAddTagRenderless'
export default {
  components: { renderlessAddTag },
  props: {
    hint: {
      type: String,
      default: ''
    },
    flag: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tags: [],
      newTag: '',
      errMsg: ''
    }
  },
  watch: {
    tags: {
      handler: function(newVal, oldVal) {
        this.$emit('change', { tagList: newVal, flag: this.flag })
      },
      deep: true
    }
  },
  methods: {
    validate(val) {
      let len = val.length
      if (len === 0) {
        this.errMsg = '请输入' + this.flag
      } else if (len < 2 || len > 60) {
        this.errMsg = '关键词不符合规则'
      } else {
        this.errMsg = ''
      }
      if (this.tags.length === 3) {
        this.errMsg = '每个主题最多只能设置3组关键词'
        setTimeout(() => {
          this.errMsg = ''
        }, 3000)
      }
    },
    clearMsg() {
      this.errMsg = ''
    }
  }
}
</script>
<style lang="less" scoped>
.tag-box {
  /*margin-top: 12px;*/

  .tag-header {
    display: flex;
    justify-content: space-between;
  }

  .tag-header > span,
  .tag-header > .iconfont {
    display: inline-block;
    font-size: 14px;
    color: #2f81ee;
    white-space: nowrap;
    line-height: 32px;
  }

  .tag-header > .iconfont {
    margin: 0 7px 0 10px;
  }

  input {
    width: 100%;
    height: 32px;
    background-color: #ecf2fb;
    border-radius: 3px;
    border: solid 1px rgba(18, 108, 236, 0.3);
  }

  .tag-item {
    height: 23px;
    display: inline-block;
    font-size: 12px;
    padding: 2px 6px 2px 12px;
    margin-right: 10px;
    color: #fff;
    box-sizing: border-box;
    background-image: linear-gradient(
        -23deg,
        rgba(64, 146, 255, 0.77) 0%,
        rgba(63, 143, 250, 0.77) 100%
      ),
      linear-gradient(#ecf2fb, #ecf2fb);
    background-blend-mode: normal, normal;
    border-radius: 3px;
    border: solid 1px rgba(33, 148, 255, 0.76);
  }

  .tag-list {
    margin-top: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .iconfont {
      font-size: 12px;
      cursor: pointer;
    }
  }

  .err-msg {
    height: 17px;
    color: #ff4d1d;
    text-align: right;
  }
}
</style>
