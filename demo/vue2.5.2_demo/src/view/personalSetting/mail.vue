<template>
    <div class="mail-page">
        <div class="mail-title">
           <div class="main-name">投行项目风险实时预警大数据预警</div>
           <div class="statistics">最新变动统计：<span>本订阅周期内(2016-12-18 17:00~2016-12-19 17:00)，您监控的企业共发生变动105项，其中舆情信息49项，风险及变更信息46项，请及时登录系统查看最新信息。</span></div>
        </div>
        <div class="change-news">
            <div class="main-content">最新变动信息</div>
            <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                    <th width="35%">变动内容</th>
                    <th width="15%">变动类型</th>
                    <th width="30%">企业名称</th>
                    <th width="20%">変动时间</th>
                </thead>
                <tr v-for="item in items">
                    <td class="item-subject">{{item.content}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.time}}</td>
                </tr>
            </table>
        </div>
        <div class="send-time"><span>发送时间:2017-12-16</span></div>
        <div class="mail-footer">
            <div class="">此为系统邮件,请勿直接回复!</div>
            <div class="">九次方大数据信息集团有限公司</div>
            <div class="">如有疑问或建议,可发邮件至<span>999@jusfoun.com</span></div>
            <div class="">大数据投行项目风险实时预警大数据平台</div>
        </div>
    </div>
</template>
<script>
    export default {
        data:function() {
            return {
                pageIdx:1,
                items: [
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'工商变更',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '四川宏达股份有限公司关于终止重大资产重组事项投资者说明会召开',type:'舆情',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '江苏德伟网络科技股份有限公司与百度(中国)有限公司公司知识产权',type:'诉讼记录',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '(2017)豫1602执81号',type:'处罚记录',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'失信人记录',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'商标信息',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'工商变更',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'诉讼记录',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'工商变更',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'商标信息',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                    {content: '注册资本从126166.7506万元变更为183030.7304万元',type:'工商变更',name:'华信万达期货股份有限公司',time:'2016-11-14 18:50'},
                ]
            };
        },
    }   
</script>
<style scoped lang='less'>
    .mail-page{
        width:96%;
        margin:0 auto;
        margin-top:32px;
        font-size:14px;

        .mail-title{
           height:62px;
           .main-name{
               font-size:16px;
               font-weight:bold;
               height:37px;
               border-bottom:1px solid #ccc;
           }
           .statistics{
                margin-top:9px;
                span{
                    font-size:12px;
                    color:#ff8542;
                    margin-left:15px;
                }
           }
        }
        .change-news{
            margin-top:28px;
            .main-content{
                border-left:5px solid #ff6c00;
                padding-left:7px;
                font-size:16px;
                font-weight:bold;
                margin-bottom:22px;
            }
        }
        .send-time{
            width:100%;
            height:23px;
            margin-top:32px;
            border-bottom:1px solid #ccc;
            position:relative;
            
            span{
                position:absolute;
                right:0px;
                font-size:12px;
            }
        }
        .mail-footer{
            text-align:center;
            margin-top:26px;
            font-size:12px;
            line-height:20px;
            span{
                color:#0091f0;
            }
        }
    }
        
</style>