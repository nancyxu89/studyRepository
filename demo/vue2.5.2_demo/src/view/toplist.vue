<template>
  <div class="page-list">
    <div class="top-list-arrows-up"></div>
    <div class="top-list">
      <ul>
        <li>诉讼记录</li>
        <li>处罚记录</li>
        <li>失信记录</li>
        <li>工商变更</li>
        <li>商标信息</li>
        <li>专利信息</li>
        <li>监管机构</li>
        <li>土地信息</li>
        <li>其他政府部门</li>
      </ul>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'toplist',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/main.css";  
  .top-list{
    width:143px;
    height:270px;
    background:#54a7f5;
    opacity:0.8;
    border:1px solid #1d88ec;
    border-radius:5px;
    margin:0 auto;
  }
  .top-list-arrows-up{
    margin:0 auto;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 12px solid #54a8f6;
  }
  .top-list ul li{
    line-height:28px;
    color:#fff;
    font-size:14px;
    text-align:center;
    cursor:pointer;
  }
  .top-list ul li:nth-child(1){
    margin-top:5px;
  }
  .top-list ul li:hover{
    background:#71baff;
  }
</style>
