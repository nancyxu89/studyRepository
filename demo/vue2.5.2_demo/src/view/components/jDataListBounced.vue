<template>
  <!--数据列表添加弹出框-->
  <j-dialog :init-title="title" :init-show="false" class='attr_dialog' ref="dialog">
    <div class='setDataOrign'>
      <ul class='dataListMsg'>
        <li>
          <label>数据源名称：</label>
          <input type='text' placeholder="请输入数据源" v-validate="'required|max:20'" :class="{'input': true, 'is-danger': errors.has('dataSourceName') }" name="dataSourceName" v-model="dataSource['dataSourceName']" />
          <span v-show="errors.has('dataSourceName')" class="help is-danger">{{ errors.first('dataSourceName') }}</span>
        </li>
        <li>
          <label>网址：</label>
          <input type='text' class='webSite' placeholder='请输入网址' v-validate="'required|url'" :class="{'input': true, 'is-danger': errors.has('url') }" name="url" v-model="dataSource['dataSourceUrl']" />
          <span v-show="errors.has('url')" class="help is-danger">{{ errors.first('url') }}</span>
        </li>
        <li class='clearFix'>
          <label class='typeName'>数据源类别：</label>
          <div class='clearFix dataType'>
            <button v-for='foo in dataSourceTypeList' :class='{ active: foo.id == dataSource.dataSourceTypeId }' v-validate="'required'" :value="foo.id" @click='active(foo.id)'>{{foo.dataSourceTypeName}}</button>
          </div>
        </li>
        <li>
          <label>监测状态：</label>
          <button class='open' :class='{ active: 42===dataSource.onOff}' @click='switchStatus(42)'>开启</button>
          <button class='pause' :class='{ active: 43===dataSource.onOff}' @click='switchStatus(43)'>暂停</button>
        </li>
      </ul>
      <div class='footer'>
        <button class='save-btn' @click="save">确定</button>
        <button class='cancle-btn' @click='close'>取消</button>
      </div>
    </div>
  </j-dialog>
</template>
<script>
import { jDialog } from '../../components'
import http from '../../api/request'

export default {
  props: {
    title: {
      type: String
    },
    item: {
      type: Object
    }
  },
  data() {
    return {
      opened: null,
      dataSourceTypeList: [],
      dataSource: {}
    }
  },
  watch: {
    item: function(curVal) {
      this.dataSource = curVal
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(() => {
        // alert('From Submitted!');
        this.$emit('saveOrUpdate', this.dataSource)
      }).catch(() => {
        alert('验证错误!请根据提示修正。')
      })
    },
    close: function() {
      this.$refs.dialog.show = false
    },
    show: function() {
      this.$refs.dialog.show = true
    },
    save: function() {
      // 调用父类的方法
      this.validateBeforeSubmit()
    },
    active: function(index) {
      // this.$set(this.dataSource, 'dataSourceTypeId', index);
      this.dataSource.dataSourceTypeId = index
    },
    switchStatus: function(st) {
      // this.$set(this.dataSource, 'onOff', st);
      this.dataSource.onOff = st
    },
    queryType: function(pageIdx = 1) {
      http.post('/dataSourceType/list').then(data => {
        this.dataSourceTypeList = data.data
      })
    }
  },
  created() {
    this.$validator.updateDictionary({
      'zh_CN': {
        // messages: arabic.messages,
        attributes: {
          dataSourceName: '数据源',
          url: '网站'
        }
      }
    })
  },
  mounted: function() {
    this.queryType()
  },
  components: {
    jDialog
  }
}
</script>
<style scoped lang='less'>
.attr_dialog {
  width: 696px;
  height: 500px;
  color: rgba(0, 0, 0, 0.8);
}

.setDataOrign {
  .dataListMsg {
    margin: 20px 0 0 35px;
    li {
      margin-bottom: 20px;
      input {
        width: 216px;
        height: 28px;
        border: 1px solid #ccc;
        padding-left: 20px;
      }
      .webSite {
        width: 292px;
      }
      label {
        width: 100px;
        display: inline-block;
      }
      .active {
        background: #60a9f8!important;
        color: #fff;
      }
    }
    .typeName {
      float: left;
    }
    .dataType {
      width: 510px;
      float: left;
      button {
        float: left;
        padding: 10px 24px;
        margin: 0 20px 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #fff;
      }
    }
    .open,
    .pause {
      width: 72px;
      height: 28px;
      border: 1px solid #ccc;
      background: #fafafa;
      margin-right: 10px;
      border-radius: 4px;
    }
  }
  .footer {
    width: 325px;
    margin: 0 auto;
    .save-btn {
      margin: 20px 35px 20px 0;
    }
  }
  .input.is-danger,
  .textarea.is-danger {
    border-color: #ff3860
  }
}
</style>
