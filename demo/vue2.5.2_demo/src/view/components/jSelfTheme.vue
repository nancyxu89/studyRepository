<template>
  <j-dialog class="self-theme" :initTitle="initTitle" :initShow="isShow" ref="themeDialog">
    <span slot="header" class="theme-title">{{themeName}}
      <i class="icon iconfont icon-delete" @click="close"></i>
    </span>
    <div class="theme-body">
      <p>设置监测主题名称</p>
      <input type="text" v-model="theme">
      <p>设置监测关键词（每个主题最多可设置3组关键词，每组关键词字数建议30字以内）</p>
      <j-add-tag ref="tag1" :hint="hint1" :flag="flag1" @change="change"></j-add-tag>
      <p>设置排除词（每个主题最多可设置3组排除词，每组排除词字数建议10字以内）</p>
      <j-add-tag ref="tag2" :hint="hint2" :flag="flag2" @change="change"></j-add-tag>
      <p class="msg-line">{{msg}}</p>
      <div class="opt-box">
        <span class="ok-opt" @click="makesure">确定</span>
        <span class="cancel-opt" @click="cancel">取消</span>
      </div>
    </div>
  </j-dialog>
</template>
<script>
import { jDialog, jAddTag } from '../../components'
export default {
  name: 'jSelfTheme',
  props: {
    initTitle: {
      type: String,
      default: ''
    },
    themeName: {
      type: String,
      default: '自定义主题'
    },
    initShow: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    initMsg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: this.initShow,
      theme: '',
      keywords: [],
      excludewords: [],
      hint1: '添加关键字',
      hint2: '添加排除词',
      flag1: '关键字',
      flag2: '排除词',
      msg: ''
    }
  },
  watch: {
    initShow() {
      this.isShow = this.initShow
    },
    initMsg(val) {
      this.msg = val
    }
  },
  methods: {
    change(obj) {
      if (obj.flag === this.flag1) {
        this.keywords = obj.tagList
      }
      if (obj.flag === this.flag2) {
        this.excludewords = obj.tagList
      }
    },
    show() {
      this.$refs.themeDialog.show = true
    },
    close() {
      this.msg = ''
      this.$refs.tag1.clearMsg()
      this.$refs.tag2.clearMsg()
      this.$refs.themeDialog.show = false
    },
    makesure() {
      let length1 = this.keywords.length > 0 ? 1 : 0
      let length2 = this.excludewords.length > 0 ? 1 : 0
      let val = ''
      if (this.theme.trim() === '') {
        val = val + '0'
      } else {
        val = val + '1'
      }
      val += length1 + '' + length2
      let params = {
        theme: this.theme,
        keyword: this.keywords.join(',')
      }
      if (length2 > 0) {
        params['excludeword'] = this.excludewords.join(',')
      }
      switch (val) {
        case '000':
          //          this.msg = '请设置监测主题、添加关键词以及排除词'
          this.msg = '请设置监测主题、添加关键词'
          break
        case '100':
          //          this.msg = '请添加关键词、排除词'
          this.msg = '请添加关键词'
          break
        case '011':
          this.msg = '请设置监测主题'
          break
        case '101':
          this.msg = '请添加关键词'
          break
        case '110':
          //          this.msg = '请添加排除词'
          this.$emit('makesure', params)
          break
        case '010':
          //          this.msg = '请设置监测主题、添加排除词'
          this.msg = '请设置监测主题'
          break
        case '001':
          this.msg = '请设置监测主题、添加关键词'
          break
        case '111':
          this.msg = ''
          this.$emit('makesure', params)
          break
        default:
          this.msg = ''
          break
      }
    },
    cancel() {
      this.close()
    }
  },
  components: { jDialog, jAddTag }
}
</script>
<style lang="less" scoped>
.self-theme {
  /*width: 40%;*/
  width: 544px;
  position: fixed;
}

.theme-title {
  display: inline-block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  color: #ffffff;
  box-sizing: border-box;
  padding-left: 12px;
  background-image: linear-gradient(-23deg, #2f81ee 0%, #3f8ffa 100%),
    linear-gradient(#35bcfc, #35bcfc);
  background-blend-mode: normal, normal;
  border-radius: 5px 5px 0 0;

  .iconfont {
    float: right;
    margin-right: 12px;
    cursor: pointer;
  }
}

.theme-body {
  font-size: 12px;
  color: #666666;

  p {
    margin-top: 24px;
  }

  p:first-child {
    margin-top: 0;
  }

  .msg-line {
    height: 17px;
    color: #ff4d1d;
    text-align: center;
    margin: 10px 0;
  }
  input {
    margin-top: 8px;
  }
}

input {
  width: 80%;
  height: 30px;
  background-color: #ecf2fb;
  border-radius: 3px;
  border: solid 1px rgba(18, 108, 236, 0.3);
}

.opt-box {
  display: flex;
  justify-content: center;
  align-items: center;

  .cancel-opt {
    margin-left: 40px;
  }
}

.ok-opt,
.cancel-opt {
  display: inline-block;
  font-size: 14px;
  color: #fff;
  padding: 7px 40px;
  background-image: linear-gradient(-23deg, #2f81ee 0%, #3f8ffa 100%),
    linear-gradient(#fdb12e, #fdb12e);
  background-blend-mode: normal, normal;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-opt {
  background-image: linear-gradient(
    -23deg,
    rgba(229, 240, 255, 0.6) 0%,
    rgba(240, 246, 255, 0.6) 100%
  );
  background-blend-mode: normal, normal;
  border-radius: 5px;
  color: #3082ee;
  border: solid 1px #9dc5fd;
}
</style>
