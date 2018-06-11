<template>
  <!--关联舆情弹出框-->
  <j-dialog initTitle="添加私有标签" class='private_dialog' ref="dialog">
    <div class='labelBox'>
      <div class="label-name">
        <label>标签名称：</label>
        <!--<input type='text' maxlength="8" v-model="category.privateKeywordName" name="category" v-validate="'required'" :class="{ 'error': errors.has('category') }" @keydown.enter="save" />-->
        <input type='text' maxlength="8" v-model="name" name="name" v-validate="'required|max:5'" :class="{ 'error': errors.has('name') }" @keydown.enter="save" />
        <div class="jurisdiction" v-show="errMsg">{{errMsg}}</div>
      </div>
      <div class="btn">
        <button class="save-btn" @click="save" :disabled="!name">确 认</button>
        <button class="cancle-btn" @click="close">取 消</button>
      </div>
    </div>
    <jOperaMsg :code="1" msg="保存成功" ref="operamsg" @close="close"></jOperaMsg>
  </j-dialog>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { jDialog, jOperaMsg } from '../../components'
export default {
  data() {
    return {
      name: '',
      errMsg: ''
    }
  },
  methods: {

    save() {
      var validate = this.$validator.validateAll()
      validate.then(() => {
        var params = { privateKeywordName: this.name }
        var rtn = this.addPrivateTags(params)
        rtn.then(result => {
          this.$emit('saveLabelSuccess')
          this.$refs.operamsg.show()
        }).catch(err => {
          this.errMsg = err.msg// 私有标签名称已存在
        })
      }).catch(err => {
        this.errMsg = '标签名称不能为空'
      })
    },
    reset() {
      this.name = ''
      this.errMsg = ''
      this.$refs.operamsg.close()
    },
    show() {
      this.$refs.dialog.show = true
    },
    close() {
      this.$refs.dialog.show = false
      this.reset()
    },
    ...mapActions({
      addPrivateTags: 'addPrivateTags'
    })
  },
  components: {
    jDialog,
    jOperaMsg
  }
}
</script>
<style scoped lang='less'>
.private_dialog {
  width: 566px;
  height: 294px;
  color: rgba(0, 0, 0, 0.8);
}

.labelBox {
  .label-name {
    margin: 28px 0 0 67px;
    input {
      width: 333px;
      height: 34px;
      border: 1px solid #bebebe;
      margin-left: 19px;
      &:focus {
        border: 1px solid #ff4a2c;
      }
    }
    .jurisdiction {
      width: 201px;
      height: 23px;
      line-height: 23px;
      color: #ff4a2c;
      padding-left: 102px;
      margin-top: 11px;
      font-size: 12px;
      background-image: url(../../assets/images/label.png);
      background-repeat: no-repeat;
      background-position: 28% 40%;
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
  .btn {
    margin-top: 25px;
    text-align: center;
    button:nth-child(2) {
      margin-left: 37px;
    }
  }
}
</style>
