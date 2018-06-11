<template>
  <div class="private-content">
    <div class="top-title">
      <div class="title-label">私有标签</div>
    </div>
    <div v-if="pageState.code==Code.Loading||pageState.code==Code.Success">
      <div class="public-main">
        <div class="jurisdiction" v-show="tags.length>=10">您已添加10个标签,想添加新标签请先删除已有标签!</div>
        <jTags v-model="tags"></jTags>
      </div>

      <button class="cancle-btn" @click="add()" :disabled="tags.length>=10">+ 添加标签</button>
      <button class="save-btn" @click='delTag()' :disabled="!selectedItems.length">删除标签</button>
    </div>
    <jPageMsg v-else :code="pageState.code" :msg="pageState.msg"></jPageMsg>

    <!--弹出框内容-->
    <j-private-label ref="private_dialog" @saveLabelSuccess="loadTags"></j-private-label>
    <j-confirm :msg="confirmMsg" ref='delConfirm' @confirm='delData'></j-confirm>
    <jLoading v-show="pageState.code==Code.Loading"></jLoading>
    <jOperaMsg ref='operaMsg' :code="operaState.code" :msg="operaState.msg"></jOperaMsg>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { jPaging, jSortButton, jDatePicker, jSelect, jTags, jConfirm, jLoading, jPageMsg, jOperaMsg } from '../../components'
import jPrivateLabel from '../components/jPrivateLabel.vue'
import { Code } from '../../assets/js/operaCode.js'
export default {
  name: 'privateTags',
  data: function () {
    return {
      tags: [],
      confirmMsg: '',
      pageState: {
        code: Code.Loading,
        msg: ''
      },
      operaState: {
        code: 1,
        msg: ''
      },
      Code: Code,
    };
  },
  mounted: function () {
    this.loadTags();
  },
  computed: {
    selectedItems() {
      return this.tags.filter(tag => { return tag.selected });
    }
  },
  methods: {

    add() {
      this.category = {};
      this.$refs.private_dialog.show();
    },

    delTag() {
      let name = this.selectedItems.map(tag => { return tag.name }).join(',');
      this.confirmMsg = `确定要删除标签${name}吗?`;
      this.$refs.delConfirm.show();
    },
    loadTags() {
      this.pageState.code = Code.Loading;
      let task = this.getTags();
      let fn = (tag) => {
        return { id: tag.id, name: tag.keyword, selected: false, selecting: false };
      }
      task.then(() => {
        this.tags = this.$store.getters.privateTags.map(fn);
        this.pageState.code = Code.Success;
      }).catch(err => {
        this.pageState = err;
      });
    },
    //删除
    delData: function () {
      let ids = this.selectedItems.map(tag => { return tag.id }).join(',');
      this.delTags({ id: ids }).then(rtn => {
        this.operaState.code = 1;
        this.operaState.msg = '删除成功！';
        this.$refs.operaMsg.show();
        this.loadTags();
      }).catch(err => {
        this.operaState.code = -1;
        this.operaState.msg = err.msg || '删除失败！';
        this.$refs.operaMsg.show();
      })
    },
    saved() {
      this.loadTags();
    },
    ...mapActions({
      getTags: 'getPrivateTags',
      delTags: 'delPrivateTags'
    })
  },
  components: {
    jSelect,
    jTags,
    jPrivateLabel,
    jConfirm,
    jLoading,
    jPageMsg,
    jOperaMsg
  }
}
</script>
<style scoped lang='less'>
.private-content {
  position: relative;
  .top-title {
    display:-ms-flexbox;display:flex;
    .title-label {
      margin: 0px 0 20px 0;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .public-main {
    height: 183px;
    border: 1px solid #ccc;
    margin: 2px 0 20px 0;
    background: #f4f4f4;
    padding: 10px 20px;
  }
  .jurisdiction {
    width: 460px;
    height: 23px;
    line-height: 23px;
    color: #c4780c;
    padding-left: 35px;
    border: 1px solid #f5ba6e;
    background: #f5efdb;
    font-size: 12px;
    background-image: url(../../assets/images/private.png);
    background-repeat: no-repeat;
    background-position: 3% 40%;
  }
}
</style>
