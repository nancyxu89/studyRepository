<template>
  <!--添加企业备注-->
  <j-dialog initTitle="添加企业备注" :initShow="false" class='remark_dialog' ref="dialog">
    <div class='bouncedBox'>
      <label style="vertical-align:top">备注：</label>
      <textarea class='remarkInfor' autofocus='autofocus' v-model='message' maxlength="500"></textarea>
      <p class='tip'>为该企业添加备注，字数500字以内。</p>
      <button class="save-btn" @click="save" :disabled="!message.trim()||saving">确定</button>
      <button class="cancle-btn" @click="close">取 消</button>
    </div>
    <jLoading v-show="loading"></jLoading>
    <jOperaMsg ref="operaMsg" :code="operaState.code" :msg="operaState.msg" @close="close"></jOperaMsg>
  </j-dialog>
</template>
<script>
import { jDialog, jLoading, jOperaMsg } from '../../components'
import { markMsg as api } from '../../api'
import { Code } from '../../assets/js/operaCode.js'
var initVal = ''
var inited = false
export default {
  props: {
    entId: {
      type: String | Number
    }
  },
  data() {
    return {
      message: '',
      Code: Code,
      loading: true,
      saving: false,
      operaState: {
        code: Code.Loading,
        msg: ''
      }
    }
  },
  methods: {
    save() {
      var msg = this.message.trim()
      this.saving = true
      api.addMark({ entId: this.entId, remark: msg }).then(rtn => {
        initVal = msg
        this.$emit('save', msg)
        this.saving = false
        this.operaState.code = Code.Success
        this.operaState.msg = '保存成功！'
        this.$refs.operaMsg.show()
      }).catch(err => {
        this.saving = false
        this.operaState.code = -1
        this.operaState.msg = err.msg || '保存失败！'
        this.$refs.operaMsg.show()
      })
    },
    close() {
      try {
        this.message = initVal
        this.$refs.dialog.show = false
      } catch (err) {
        console.log('err')
      }
    },
    show() {
      if (!inited) {
        this.getRemark()
        inited = true
      }
      this.$refs.dialog.show = true
    },
    getRemark() {
      this.loading = true
      return api.getMartMsg({ entId: this.entId }).then(rtn => {
        this.message = rtn.data
        initVal = rtn.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        this.operaState.code = -1
        this.operaState.msg = err.msg || '系统错误！'
      })
    }
  },
  // mounted() {
  //   this.getRemark()
  // },
  components: {
    jDialog,
    jLoading,
    jOperaMsg
  }
}
</script>
<style scoped lang='less'>
.remark_dialog {
  width: 455px;
  color: rgba(0, 0, 0, 0.8);
}

.bouncedBox {
  .addType {
    margin: 25px 0 25px 30px;
  }
  .tip {
    color: #666;
    font-size: 12px;
    margin: 12px 0 36px 37px;
  }
  .remarkInfor {
    width: 356px;
    height: 140px;
    border: 1px solid #bebebe;
    resize: none;
    outline: none;
  }
  ul {
    width: 100%;
    .shotName {
      p {
        padding-left: 20%;
        padding-top: 4px;
        color: #999;
      }
    }
    li:nth-child(3) {
      margin-top: 12px;
    }
    li {
      float: left;
      width: 100%;
      margin-top: 30px;
      label {
        width: 20%;
        display: inline-block;
        text-align: right;
      }
      input {
        width: 297px;
        height: 30px;
        border: 1px solid #ccc;
      }
    }
  }
  hr {
    width: 85%;
    margin: 0 auto;
    border: 1px solid #d5d5d5;
    margin-top: -10px;
  }
  .focus {
    margin: 10px 0 0 34px;
  }
  .save-btn {
    margin-right: 25px;
    margin: 20px 25px 0 65px;
  }
}
</style>
