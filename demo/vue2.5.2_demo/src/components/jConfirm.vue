<template>
  <j-dialog :initTitle="title" :initShow="false" :initShowTitle='showTitle' class="confirm_dialog" ref="dialog">
    <span class='deleteData' v-html="msg"></span>
    <div class="btn">
      <button class="save-btn" @click="deleteById(callFunc)">确 定</button>
      <button class="cancle-btn" @click="close()">取 消</button>
    </div>
  </j-dialog>
</template>

<script>
import jDialog from './jDialog.vue'

export default {
  name: 'jConfirm',
  props: {
    title: {
      type: String
    },
    msg: {
      type: String
    },
    params: {
    },
    callFunc: {
      type: String,
      default: 'confirm'
    }
  },
  computed: {
    showTitle() {
      return !!this.title
    }
  },
  methods: {
    deleteById(methodOfParent) {
      this.$emit(methodOfParent, this.params)
      this.$refs.dialog.show = false
    },
    close() {
      this.$refs.dialog.show = false
    },
    show() {
      this.$refs.dialog.show = true
    }
  },
  components: {
    jDialog
  }
}
</script>

<style lang="less" scoped>
.confirm_dialog {
  width: 371px;
  height: 181px;
  color: rgba(0, 0, 0, 0.8);
}

.btn {
  text-align: center;
  button:nth-child(2) {
    margin-left: 20px;
  }
}

.deleteData {
  display: block;
  margin-top: 34px;
  margin-bottom: 30px;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}
</style>
