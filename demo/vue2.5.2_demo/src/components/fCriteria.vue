<template>
  <div class="criBox">
    <transition>
      <div>
        <h3>{{title}}</h3>
        <label @click="cloneIndex">不限</label>
        <ul>
          <li v-for='(item,index) in criObj' v-bind:key="index" @click="criAct(index,item.name)" :class="{active:index == criIndex}" v-if='index<criLength'>
            <span>{{item.name}}</span>
            <span v-if="item.count">({{item.count}})</span>
          </li>
        </ul>
      </div>
    </transition>
    <span v-if="moreShow" @click="toggle">{{more}}<i :class="['iconfont icon-jiantouyou',isShow?'aniAct':'']" ></i></span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    criObj: {
      type: Array
    },
    showLenth: {
      type: Number | String
    },
    moreShow: {
      type: Boolean
    }
  },
  data() {
    return {
      criIndex: 0,
      isShow: false,
      criLength: this.showLenth,
      more: '更多'
    }
  },
  watch: {
  },
  methods: {
    criAct(index, name) {
      this.$emit('change', name)
      this.criIndex = index
    },
    cloneIndex() {
      this.criAct(-1, '')
    },
    toggle() {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.criLength = 100
        this.more = '收起'
      } else {
        this.criLength = this.showLenth
        this.more = '更多'
      }
    }
  },
  mounted() {
    this.cloneIndex()
  }
}
</script>
<style scoped lang="less">
  .criBox{
    width: 100%;
    position: relative;
    margin: 10px 0 ;
    div{
      display: flex;
      h3{
        font-size: 14px;
        color: #4d4d4d;
        font-weight: bold;
        margin-top: 5px;
      }
      &>label{
        display: inline-block;
        width: 61px;
        border-radius: 3px;
        color: white;
        text-align: center;
        font-size: 14px;
        background-image: linear-gradient(0deg, #00a2fd 0%, #21b8ff 100%);
        margin:0 25px 0 15px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
      &>ul{
        width: 850px;
        display: flex;
        flex-wrap:wrap;
        margin-top:4px;
        .active{
          color: #14aaff;
        }
        li{
          margin-right: 40px;
          margin-bottom:20px;
          color: #525252;
          cursor: pointer;
          span{
            font-size: 14px;
          }
        }
        li:last-child{
          margin-right: 0;
        }
      }
    }
    &>span{
      font-size: 12px;
      color: #14aaff;
      position: absolute;
      right: 10px;
      top: 8px;
      cursor: pointer;
      .iconfont{
        display: inline-block;
        transition:all 0.2s linear;
        font-size: 12px;
        margin-left:5px;
      }
      .aniAct{
        transform: rotate(90deg);
      }
    }
  }

</style>
