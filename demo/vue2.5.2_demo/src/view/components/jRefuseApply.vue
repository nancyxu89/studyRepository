<template>
  <!--拒绝申请弹框-->
  <j-dialog :initTitle="title" :initShow="false" class='attr_dialog' ref="dialog">
    <div class='bouncedBox'>
      <label style="vertical-align:top" >{{label}}：</label>
      <textarea name='' class='remarkInfor' autofocus='autofocus' v-model='reason'></textarea>
      <button class="save-btn" @click="save" :disabled="!reason.trim()">确定拒绝</button>
      <button class="cancle-btn" @click="close">取 消</button>
    </div>
  </j-dialog>
</template>
<script>
  import { jDialog } from '../../components'
  import { dataAudit as api } from '../../api'
  export default{
    props: {
      title: {
        type: String
      },
      label: {
        type: String
      }
    },
    data() {
      return {
        reason: ''
      }
    },
    methods: {
      save() {
        var reason = this.reason.trim()
        if (!reason) {
          alert('请填写监测失败原因!')
          return
        }
        this.close()
        this.$emit('save', this.reason)
      },
      close() {
        this.$refs.dialog.show = false
      },
      show() {
        this.reason = ''
        this.$refs.dialog.show = true
      }
    },
    components: {
      jDialog
    }
  }
</script>
<style scoped lang='less'>
    .attr_dialog {
        width: 597px;
        height: 400px;
        color: rgba(0, 0, 0, 0.8);
    }
    .bouncedBox{
        margin:18px 0 0 36px;
        .addType{
            margin:25px 0 25px 30px;
        }
        .tip{
            color:#666;
            font-size:12px;
            margin:12px 0 36px 37px;
        }
        .remarkInfor{
            width:356px;
            height:140px;
            border:1px solid #bebebe;
            resize:none;
            outline:none;
        }
        ul{
            width:100%;
            .shotName{
                p{
                    padding-left:20%;
                    padding-top:4px;
                    color:#999;
                }
            }
            li:nth-child(3){
                margin-top:12px;
            }
            li{
                float:left;
                width:100%;
                margin-top:30px;
                label{
                    width:20%;
                    display:inline-block;
                    text-align:right;
                }
                input{
                    width:297px;
                    height:30px;
                    border:1px solid #ccc;
                }
            }
        }
        hr{
            width:85%;
            margin:0 auto;
            border:1px solid #d5d5d5;
            margin-top:-10px;
        }
        .focus{
            margin:10px 0 0 34px;
        }
        .save-btn{
            margin-right:25px;
            margin:40px 25px 24px 100px;
        }
    }
</style>
