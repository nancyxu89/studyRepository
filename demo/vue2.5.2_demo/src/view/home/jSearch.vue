<template>
  <div class="input-groups homepage-search-main">
    <input type="text" placeholder="请输入企业名称" class="form-control" @keyup="query" @click.stop="show" v-model="keyword" maxlength="30" @keydown.enter="goto">
    <button class="input-group-addon search-btn" @click="goto">搜索</button>
    <ul class="search-list" v-show="entList.length && focus">
      <router-link v-for="ent in entList" :to="{ path: `/corpor/${ent.id}`,  query: { entName: ent.name }}" tag="li" v-html="ent.text"></router-link>
    </ul>
  </div>
</template>
<script>
import { homepage as api } from '../../api'

var spechars = /[\.\{\}\^\\\$\*\+\?\(\)\[\]\|\,]/
var oldKeyword = ''
var handle = 0
export default {
  name: 'jSearch',
  data() {
    return {
      keyword: '',
      entList: [],
      selectedIdx: 0,
      focus: true
    }
  },
  methods: {
    query() {
      if (handle) {
        clearTimeout(handle)
      }
      handle = setTimeout(() => {
        if (this.keyword === oldKeyword) return
        oldKeyword = this.keyword
        this.entList.lenght = 0
        if (!this.keyword) return
        var rtn = api.getEntListByKeyword({ entName: this.keyword })
        rtn.then(result => {
          if (result.code === 1) {
            this.buildList(result.data)
          }
        })
      }, 400)
    },
    goto() {
      if (!this.keyword) return
      this.$router.push({ path: '/corpor', query: { entName: this.keyword } })
    },
    buildList(list) {
      var pattern = this.keyword.replace(spechars, ch => {
        return '\\\\' + ch
      })
      var regex = new RegExp(pattern, 'ig')
      this.entList = list.map(ent => {
        return {
          id: ent.entId,
          text: ent.entName.replace(regex, ch => {
            return `<em>${ch}</em>`
          }),
          name: ent.entName
        }
      })
    },
    keydown(event) {

    },
    selectedItem(idx) {
      var len = this.entList.length
      this.selectedIdx = (idx + len) % len
    },
    show() {
      this.focus = true
    },
    hide() {
      this.focus = false
    }
  },
  mounted() {
    window.addEventListener('click', this.hide)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.hide)
  }
}
</script>
<style lang="less" scroped>
.homepage-search-main {
  position: relative;
}

.search-list {
  background: #fff;
  position: absolute;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 5px;
  box-shadow: 0px 13px 13px 0px rgba(230, 230, 230, 0.004);
  top: 100%;
  left: 0px;
  z-index: 10;
  width: calc(~'100% - 80px');
  li {
    padding: 8px 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to right, #e2f0fd, #fff 80%, #fff);
    }
  }
  em {
    color: #1b7fdb;
  }
}
</style>
