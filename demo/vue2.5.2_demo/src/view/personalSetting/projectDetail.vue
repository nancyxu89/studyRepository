<template>
  <div class="project-detail">
    <div class="column-item">
      <span>项目基本信息</span>
    </div>
    <div class="table-box mgt-30">
      <table>
        <tbody>
        <tr>
          <th>项目名称</th>
          <td>{{baseInfo.projectName||'-'}}</td>
          <th>行业</th>
          <td>{{baseInfo.category||'-'}}</td>
        </tr>
        <tr>
          <th>项目所在区域</th>
          <td>{{baseInfo.area||'-'}}</td>
          <th>项目单位</th>
          <td>{{baseInfo.unit||'-'}}</td>
        </tr>
        <tr>
          <th>建设性质（新、改、扩）</th>
          <td>{{baseInfo.property||'-'}}</td>
          <th>合作方式</th>
          <td>{{baseInfo.method||'-'}}</td>
        </tr>
        <tr>
          <th>用地（亩）</th>
          <td>{{baseInfo.land||'-'}}</td>
          <th>新增用地（亩）</th>
          <td>{{baseInfo.addedLand||'-'}}</td>
        </tr>
        <tr>
          <th>总投资（万元）</th>
          <td>{{baseInfo.total||'-'}}</td>
          <th>拟引资</th>
          <td>{{baseInfo.actual||'-'}}</td>
        </tr>
        <tr>
          <th>联系人</th>
          <td>{{baseInfo.name||'-'}}</td>
          <th>联系电话</th>
          <td>{{baseInfo.phone||'-'}}</td>
        </tr>
        <tr>
          <th>项目详细地址</th>
          <td colspan="3">{{baseInfo.detailArea||'-'}}</td>
        </tr>
        <tr>
          <th>备注</th>
          <td colspan="3">{{baseInfo.remark||'-'}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="column-item mgt-30">
      <span>项目进展情况</span>
    </div>
    <div class="table-box mgt-30">
      <table>
        <tbody>
        <tr>
          <th>立项批准文号</th>
          <td>{{baseInfo.projectNum||'-'}}</td>
          <th>土地批准文号</th>
          <td>{{baseInfo.landNum||'-'}}</td>
        </tr>
        <tr>
          <th>规划批准文号</th>
          <td>{{baseInfo.planNum||'-'}}</td>
          <th>环评批准文号</th>
          <td>{{baseInfo.eiaNum||'-'}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="column-item mgt-30">
      <span>项目建设规模</span>
    </div>
    <div class="mgt-30"><span class="project-scale">{{projectScale||'-'}}</span></div>
  </div>
</template>
<script>
import {projects} from '../../assets/js/getProjectDetail'
export default{
  data() {
    return {
      list1: [{
        projectName: '',
        category: '',
        area: '',
        unit: '',
        type: '',
        method: '',
        land: '',
        addedLand: '',
        total: '',
        actual: '',
        name: '',
        phone: '',
        detailArea: '',
        remark: ''
      }]
    }
  },
  computed: {
    baseInfo() {
      return projects[this.$route.params.id] || []
    },
    projectScale() {
      return projects[this.$route.params.id]['projectScale']
    }
  }
}
</script>
<style lang="less" scoped>
  .project-detail {

  .column-item {
    border-left: 4px solid #015293;
    color: #333345;
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;

  span {
    margin-left: 12px;
  }

  }

  .table-box table {
    width: 100%;

  th, td {
    height: 38px;
    border: solid 1px #f2f2f2;
    font-size: 14px;
  }

  td {
    text-align: left;
    padding-left: 30px;
  }

  tbody tr>td{
    width: 36%;
  }

  th {
    width: 180px;
  }

  tr:nth-child(odd) {
    background-color: #f3f7fb;

  th {
    font-weight: bold;
  }

  }

  }

  .project-scale {
    display: inline-block;
    text-indent: 28px;
    font-size: 14px;
  }

  .mgt-30 {
    margin-top: 30px;
  }

  }

</style>
