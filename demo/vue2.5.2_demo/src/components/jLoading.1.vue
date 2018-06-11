<template>
  <div :class="{full:mode!='s',loading:true}">
    <div class="mark"></div>
    <div class="loader">
      <img src="../assets/images/loading1.gif" >
      <span>{{loadingMsg}}</span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Loading',
  props: {
    mode: {
      type: String,
      default: 'f'
    },
    loadingMsg: {
      type: String,
      default: '努力加载中......'
    }
  }
}
</script>
<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
  top:0;

  .loader {
    position: absolute;
    left: 0;
    top: 0;
    margin: auto;
    right: 0;
    bottom: 0;
    height: 30px;
  }
  &.full {
    span {
      display: block;
    }
    .mark {
      position: fixed;
      width: 100vw;
      height: 100vh;
    }
    .loader{
      height: 100px;
    }
  }
  .mark {
    top: 0;
    left: 0;
    background: #000;
    opacity: .2;
    width: 100%;
    height: 100%;
  }
  img {
    width: 24px;
    height: 24px;
  }
}

// .loading {
//   position: fixed;
//   left: 50%;
//   text-align: center;
//   margin: 20px 0;
//   top: 50%;
//   span {
//     display: block;
//     margin-top: 20px;
//     font-size: 14px;
//     color: #ccc;
//   }
// }
// .mark {
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   background: #000;
//   opacity: .3;
// }
// .upload {
//   width: 100%;
//   height: 90px;
//   margin-top: 25px;
//   .load-pic {
//     text-align: center;
//     img {
//       display: block;
//       margin: 0 auto;
//     }
//     span {
//       display: block;
//       color: #ccc;
//       margin-top: 20px;
//     }
//   }
// }
</style>
