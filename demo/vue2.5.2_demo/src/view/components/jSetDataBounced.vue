<template>
  <!--设置数据源类别弹出框-->
  <j-dialog :initTitle="title" :initShow="false" class='category_dialog' ref="dialog" id='title'>
    <div class='setData'>
      <label>类别名称：</label>
      <input type='text' id='dataSourceTypeName' v-model="category.dataSourceTypeName" name="category" v-validate="'required'" maxlength="20" :class="{ 'error': errors.has('category') }" @keydown.enter="save" />
      <div class="jurisdiction" v-show="errMsg">{{errMsg}}</div>
      <div class='choice'>
        <button class='save-btn' @click='save' :disabled="!category.dataSourceTypeName">保存</button>
        <button class='cancle-btn' @click='close'>取消</button>
      </div>
    </div>
  </j-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import { jDialog } from '../../components'

export default {
  props: {
    initCategory: {
      type: Object
    }
  },
  data() {
    return {
      category: { dataSourceTypeName: '' },
      errMsg: ''
    }
  },
  computed: {
    isAdd() {
      return !this.category.id
    },
    title() {
      return this.isAdd ? '添加数据源类别' : '修改数据源类别'
    }
  },
  methods: {
    close() {
      this.errMsg = ''
      this.$refs.dialog.show = false
    },
    show() {
      this.$refs.dialog.show = true
      // this.category = Object.assign({dataSourceTypeName:''}, this.initCategory);
      setTimeout(() => {
        this.category = Object.assign({ dataSourceTypeName: '' }, this.initCategory || {})
      }, 0)
    },
    save() {
      var validate = this.$validator.validateAll()
      validate.then(() => {
        var params = this.category
        var method = this.isAdd ? 'addDataSourceType' : 'updateDataSourceType'
        var rtn = this[method](params)
        rtn.then(result => {
          if (result.code == 1) {
            this.close()
            this.$emit('saved', this.isAdd)
          } else {
            this.errMsg = result.msg
          }
        }).catch(err => {
          this.errMsg = err.msg
        })
      }).catch(err => {
        this.errMsg = '类别名称不能为空'
      })
    },
    ...mapActions({
      addDataSourceType: 'addDataSourceType',
      updateDataSourceType: 'updateDataSourceType'
    })
  },
  components: {
    jDialog
  }
}
</script>
<style scoped lang='less'>
.category_dialog {
  width: 700px;
  height: 400px;
  color: rgba(0, 0, 0, 0.8);
}

.setData {
  label {
    margin-left: 74px;
  }
  input {
    width: 410px;
    height: 40px;
    border: 1px solid #ccc;
    margin-left: 15px;
    margin-top: 30px;
  }
  .choice {
    width: 350px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 20px;
    button {
      margin-left: 30px;
      cursor: pointer;
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
</style>
