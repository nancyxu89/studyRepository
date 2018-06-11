<template>
  <j-dialogOne :initTitle="title" :initShow="show" class="attr_dialog" ref="dialog">
    <span class='deleteData'>{{title}}</span>
    <div class="btn">
        <button class="save-btn"  @click='save'>确 定</button>
        <button class="cancle-btn" @click="close">取 消</button>
    </div>
  </j-dialogOne>
</template>

<script>
import { mapActions } from 'vuex'
import { jDialogOne } from '../../components'
export default{
  data() {
    return {
      isAdd: true,
      types: [],
      show: false
    }
  },
  computed: {
    title() {
      return this.isAdd ? '确定要删除这条预警推送吗' : '确定要删除数据源吗'
    }
  },
  methods: {
    save() {
      let selTypes = this.types.filter(type => type.selected)
      let ev = {
        selTypes,
        canSave: true
      }
      this.$emit('saving', ev)
      if (ev.canSave) {
        // 执行保存
        let rtn
        if (this.isAdd) {
          rtn = this.cancelAttention({
            entId: this.entId
            //                         projectType: selTypes
          })
        } else {
          rtn = this.modify()
        }
        rtn.then(r => {
          if (r) {
            this.$emit('input', selTypes)
            this.$emit('save', selTypes)
            this.close()
          }
          // else {

          // }
        })
      }
    },
    showOpt() {
      this.$refs.dialog.show = true
    },

    close() {
      this.$refs.dialog.show = false
    },
    ...mapActions({
      cancelAttention: 'cancelAttention'
    })
  },
  components: {
    jDialogOne
  }
}
</script>

<style lang="less" scoped>
    .attr_dialog {
        width:371px;
        height:181px;
        color: rgba(0, 0, 0, 0.8);
    }
    .btn{
        text-align:center;
        margin-top:52px;
        text-align:center;
        button:nth-child(2){
            margin-left:20px;
        }
    }
    .deleteData{
        display:block;
        margin-top:34px;
        margin-bottom:44px;
        font-size:14px;
        text-align: center;
    }
</style>
