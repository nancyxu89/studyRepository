<template>
  <j-dialog class="warning-push-tooltip" :initShow="false" :initTitle="title" :initShowTitle='true' ref="warning_push_tooltip_dialog">
    <div class="input-group">
      <input type="text" placeholder="请输入关键字" class="form-control" @keyup.enter="entSearch" v-model="searchItem">
      <button class="input-group-addon search-btn" @click="entSearch">搜索</button>
    </div>
    <div class="clearFix lh-40">
      <h3>私有标签</h3>
      <div class="handle fr">
        <button class="pub-btn" @click="allChoose">全选</button>
        <button class="pub-btn" @click="reverseChoose">反选</button>
      </div>
    </div>
    <div class="tags_box" @click="calculationSelectCount">
      <span v-for="item in privateLabels" @click="item.active = !item.active" :class="{active:item.active,satisfy:item.select}">{{item.keyword}}</span>
      <span class="tag-empty"></span>
    </div>
    <div class="clearFix lh-40">
      <h3>公有标签</h3>
    </div>
    <div class="tags_box border-bottom" @click="calculationSelectCount">
      <span v-for="item in publicLabels" @click="item.active = !item.active" :class="{active:item.active,satisfy:item.select}">{{item.keyword}}</span>
      <span class="tag-empty"></span>
    </div>
    <p class="select-info">已选中{{selectLabelCount}}个舆情标签</p>
    <div class="operate">
      <button class="save-btn" @click="warningPushSave">保 存</button>
      <button class="cancle-btn" @click="hide">取 消</button>
    </div>
  </j-dialog>
</template>
<script>
import { jDialog, jTags } from '../../components'
import { personalSetting as api } from '../../api'
export default {
  props: {
    title: {
      type: String,
      default: '设置预警推送舆情标签'
    },
    sentimentContent: {
      type: Array
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      searchItem: '',
      selectLabelCount: 0,
      privateLabels: [],
      publicLabels: [],
      labels: [],
      loadData: null
    }
  },
  watch: {
    sentimentContent(curVal) {
      this.loadData.then(() => {
        this.labels.forEach(item => {
          item.active = this.sentimentContent.includes(item.keyword)
        })
      })
    }
  },
  created() {
    this.loadData = this.getLabelData()
  },
  methods: {
    show() {
      this.$refs.warning_push_tooltip_dialog.show = true
    },
    // 预警企业弹出层隐藏
    hide() {
      this.$refs.warning_push_tooltip_dialog.close()
    },
    // 点击回车搜索
    entSearch() {
      this.labels.forEach(item => {
        item.select = this.searchItem && item.keyword.includes(this.searchItem)
      })
    },
    // 预警推送全选
    allChoose() {
      this.labels.forEach(item => {
        item.active = true
      })
      this.calculationSelectCount()
    },
    // 全部取消选择
    allNotChoose() {
      this.labels.forEach(item => {
        item.active = false
      })
      this.calculationSelectCount()
    },
    // 预警推送反选
    reverseChoose() {
      this.labels.forEach(item => {
        item.active = !item.active
      })
      this.calculationSelectCount()
    },
    // 预警推送标签点击影响计数
    calculationSelectCount() {
      this.selectLabelCount = 0
      this.labels.forEach(item => {
        if (item.active) this.selectLabelCount++
      })
    },
    // 预警推送保存方法
    warningPushSave() {
      let content = this.labels.filter(item => {
        return item.active
      }).map(item => {
        return item.keyword
      })
      this.$emit('input', content)
      this.$emit('assignMentSentiment', content)
      this.hide()
    },
    // 获取公有标签和私有标签数据
    getLabelData() {
      var privateData = api.getPrivateLabel().then(data => {
        this.privateLabels = data.data.map(label => {
          return {
            keyword: label.privateKeywordName,
            select: false,
            active: false,
            type: 'private'
          }
        })
        return this.privateLabels
      })
      var publicData = api.getPublicLabel().then(data => {
        this.publicLabels = data.data.map(label => {
          return {
            keyword: label.keyword,
            select: false,
            active: false,
            type: 'private'
          }
        })
        return this.publicLabels
      })
      return Promise.all([privateData, publicData]).then(() => {
        this.labels = [].concat(...this.privateLabels, ...this.publicLabels)
        return this.labels
      })
    }
  },
  components: {
    jDialog, jTags
  }
}
</script>
<style type="text/css" src="../../assets/css/checkbox.css" scoped></style>
<style scope lang="less">
.warning-push-tooltip {
  width: 760px;
  min-width: 760px;
  height: 6.2rem;
  .input-group {
    margin-left: 0;
  }
  .tags_box {
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 10px -10px;
    overflow-y: auto;
    overflow-x: hidden;
    span {
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
      &.tag-empty {
        flex-grow: 1000;
        height: 1px;
        background: transparent;
        border: none;
      }
      &.active {
        color: #fff;
        background: #5ea5fd;
        border: 1px solid #2585fd;
      }
      &:hover {
        color: #3D82D5;
      }
      &.satisfy {
        border: 1px solid #bcdbf6;
        color: #2299ff;
      }
    }
  }
  & .lh-40 h3 {
    line-height: 40px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    float: left;
    padding: 0;
  }
  .lh-40 {
    line-height: 40px;
    border-bottom: 1px solid #c6c6c6;
  }
  .handle button:nth-child(1) {
    width: 54px;
    background: none;
    border: 1px solid #0092ff;
    color: #0092ff;
    margin-right: 10px;
  }
  .handle button:nth-child(2) {
    width: 54px;
    background: none;
    border: 1px solid #fd8324;
    color: #fd8324;
  }
  .label-group {
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 8px;
    margin-top: 10px;
    span {
      display: inline-block;
      min-width: 46px;
      margin-bottom: 15px;
      padding: 0 13.5px;
      line-height: 30px;
      background: #eef2f7;
      color: #4a4a4a;
      text-align: center;
      border: 1px solid transparent;
      border-radius: 4px;
      cursor: default;
      box-sizing: border-box;
    }
    /*span+span {
      margin-left: 30px;
    }
    span:nth-of-type(7n+1) {
      margin-left: 0;
    }*/
    span.active {
      color: #fff;
      background: #5ea5fd;
      border: 1px solid #2585fd;
    }
    span:hover {
      color: #3D82D5;
    }
    span.satisfy {
      border: 1px solid #bcdbf6;
    }
  }
  .border-bottom {
    border-bottom: 1px solid #c6c6c6;
  }
  .select-info {
    line-height: 42px;
    font-size: 12px;
    color: #444;
  }
  .operate {
    margin: 20px 58px 0px;
    height: 42px;
    text-align: center;
  }
}
</style>
