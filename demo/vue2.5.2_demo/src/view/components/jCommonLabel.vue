<template>
  <!--关联舆情弹出框-->
  <j-dialog initTitle="添加公有标签" :initShow="false" class='tags_dialog' ref="dialog">
    <div class='labelBox'>
      <div class="label-name">
        <label>标签名称：</label>
        <input type='text' id='keyword' v-model="category.keyword" name="category" v-validate="'required'" :class="{ 'error': errors.has('category') }" @keydown.enter="save" />
        <div class="jurisdiction" v-show="errMsg">{{errMsg}}</div>
      </div>
      <div class="label-rank">
        <label>标签级别：</label>
        <input type="radio" name="grade" value='26' v-model="category.type" />
        <label>重大</label>
        <input type="radio" name="grade" value='27' v-model="category.type" />
        <label> 一般</label>
      </div>
      <div class="btn">
        <button class="save-btn" @click="save">确 认</button>
        <button class="cancle-btn" @click="close">取 消</button>
      </div>
    </div>
  </j-dialog>
</template>
<script>
import { jDialog } from '../../components'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: '',
      category: { keyword: '', type: 26 },
      errMsg: ''
    }
  },
  methods: {
    save() {
      var validate = this.$validator.validateAll()
      validate.then(() => {
        var params = this.category
        if (params.keyword.length > 8) {
          this.errMsg = '标签名称不超过8个字'
          return
        }
        var rtn = this.addPublicTags(params)
        rtn.then(result => {
          if (result.code == 1) {
            this.$emit('saveLabelSuccess')
            //                    alert(result.msg);
            this.close()
            this.category.keyword = ''
          } else {
            this.errMsg = result.msg
          }
        }).catch(err => {
          this.errMsg = err.msg// 公有标签名称已存在
        })
      }).catch(err => {
        this.errMsg = '标签名称不能为空'
      })
    },
    show() {
      this.category = { keyword: '', type: 26 }
      this.$refs.dialog.show = true
      // setTimeout(()=> {
      //     this.category = Object.assign({keyword:'',type:0}, this.initCategory||{});
      // }, 0);
    },
    close() {
      this.errMsg = ''
      this.$refs.dialog.show = false
    },
    ...mapActions({
      addPublicTags: 'addPublicTags'
    })
  },
  components: {
    jDialog
  }
}
</script>
<style scoped lang='less'>
.tags_dialog {
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
  .label-rank {
    margin: 11px 0 0 67px;
    input {
      width: 13px;
      height: 13px;
      margin-left: 19px;
      vertical-align: middle;
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
    margin-top: 37px;
    text-align: center;
    button:nth-child(2) {
      margin-left: 37px;
    }
  }
}
</style>
