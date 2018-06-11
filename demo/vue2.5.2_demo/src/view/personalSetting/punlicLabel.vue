<template>
  <div class="public-content">
    <div class="top-title">
      <div class="title-label">公有标签</div>
    </div>
    <div v-if="pageState.code==Code.Loading||pageState.code==Code.Success">
      <div class="public-search">
        <div class="input-group fl">
          <input type="text" placeholder="请输入标签名称" v-model="keyword" class="form-control" @keydown.enter="query">
          <button class="input-group-addon search-btn" @click='query'>搜索</button>
        </div>
        <div class="publist-list-category">
          <label>舆情级别：</label>
          <j-select v-model="type" :initItems="opinionKeyword" displayKey="name" valueKey="value" :selectedIndex="0" @change="filterChange">
          </j-select>
        </div>
      </div>
      <div class="public-main">
        <jTags v-model="tags" :keyword="keyword"></jTags>
      </div>
      <button class="cancle-btn" @click="add()" v-auth="Auth.add">+ 添加标签</button>
      <button class="save-btn" @click='delTag()' v-auth="Auth.del" :disabled="!selectedItems.length">删除标签</button>
    </div>
    <jPageMsg v-else :code="pageState.code" :msg="pageState.msg"></jPageMsg>
    <!--<div class="jurisdiction">您没有公有标签的修改权限</div>-->
    <!--弹出框内容-->
    <j-common-label ref="common_dialog" @saved='saved' @saveLabelSuccess="loadTags"></j-common-label>
    <j-confirm :msg="confirmMsg" ref='delConfirm' @confirm='delData'></j-confirm>
    <jLoading v-show="pageState.code==Code.Loading"></jLoading>
    <jOperaMsg ref='operaMsg' :code="operaState.code" :msg="operaState.msg"></jOperaMsg>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { jSelect, jTags, jConfirm, jLoading, jOperaMsg, jPageMsg } from '../../components'
import jCommonLabel from '../components/jCommonLabel.vue'
import { Code } from '../../assets/js/operaCode.js'
import { AUTHS } from '../../assets/js/handleAuth.js'
let queryHandle = 0
export default {
  name: 'publiclist',
  data() {
    return {
      keyword: '',
      type: '',
      tags: [],
      confirmMsg: '',
      totalTags: [],
      Auth: {
        add: AUTHS.AddPublicLabel,
        del: AUTHS.DelPublicLabel
      },
      pageState: {
        code: Code.Loading,
        msg: ''
      },
      operaState: {
        code: 1,
        msg: ''
      },
      Code: Code
    }
  },
  computed: {
    opinionKeyword() {
      var opinionKeywordLevel = this.$store.state.opinion_keyword_level
      return [{ name: '全部', value: '' }].concat(...opinionKeywordLevel)
    },
    selectedItems() {
      return this.tags.filter(tag => { return tag.selected })
    }
  },
  created() {
    this.loadTags()
  },
  methods: {

    delTag() {
      let name = this.selectedItems.map(tag => { return tag.name }).join(',')
      this.confirmMsg = `确定要删除标签${name}吗?`
      this.$refs.delConfirm.show()
    },
    delData() {
      let ids = this.selectedItems.map(tag => { return tag.id }).join(',')
      this.delTags({ id: ids }).then(rtn => {
        this.operaState.code = 1
        this.operaState.msg = '删除成功！'
        this.$refs.operaMsg.show()
        this.loadTags()
      }).catch(err => {
        this.operaState.code = -1
        this.operaState.msg = err.msg || '删除失败！'
        this.$refs.operaMsg.show()
      })
    },
    add() {
      this.$refs.common_dialog.show()
    },
    parseFn(tag) {
      return {
        id: tag.id,
        name: tag.keyword,
        selected: false,
        selecting: false
      }
    },
    // 条件查询（和列表是两个方法）
    query() {
      let task = this.queryTags({
        keyword: this.keyword,
        type: this.type
      })

      let curTags = []
      let fn = (tag) => {
        let selecting = false
        curTags.map((item) => {
          if (item.name === tag.name) {
            selecting = true
          }
        })

        return {
          id: tag.id,
          name: tag.name,
          selected: false,
          selecting: selecting
        }
      }

      task.then(() => {
        curTags = this.$store.getters.queryPublic.map(this.parseFn)
        if (this.type === 0 && this.keyword === '') {
          this.tags = this.$store.getters.publicTags.map(this.parseFn)
        } else {
          this.tags = this.totalTags.map(fn)
        }
      })
    },
    loadTags() {
      let task = this.getTags()

      task.then(() => {
        this.tags = this.$store.getters.publicTags.map(this.parseFn)
        this.totalTagsRaw = this.tags
        this.totalTags = this.tags
        this.pageState.code = Code.Success
      }).catch(err => {
        this.pageState = err
      })
    },
    saved() {
      this.loadTags()
    },
    filterChange() {
      if (queryHandle) {
        clearTimeout(queryHandle)
      }
      queryHandle = setTimeout(this.query(), handleDelay)
    },
    ...mapActions({
      getTags: 'getPublicTags',
      delTags: 'delPublicTags',
      queryTags: 'getPublicQuery'
    })
  },
  components: {
    jSelect,
    jTags,
    jCommonLabel,
    jConfirm,
    jLoading,
    jPageMsg,
    jOperaMsg
  }
}
</script>

<style scoped lang='less'>
.public-content {
  .top-title {
    border-bottom: 1px solid #ccc;
    display: -ms-flexbox;
    display: flex;
    .title-label {
      margin: 0px 0 20px 0;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .public-search {
    margin-top: 17px;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    .input-group {
      margin: 0px;
    }
    .publist-list-category {
      position: absolute;
      right: 0px;
    }
  }
  .public-main {
    height: 310px;
    border: 1px solid #ccc;
    margin: 14px 0 20px 0;
    background: #f4f4f4;
    padding: 10px 30px;
    overflow-y: auto;
  }
  .jurisdiction {
    width: 201px;
    height: 23px;
    line-height: 23px;
    color: #d44e19;
    padding-left: 36px;
    border: 1px solid #f5a76e;
    background: #ffeae5;
    margin-top: 11px;
    font-size: 12px;
    background-image: url(../../assets/images/public.png);
    background-repeat: no-repeat;
    background-position: 7% 40%;
  }
}
</style>
