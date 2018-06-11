<template>
  <j-dialog class="self-theme" :initTitle="initTitle" :initShow="isShow" ref="themeDialog">
    <span slot="header" class="theme-title">提示信息
      <i class="icon iconfont icon-delete" @click="close"></i>
    </span>
    <div class="theme-body">
      <div class="theme-box">
        <i class="iconfont icon-duigou"></i>
        <span>修改成功！</span>
      </div>
      <div class="opt-box">
        <!--<span class="ok-opt" @click="makesure">确定</span>-->
        <span class="ok-opt" @click="cancel">确定</span>
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
    industryName: {
      type: String,
      default: '提示信息'
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
    }
  },
  data() {
    return {
      isShow: this.initShow,
      industry: '',
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
      this.$refs.themeDialog.show = false
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
  width: 380px;
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
  .theme-box{
    text-align: center;
    margin: 10px 0 60px 0 ;
    span{
      font-size: 18px;
    }
    .icon-duigou{
      font-size: 60px;
      position: relative;
      top: 15px;
      margin-right: 20px;
      color: #3ca1f8;
    }
  }
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
