<template>
  <!--关联舆情弹出框-->
  <j-dialog :initTitle="title" :initShow="isShow" class='attr_dialog' ref="dialog">
    <div class='bouncedBox'>
      <ul class='clearFix'>
        <li>
          <label>关联企业名称：</label>
          <input maxlength="30" type='text' v-model="relationCompanyName" />
        </li>
        <li class='shotName'>
          <label>企业简称：</label>
          <input maxlength="30" type='text' v-model="companyShortname" />
          <br/>
          <p>输入多个简称请以逗号分隔</p>
        </li>
        <li>
          <label style="vertical-align:top">备注：</label>
          <textarea maxlength="200" v-model="remarks" cols="40" rows="3"></textarea>
        </li>
      </ul>
      <button class="save-btn" @click="save" :disabled="isDisabled">确定</button>
      <button class="cancle-btn" @click="close">取 消</button>
    </div>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg" @close="close"></jOperaMsg>
  </j-dialog>
</template>
<script>
import { jDialog, jOperaMsg } from '../../components'
import { selfDefineList as api } from '../../api'
export default {
  data() {
    return {
      isAdd: true,
      types: [],
      isShow: false,
      relationCompanyName: '',
      companyShortname: '',
      remarks: '',
      isDisabled: true,
      opera: {
        code: 1,
        msg: ''
      }
    }
  },
  computed: {
    title() {
      return this.isAdd ? '设置自定义关联企业' : '修改项目类型'
    }
  },
  watch: {
    listId() {
      if (this.listId !== 0) {
        this.getData(this.listId)
      }
    },
    relationCompanyName(val) {
      if (val !== '' && this.companyShortname !== '') {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    },
    companyShortname(val) {
      if (val !== '' && this.relationCompanyName !== '') {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  },
  props: {
    listId: {
      type: Number
    },
    entId: {
      type: String
    }
  },
  methods: {
    clear() {
      this.relationCompanyName = ''
      this.companyShortname = ''
      this.remarks = ''
    },
    save() {
      if (this.listId >= 0) {
        this.updataData()
      } else {
        this.saveData()
      }
    },
    show() {
      this.$refs.dialog.show = true
    },
    close() {
      this.$refs.dialog.close()
    },
    getData(id) {
      if (this.listId < 0) {
        this.clear()
        return
      }
      api.queryData({ id: this.listId }).then(data => {
        if (data.msg === 'ok') {
          this.relationCompanyName = data.data.entName
          this.companyShortname = data.data.entShortName
          this.remarks = data.data.remark
        }
      })
    },
    saveData() {
      let paramsJson = {
        attentionCutomerId: this.$route.params.id,
        entName: this.relationCompanyName || '',
        entShortName: this.companyShortname || '',
        remark: this.remarks || ''
      }
      api.addData(paramsJson).then(data => {
        if (data.msg === '添加成功') {
          this.$emit('saving')
          this.toastPrompt(1, data.msg)
        } else {
          this.toastPrompt(-1, data.msg)
        }
      })
    },
    updataData() {
      let paramsJson = {
        id: this.listId,
        entName: this.relationCompanyName || '',
        entShortName: this.companyShortname || '',
        remark: this.remarks || ''
      }
      api.resetData(paramsJson).then(data => {
        console.log(data)
        if (data.msg === '更新成功') {
          this.$emit('saving', 0)
          this.toastPrompt(1, data.msg)
        } else {
          this.toastPrompt(-1, data.msg)
        }
      })
    },
    toastPrompt(code, msg) {
      this.opera.code = code
      this.opera.msg = msg
      this.$refs.operaMsg.show()
    }
  },
  created: function() {

  },
  components: {
    jDialog, jOperaMsg
  }
}
</script>
<style scoped lang='less'>
.attr_dialog {
  width: 455px;
  height: 400px;
  color: rgba(0, 0, 0, 0.8);
}

.bouncedBox {
  width: 454px;
  height: 293px;
  .addType {
    margin: 25px 0 25px 30px;
  }
  input[type="text"],
  textarea {
    border: 1px solid #ccc;
  }
  textarea {
    padding: 5px 6px;
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
    margin: 20px 25px 0 80px;
  }
}
</style>
