<template>
  <div :class="{loading:isLoadingBig,upload:!isLoadingBig}">
    <div v-if="loader=='l'">
      <!--<div class="mark"></div>-->
      <div class="load-pic">
        <img src="../assets/images/loading1.gif" />
        <span>{{loadingMsg}}</span>
      </div>
    </div>
    <div v-else>
      <img src="../assets/images/loading1.gif" />
      <span>{{loadingMsg}}</span>
    </div>
  </div>
  <!--<div :class="{full:mode!='s',loading:true}">
      <img src="../assets/images/loading1.gif" />
      <span>{{loadingMsg}}</span>
    </div>-->
</template>
<script>

export default {
  name: 'Loading',
  props: {
    loader: {
      type: String,
      default: 'l'
    },
    loadingMsg: {
      type: String,
      default: '努力加载中......'
    }
  },
  data: function() {
    return {
      isLoadingBig: false
    }
  },
  mounted() {
    if (this.loader === 'l') {
      this.isLoadingBig = false
    } else {
      this.isLoadingBig = true
    }
  }
}
</script>
<style lang="less" scoped>
.loading {
  position: fixed;
  left: 50%;
  text-align: center;
  margin: 20px 0;
  top: 50%;

  span {
    display: block;
    margin-top: 20px;
    font-size: 14px;
    color: #ccc;
  }
}

.mark {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #000;
  opacity: .3;
}

.upload {
  width: 100%;
  height: 90px;
  margin-top: 25px;

  .load-pic {
    text-align: center;

    img {
      display: block;
      margin: 0 auto;
    }

    span {
      display: block;
      color: #ccc;
      margin-top: 20px;
    }
  }
}
</style>
