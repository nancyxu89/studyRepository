<template>
    <!--数据申请详情-->
    <j-dialog :init-title="title" :init-show="false" :init-show-title='showTitle' class='attr_dialog' ref="dialog">
        <div class='bouncedBox'>
            <ul class='dataList'>
                <li><label>数据源名称：</label>{{itemList['dataSourceName']}}</li>
                <li><label>数据源类别：</label>{{itemList['dataSourceTypeName']}}</li>
                <li><label>网址：</label>{{itemList['dataSourceUrl']}}</li>
                <li><label>申请时间：</label>{{itemList['applyTime'] | dateFormat}}</li>
                <li><label>申请人：</label>{{itemList['applyPersonName']}}</li>
                <!--<li><label>申请人所在部门：</label>{{itemList['departMentName']}}</li>-->
            </ul>
            <hr/>
            <ul class='dataListOne'>
                <li><label>审核状态：</label>{{itemList['auditStatus'] | enumConvert}}</li>
                <li><label>不通过原因：</label>{{itemList['additRefuseReason']}}</li>
                <li><label>审核时间：</label>{{itemList['auditTime'] | dateFormat}}</li>
            </ul>
            <hr/>
            <ul class='dataListTwo'>
                <li><label>处理状态：</label>{{itemList['opinionplatAddStatus'] | enumConvert}}</li>
                <li><label>监测失败原因：</label>{{itemList['opinionplatRefuseReason']}}</li>
                <li><label>处理时间：</label>{{itemList['opinionplatAddTime'] | dateFormat}}</li>
            </ul>
        </div>
    </j-dialog>
</template>
<script>
  import { jDialog } from '../../components'
  export default{
    props: {
      title: { type: String},
      itemList: { type: Object}
    },
    computed: {
      showTitle() {
        return !!this.title
      }
    },
    methods: {
      close: function() {
        this.$refs.dialog.show = false
      },
      show: function() {
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
        width: 455px;
        height: 400px;
        color: rgba(0, 0, 0, 0.8);
    }
    .bouncedBox{
        margin:22px 22px 22px 22px;
        .dataList,.dataListOne,.dataListTwo{
            li{
                line-height:28px;
                label{
                    display:inline-block;
                    width:100px;
                }
            }
        }
        .dataList {
            li:nth-child(3){
                color:#388fe1;
                label{
                    color:#000;
                }
            }
        }
        .dataListOne{
            li:nth-child(1){
                color:#ff7800;
                label{
                    color:#000;
                }
            }
        }
        .dataListTwo{
            li:nth-child(1){
                color:#dd1507;
                label{
                    color:#000;
                }
            }
        }
    }
</style>

