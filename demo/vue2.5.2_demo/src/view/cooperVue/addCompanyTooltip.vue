<template>
  <j-dialog :initShow="false" initTitle="添加企业" :initShowTitle='true' ref="dialog" class="attr-dialog">
    <div class='bouncedBox'>
      <ul class='clearFix'>
        <li>
          <label>企业名称：</label>
          <input maxlength="30" type='text' v-model="entName" />
        </li>
        <li class='shotName'>
          <label>企业简称：</label>
          <input maxlength="30" type='text' v-model="entShortName" />
          <br/>
          <p>输入多个简称请以逗号分隔</p>
        </li>
      </ul>
      <button class="save-btn" @click="save" :disabled="!canSave">确定</button>
    </div>
    <jSyncEntMsg ref="operaMsg" :code="opera.code" :msg="opera.msg" :data="opera.data" :delay="5000" @close="close"></jSyncEntMsg>
  </j-dialog>
</template>
<script>
import { jDialog, jSyncEntMsg } from '../../components'
import { attention as api } from '../../api'
export default {
  data() {
    return {
      entName: '',
      entShortName: '',
      saving: false,
      opera: {
        code: 1,
        msg: '',
        data: {}
      }
    }
  },
  methods: {
    show() {
      this.entName = ''
      this.entShortName = ''
      this.$refs.dialog.show = true
    },
    save() {
      let params = {
        entName: this.entName.trim(),
        entShortName: this.entShortName.trim()
      }
      this.saving = true

      api.addCompany(params).then(data => {
        this.opera.code = 4
        this.$refs.operaMsg.show()
        this.saving = false
      }).catch(err => {
        if (err.errCode === 200) {
          this.opera.code = 3
        } else if (err.errCode === -1) {
          this.opera.code = 2
          this.opera.data = err.data
        } else {
          this.opera.code = -1
          this.opera.msg = err.msg || '添加失败！'
        }
        this.saving = false
        this.$refs.operaMsg.show()
      })
    },
    close() {
      this.$refs.dialog.close()
    }
  },
  computed: {
    canSave() {
      return this.entName.trim() && this.entShortName.trim() && !this.saving
    }
  },
  components: {
    jDialog, jSyncEntMsg
  }
}
</script>
<style lang="less" scoped>
.attr-dialog {
  width: 455px;
  height: 520px;
  color: rgba(0, 0, 0, 0.8);
}

.bouncedBox {
  width: 100%;
  height: 200px;
  text-align: center;
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
        padding-left: 25%;
        text-align: left;
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
        width: 21%;
        display: inline-block;
        text-align: right;
      }
      input {
        width: 280px;
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
    margin-top: 20px;
  }
}
</style>
