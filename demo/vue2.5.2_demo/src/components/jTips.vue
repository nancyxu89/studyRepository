<template>
  <j-dialog class="j_tips"
            :initShow="isShow"
            :isMask="false"
            position="bottomright">
    <h3 slot="header">{{title}}<small>{{date}}</small><a class="close" @click="close">×</a></h3>
    <div class="main">
      <p>XXX公司 企业住所 从 从 上海市浦东新区纳贤路701号1#楼3层 变更为 中国 从 上海市浦东新区纳贤路701号1#楼3层 变更为 中国 从 上海市浦东新区纳贤路701号1#楼3层 变更为 中国 上海市浦东新区纳贤路701号1#楼3层 变更为 中国（上海）自由贸易试验区纳贤路701号1#楼3层.

      </p>
      <a class="see-detail">[查看详情]</a>
    </div>
  </j-dialog>
</template>
<script>
import jDialog from './jDialog'
export default {
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 1000000
    }
  },
  data() {
    return {
      title: '工商信息变更',
      date: '2017-03-10',
      intPro: 0,
      isShow: false
    }
  },
  methods: {
    close() {
      this.isShow = false
      this.intPro && clearTimeout(this.intPro)
    },
    show() {
      this.isShow = true
      this.intPro && clearTimeout(this.intPro)
      this.intPro = setTimeout(() => {
        this.isShow = false
      }, this.delay)
    }
  },
  watch: {
    show: function(curVal, oldVal) {
      if (curVal) {
        this.intPro && clearTimeout(this.intPro)
        this.intPro = setTimeout(() => {
          this.isShow = false
        }, this.delay)
      } else {
        this.intPro && clearTimeout(this.intPro)
      }
    }
  },
  components: {
    jDialog
  }
}
</script>
<style lang="less" scoped>
.j_tips {
  position: fixed;
  bottom: -150px;
  right: 20px;
  width: 350px;
  transition: all .5s;
  .header>h3 {
    font-size: 14px;
    font-weight: normal;
  }
  small {
    margin-left: 10px;
    font-size: 12px;
    color: #a6cff2
  }
  .main {
    color: #474747;
    font-size: 12px;
    position: relative;
    p {
      line-height: 1.8em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      height: 5.4em;
    }
  }
  .see-detail {
    color: #269aff;
    position: absolute;
    right: 2px;
    bottom: 6px;
    display: block;
    width: 200px;
    text-align: right;
    background: #fafafa;
    background: -webkit-linear-gradient(left, rgba(250, 250, 250, 0.2), rgba(250, 250, 250, 1) 60%);
    background: -moz-linear-gradient(left, rgba(250, 250, 250, 0.2), rgba(250, 250, 250, 1) 60%);
    background: -o-linear-gradient(left, rgba(250, 250, 250, 0.2), rgba(250, 250, 250, 1) 60%);
    background: linear-gradient(to right, rgba(250, 250, 250, 0.2), rgba(250, 250, 250, 1) 60%);
  }
}
</style>
