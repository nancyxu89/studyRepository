<template>
    <div class='personSetPage'>
        <!--用户管理-->
        <div class='mainContent clearFix'>
            <div class='bodyContent'>
                <h3>用户管理</h3>
                <div class='bodyContentTop'>
                    <div class='search clearFix'>
                        <input type='text' placeholder="请输入数据源名称或网址" />
                        <button>搜索</button>
                    </div>
                    <div class='clearFix labelBox'>
                        <div>
                            <span class='dataType'>所属部门：</span>
                           
                        </div>
                        <div>
                            <span class='dataType'>职位：</span>
                            
                        </div>
                        <div>
                            <span class='dataType'>状态：</span>
                            
                        </div>
                    </div>
                </div>
                <div class='bodyContentBottom'>
                    <div class='clearFix formLabel'>
                        <span class='sort'>排序：</span>
                        <label class='addTime'>注册日期</label>
                        <div class='addShift'>
                            <label>添加用户</label>
                        </div>
                    </div>
                    <div class='tableBox'>
                        <table class='tableForm table-fixed'>
                            <tr>
                                <th>序号</th>
                                <th>用户名</th>
                                <th>员工姓名</th>
                                <th>所属部门</th>
                                <th>职位</th>
                                <th>注册日期</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for='item in formDatas' class='contentMsg'>
                                <td>{{item.number}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.webSite}}</td>
                                <td>{{item.submitPerson}}</td>
                                <td>{{item.time}}</td>
                                <td :class="item.state=='已停用' ? 'classA' : 'classB' ">{{item.state}}</td>
                                <td class='handleSpan'>
                                    <span>{{item.handle.reset}}</span>
                                    <span>{{item.handle.remove}}</span>
                                </td>
                            </tr>
                        </table>
                        <!--<paging :totalCount="totalCount" :pageSize="pageSize" @pageChanged="gotoPage"></paging>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import paging from '../components/paging.vue'
    export default {
        data: function () {
            return {
                formDatas:[
                    {
                        number:1,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已启用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },
                   {
                        number:2,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已启用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },{
                        number:3,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已停用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },{
                        number:4,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已启用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },{
                        number:5,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已启用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },{
                        number:6,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已启用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },
                    {
                        number:7,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已停用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    },
                    {
                        number:8,
                        name:'zhangyan',
                        type:'张燕',
                        webSite:'部门1',
                        submitPerson:'业务员',
                        branch:'北京分公司/一部',
                        time:'2017-01-03',
                        state:'已停用',
                        handle:{
                            reset:'修改',
                            remove:'删除'
                        }
                    }
                ],
                pageSize: 10,
                showPages: 3,
                totalCount: 286
            }
        },
        methods: {
            gotoPage: function (page) {
                
            }
        },
        components:{
            // 'paging':paging
        }
    };

</script>
<style scoped lang='less'>
    .personSetPage {
        width: 90%;
        margin: 20px;
        .mainContent {
            width:100%;
            .bodyContent {
                width: 100%;
                h3 {
                    font-size: 18px;
                    color: #333;
                    margin: 38px 0 24px 0;
                }
                .bodyContentTop {
                    width: 100%;
                    height: 170px;
                    background: #f4f4f4;
                    border: 1px solid #ccc;
                    .search {
                        margin: 30px 0 0 40px;
                        input {
                            width: 386px;
                            height: 35px;
                            border: 1px solid #ccc;
                            border-radius: 2px;
                            float: left;
                        }
                        button {
                            width: 72px;
                            height: 35px;
                            background: #ff7000;
                            border-radius: 2px;
                            float: left;
                            color: #fff;
                        }
                    }
                    .labelBox {
                        margin: 20px 0 0 40px;
                        label {
                            padding: 7px 24px;
                            border: 1px solid #ccc;
                            border-radius: 2px;
                            float: left;
                            margin: 0 20px 11px 0;
                        }
                        .dataType {
                            float: left;
                            height: 70px;
                            padding-top: 5px;
                        }
                    }
                }
                .bodyContentBottom {
                    width: 100%;
                    margin-top: 24px;
                    label {
                        width: 78px;
                        height: 27px;
                    }
                    .formLabel{
                        label{
                            float:left;
                            border-radius:2px;
                            color:#fff;
                            text-align:center;
                            line-height:27px;
                        }
                        .addShift{
                            float:right;
                            label{
                                margin-left:10px;
                                width:83px;
                                height:27px;
                                background:#3699ee;
                            }
                            
                        }
                        .addTime{
                            width:78px;
                            height:27px;
                            background:#fc7322;
                            display:inline-block;
                        }
                        .sort{
                            float:left;
                        }
                    }
                    .tableBox{
                        width:100%;
                        margin-top:13px;
                        
                        .tableForm{
                            width:100%;
                            border:1px solid #ccc;
                            
                            tr{
                                height:42px;
                                th{
                                    min-width:43px;
                                    border:1px solid #ccc;
                                    background:#f4f4f4;
                                    font-size:12px;
                                }
                                th:nth-child(1){
                                    width:30px;
                                }
                                
                                td{
                                    text-align:center;
                                    line-height:42px;
                                    border:1px solid #ccc;
                                    font-size:12px;
                                }
                                .handleSpan{
                                    span:nth-child(1){
                                        color:#3b7be4;
                                    }
                                    span:nth-child(2){
                                        color:#dd1507;
                                    }
                                }
                            }
                            .contentMsg{
                                td:nth-child(4){
                                    color:#005ed3;
                                }
                            }
                            .classA{
                                color:#ff7800;
                            }
                            .classB{
                                color:#00a52f;
                            }
                        }
                    }
                }
            }
        }
        .clearFix:after {
            display: block;
            clear: both;
            content: '';
        }
    }
</style>
