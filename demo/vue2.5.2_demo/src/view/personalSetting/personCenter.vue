<template>
  <div class="person-center clearFix">
    <div class="left-main">
      <div class="inner-content">
        <div class="person-info">
          <img src="../../assets/images/header_test.png" alt="头像">
          <div class="base-info">
            <p>姓名 <span>梁晶晶</span></p>
            <p>岗位 <span>管理员</span></p>
            <p>部门 <span>办公室</span></p>
          </div>
        </div>

        <div class="item">
          <div class="item-header">
            <span class="line"></span>
            <span class="title">我的提醒</span>
          </div>
          <div class="unit-list">
            <div class="unit-item wd46">
              <p><span><i class="iconfont icon-meirixiaoshoubaobiao blue-color"></i>日报</span></p>
              <p><span><i class="iconfont icon-qiyegenjinguanli purple-color"></i>跟进</span></p>
              <p><span><i class="iconfont icon-renwu gold-color"></i>任务</span></p>
            </div>
            <div class="unit-item wd46">
              <p><span><i class="iconfont icon-benzhou blue-color"></i>周报</span></p>
              <router-link tag="p" to="/personCenter/attentionlist"><span><i
                class="iconfont icon-wodeguanzhu purple-color"></i>我的关注</span></router-link>
              <p><span><i class="iconfont icon-qianyuejilu gold-color"></i>签约项目</span></p>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="item-header">
            <span class="line"></span>
            <span class="title">我的视图</span>
          </div>
          <div class="unit-list">
            <div class="unit-item wd30">
              <p><span>扶持政策分析</span></p>
              <p><span>重点项目库</span></p>
              <p><span>行业分析报告</span></p>
            </div>
            <div class="unit-item wd30">
              <p><span>办事效能监管</span></p>
              <p><span>企业信息审查</span></p>
              <p><span>全国各类计划企业管理</span></p>
            </div>
            <div class="unit-item wd30">
              <p><span>政策受惠企业识别</span></p>
              <p><span>行业占比分析</span></p>
              <p><span>异常经营监测</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="right-main">
      <div class="column-item">
        <span>项目跟进</span>
      </div>

      <div class="inner-content mgt-20 mgb-20">
        <ul class="follow-project clearFix">
          <li v-for="(item,index) in followingProjects" v-bind:key="index">
            <router-link :to="'/personCenter/'+item.id+'/projectDetail'" tag="span" class="follow-type finger-tip">
              【{{item.type}}】
            </router-link>
            <router-link :to="'/personCenter/'+item.id+'/projectDetail'" tag="span" class="follow-name finger-tip"
                         :title="item.projectName">{{item.projectName}}
            </router-link>
            <span class="follow-opt">处理</span>
          </li>
        </ul>
      </div>

      <div class="column-item">
        <span>工作审批</span>
      </div>

      <div class="inner-content mgt-20 mgb-20">
        <table class="table-fixed">
          <thead>
          <tr>
            <th v-for="(item,index) in theadApproving" v-bind:key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in approvingList" v-bind:key="index">
            <td>{{item.type}}</td>
            <td class="finger-tip">
              <router-link :to="'/personCenter/'+item.id+'/projectDetail'" tag="span" :title="item.projectName">
                {{item.projectName}}
              </router-link>
            </td>
            <td class="finger-tip">
              <router-link :to="'/corpor/' + item.entId + '/basicMsg' + '?entName=' + item.entName" tag="span"
                           :title="item.entName">
                {{item.entName}}
              </router-link>
            </td>
            <td>{{item.status}}</td>
            <td class="table-opt"><span class="edit-opt">编辑</span><span class="remove-opt">删除</span></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="column-item">
        <span>工作日志</span>
      </div>

      <div class="inner-content mgt-20 mgb-20">
        <table class="table-fixed">
          <thead>
          <tr>
            <th v-for="(item,index) in theadLog" v-bind:key="index">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in logList" v-bind:key="index">
            <td>{{item.date}}</td>
            <td>{{item.reportName}}</td>
            <td>{{item.department}}</td>
            <td>{{item.content}}</td>
            <td class="table-opt"><span class="edit-opt">编辑</span><span class="remove-opt">删除</span></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="column-item">
        <span>工作进度</span>
      </div>

      <div class="inner-content mgt-20 mgb-20 pdr-0">
        <ul class="job-schedule clearFix">
          <li v-for="(item,index) in jobSchedules" v-bind:key="index">
            <div class="top-content"><span>{{item.num}}个</span></div>
            <div class="bottom-content"><span>{{item.name}}</span></div>
          </li>
        </ul>
      </div>
    </div>
    <j-Loading v-if="isShow" mode="f"></j-Loading>
  </div>
</template>
<script>
import {jLoading} from '../../components'
import {projects} from '../../assets/js/getProjectDetail'
export default{
  components: {jLoading},
  data() {
    return {
      theadApproving: ['类别', '项目名称', '企业名称', '状态', '操作'],
      approvingList: [
        {type: '项目', projectName: '孝义丰邦汽车商务广场项目', entName: '', status: '审核通过', id: 1, entId: 1},
        {type: '企业', projectName: '', entName: '北京华远意通热力科技股份有限公司', status: '审核通过', id: 2, entId: 80370},
        {type: '企业', projectName: '', entName: '山东三星集团有限公司', status: '审核通过', id: 3, entId: 67920},
        {type: '项目', projectName: '新建高安全性、大容量锂离子动力电池项目', entName: '', status: '审核通过', id: 140, entId: 1},
        {type: '项目', projectName: '500万吨/年新型焦化工业园区项目', entName: '', status: '审核通过', id: 5, entId: 1}],
      theadLog: ['汇报日期', '报告人', '部门', '日报内容', '操作'],
      logList: [{date: '2017-12-26', reportName: '王鑫', department: '办公室', content: '项目招商跟进，蔡家坡核心商业区建设项目'},
        {date: '2017-12-26', reportName: '王鑫', department: '办公室', content: '企业招商跟进，中国贸易集团有限公司'},
        {date: '2017-12-26', reportName: '张童', department: '办公室', content: '项目招商跟进，秦岭中药材种植及深加工'},
        {date: '2017-12-26', reportName: '刘丽', department: '办公室', content: '企业招商跟进，棱镜网络科技有限公司'},
        {date: '2017-12-26', reportName: '王涛', department: '办公室', content: '项目招商跟进，禅修养心中心'}],
      jobSchedules: [{num: 8, name: '项目洽谈'}, {num: 6, name: '项目考察'}, {num: 3, name: '项目评审'}, {num: 3, name: '资质审核'},
        {num: 10, name: '签意向书'}, {num: 13, name: '立项备案'}, {num: 3, name: '项目报建'}, {num: 3, name: '项目验收'},
        {num: 3, name: '项目开工'}, {num: 3, name: '流程完结'}],
      isShow: false
    }
  },
  computed: {
    followingProjects() {
      let arr = []
      for (let key in projects) {
        let item = {}
        item = projects[key]
        item.id = key
        arr.push(item)
      }
      return arr
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShow = false
    }, 600)
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/personcenter.less";
</style>
