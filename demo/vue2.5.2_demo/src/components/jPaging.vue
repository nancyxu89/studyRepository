<template>
  <div v-if="totalPage>1" class="paging">
    <ul>
      <li v-if="pageIndex!==1&&totalPage!==initShowPages">
        <a class="first" @click="goto(1)">&lt;&lt;</a>
      </li>
      <li>
        <a @click="goto(pageIndex-1)">&lt;</a>
      </li>

      <li v-for="(n,index) in pages" v-bind:key="index">
        <a :class="{active:n==pageIndex}" @click="goto(n)">{{n}}</a>
      </li>
      <li>
        <a @click="goto(pageIndex+1)">&gt;</a>
      </li>
      <li v-if="pageIndex!==totalPage&&totalPage!==initShowPages">
        <a class="last" @click="goto(totalPage)">&gt;&gt;</a>
      </li>
      <li v-if="mode=='full'" class="skip">
        到第
        <input type="text" v-model="skipNum" @keyup.enter="goto(skipNum)" />页
        <button @click="goto(skipNum)">确定</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    initPageSize: {
      type: Number,
      default: 15
    },
    initPageIndex: {
      type: Number,
      default: 1
    },
    initShowPages: {
      type: Number,
      default: 3
    },
    initTotalCount: {
      type: Number,
      default: 0
    },
    initMode: {
      type: String,
      default: 'full'
    }
  },
  data: function() {
    return {
      pageSize: this.initPageSize,
      pageIndex: this.initPageIndex,
      showPages: this.initShowPages,
      mode: this.initMode,
      totalPage: 0,
      pages: [],
      skipNum: ''
    }
  },
  watch: {
    initTotalCount: function(curVal) {
      this.totalCount = curVal
      this.showPages = this.initShowPages// 变更初始总页数后,重置showPages、mode,避免造成...丢失
      this.reset()
      this.getPages()
    },
    initPageIndex: function(curVal) {
      this.pageIndex = curVal
      this.getPages()
    }
  },
  methods: {
    goto: function(page) {
      page = +page
      if (isNaN(page)) return
      if (page < 1 || page > this.totalPage || page === this.pageIndex) return
      this.pageIndex = page
      this.$emit('pageChanged', page)
    },
    reset: function() {
      this.totalPage = Math.ceil(this.totalCount / this.pageSize)
      if (this.totalPage <= 1) return
      if (this.showPages >= this.totalPage) {
        this.mode = 'simple'
        this.showPages = this.totalPage
      } else {
        this.mode = 'full'
      }
    },
    getPages: function() {
      let pages = []
      if (this.totalPage > 1) {
        let half = Math.floor(this.showPages / 2)
        let end = Math.min(this.totalPage, this.pageIndex + half)
        let start = Math.max(1, end - this.showPages + 1)
        end = Math.min(this.totalPage, start + this.showPages - 1)
        for (let pi = start; pi <= end; pi++) {
          pages.push(pi)
        }

        if (this.mode === 'full') {
          let diff = this.totalPage - end
          if (diff > 2) {
            pages.push('...', this.totalPage)
          } else {
            for (let i = 1; i <= diff; i++) {
              pages.push(end + i)
            }
            for (let i = -1; i >= diff - 2; i--) {
              if (start + i > 0) { // total为6时,出现0页
                pages.unshift(start + i)
              }
            }
          }
        }
      }

      this.pages = pages
    }
  },
  mounted() {
    this.totalCount = this.initTotalCount// 跳转路由后,重新赋值,否则为undefined
    this.reset()
    this.getPages()
  }
}
</script>

<style scoped lang="less">
.paging {
  overflow: hidden;
  ul {
    float: right;
    margin-top: 20px;
  }
  li {
    display: inline-block;
  }
  a {
    color: #5e6c7e;
    cursor: pointer;
    padding: 0px 4px;
    display: block;
    height: 26px;
    min-width: 18px;
    line-height: 26px;
    text-align: center;
    &.active {
      color:#008aff;
      border-radius: 2px;
      /*background: #dbdbdb;*/
    }
    &:hover {
      color: #ff6800;
    }
  }
  .skip {
    margin-left: 20px;
    input[type='text'] {
      width: 40px;
      height: 25px;
      border-radius: 4px;
      padding: 0 6px;
      margin: 0 5px;
      border: solid 1px #a7cce7;
    }
    button {
      border-radius: 3px;
      background: #008aff;
      width: 54px;
      height: 26px;
      color: #fff;
      margin-left: 20px;
    }
  }
}
</style>
