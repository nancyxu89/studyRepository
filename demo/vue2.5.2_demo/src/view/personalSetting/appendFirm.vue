<template>
  <j-dialog class="j-tabs" :initShow="false" initTitle="添加监控企业" ref="append_firm_dialog">
    <div class="page-company">
      <div class="attention-company">
        <div class="attention-title">关注企业
          <span>{{allFollowLength}}</span>
        </div>
        <div class="input-group">
          <input type="text" placeholder="请输入企业名称" class="form-control" @keyup.enter="query" v-model="entName">
          <button class="input-group-addon search-btn" @click="query">搜索</button>
        </div>
        <div class="publist-list-category fl">
          <label>项目类型：</label>
          <j-select v-model="projectType" :initItems="projectTypes" displayKey="name" valueKey="value" :selectedIndex="0" @change="query">
          </j-select>
        </div>
        <div class="page-scroll">
          <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
              <th width="10%">
                <!--<input type="checkbox" @change="checkboxChange($event)">-->
              </th>
              <th class="item-subject" width="50%">企业名称</th>
              <th class="item-subject" width="40%">项目类型</th>
            </thead>
            <tr v-if="loading">
              <td colspan="3">
                <j-loading></j-loading>
              </td>
            </tr>
            <tr v-else-if="!followEnts.length">
              <td colspan="3">
                你还没有添加相关关注企业，可以在
                <router-link :to="{ path: '/corpor'}">企业库</router-link> &nbsp;添加关注企业
              </td>
            </tr>
            <tr v-else v-for="ent in followEnts" v-show="!ent.monitor">
              <td>
                <input type="checkbox" v-model="ent.selected" :disabled="monitorCount>=10 && !ent.selected" @change="selected(ent)" />
              </td>
              <td class="item-subject" :title="ent.entName">{{ent.entName}}</td>
              <td class="item-subject" :title="ent.projectTypes|enumConvert">{{ent.projectTypes|enumConvert}}</td>
            </tr>

          </table>

        </div>
      </div>
      <div class="page-add">
        <button class="add-btn" @click="addMonitor" :disabled="monitorCount>10">添加 >></button>
      </div>
      <div class="selected-company">
        <div class="attention-title">已选中的企业
          <span>{{monitorEnts.length}}</span>
        </div>
        <div class="monitor-firm">您最多可以监控10家企业</div>
        <!--<div class="publist-list-category fl">                                                                                                                                  </j-select>
                                                                                                                                                                                                                    </div>-->
        <div class="page-scroll">
          <table class="table-fixed" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
              <th width="10%">
                <!--<input type="checkBox">-->
              </th>
              <th class="item-subject" width="60%">企业名称</th>
              <!--<th class="item-subject" width="30%">项目类型</th>-->
            </thead>
            <tr v-for="ent in monitorEnts">
              <td>
                <input type="checkbox" v-model="ent.selected" />
              </td>
              <td class="item-subject">{{ent.entName}}</td>
              <!--<td class="item-subject">{{list.type}}</td>-->
            </tr>
          </table>
        </div>

      </div>
    </div>
    <div class="add-firm">
      <div class="fl">请从关注企业中勾选您需要进行监控的企业名单后点击添加</div>
      <div class="handle fr">
        <button class="pub-btn" @click="removeMonitor(false)" :disabled="!monitorEnts.length">删除</button>
        <button class="pub-btn" @click="removeMonitor(true)" :disabled="!monitorEnts.length">清空</button>
      </div>
    </div>
    <div class="operate">
      <button class="save-btn" @click="save" :disabled="!monitorEnts.length || monitorEnts.length>10">保 存</button>
      <button class="cancle-btn" @click="hideDialog">取 消</button>
    </div>
    <jOperaMsg ref="operaMsg" :code="opera.code" :msg="opera.msg" @close="saveCallFun"></jOperaMsg>
  </j-dialog>
</template>
<script>
import { jDialog, jTags, jSelect, jLoading, jOperaMsg } from '../../components'
import { attention as attrApi, personalSetting as ppcApi } from '../../api'
const pageSize = 10000
export default {
  data() {
    return {
      loading: true,
      loadFollow: null,
      loadMonitor: null,
      projectType: null,
      allFollow: null,
      followEnts: [],
      monitorEnts: [],
      entName: '',
      monitorCount: 0,
      opera: {
        code: 1,
        msg: ''
      }
    }
  },
  computed: {
    projectTypes() {
      return [{ value: null, name: '全部' }].concat(...this.$store.state.project_type)
    },
    allFollowLength() {
      return this.allFollow && this.allFollow.length ? this.allFollow.length : 0
    }
  },
  props: {
    value: {
      type: Array
    },
    initMonitorEnts: {
      type: Array
    }
  },

  methods: {
    showDialog() {
      this.entName = ''
      this.projectType = null
      this.loadFollow = this.getFollowEnts()
      this.loadMonitor = this.getMonitorEnts()
      Promise.all([this.loadFollow, this.loadMonitor]).then(() => {
        this.loading = false
        this.reset()
      })
      this.$refs.append_firm_dialog.show = true
    },
    hideDialog() {
      this.$refs.append_firm_dialog.show = false
    },
    getFollowEnts() {
      let promise = null
      if (this.allFollow) {
        promise = Promise.resolve(this.allFollow)
      } else {
        promise = attrApi.getAttentionList({
          pageSize: pageSize,
          pageNum: 1
        }).then(rtn => {
          this.allFollow = rtn.data.list || []
          return this.allFollow
        })
      }
      return promise.then(ents => {
        ents.forEach(ent => {
          ent.projectTypes || (ent.projectTypes = ent.projectTypeId.split(',').map(pt => +pt))
          ent.selected = false
        })
        return ents
      })
    },
    query() {
      this.followEnts = []
      if (!this.loadFollow) { return };

      this.loadFollow.then(ents => {
        this.followEnts = this.allFollow.filter(ent => {
          var matched = (!this.entName || ent.entName.includes(this.entName)) &&
            (!this.projectType || ent.projectTypes.includes(this.projectType)) && !ent.monitor
          if (!matched && ent.selected) {
            ent.selected = false
          }
          return matched
        })
        this.getMonitorCount()
      })
    },
    getMonitorEnts() {
      let promise = null
      if (this.initMonitorEnts) {
        promise = Promise.resolve(this.initMonitorEnts)
      } else {
        promise = ppcApi.getMonitorInfo().then(rtn => {
          return rtn.data && rtn.data.list ? rtn.data.list : []
        })
      }
      promise.then(ents => {
        // this.monitorEnts = ents.map(ent=>{entId:ent.entId,entName:ent.entName, selected:false});
        this.monitorEnts = ents.map(ent => { return { ...ent, selected: false } })
        return this.monitorEnts
      })
    },
    reset() {
      this.allFollow.forEach(ent => {
        ent.monitor = false
      })
      for (let i = this.monitorEnts.length; i--;) {
        let ent = this.monitorEnts[i]
        var tempEnt = this.allFollow.find(f => f.entId === ent.entId)
        if (tempEnt) {
          tempEnt.monitor = true
          ent.followEnt = tempEnt
          ent.selected = false
        } else {
          this.monitorEnts.split(i, 1)
        }
      }
      this.query()
    },

    selected(ent) {
      this.getMonitorCount()
    },
    addMonitor() {
      if (this.monitorCount === this.monitorEnts.length) return
      for (let i = this.followEnts.length; i--;) {
        let ent = this.followEnts[i]
        if (ent.selected) {
          ent.monitor = true
          ent.selected = false
          this.monitorEnts.push({
            entId: ent.entId,
            entName: ent.entName,
            followEnt: ent,
            selected: false
          })
        }
      }
      this.query()
    },
    removeMonitor(isAll = false) {
      for (var i = this.monitorEnts.length; i--;) {
        let ent = this.monitorEnts[i]
        if (isAll || ent.selected) {
          ent.followEnt.monitor = false
          ent.followEnt.selected = false
          this.monitorEnts.splice(i, 1)
        }
      }
      this.query()
    },

    save() {
      if (this.monitorEnts.length > 10) {
        return
      }
      let entIds = this.monitorEnts.map(ent => ent.entId).join(',');
      ppcApi.addMonitor({ entIds: entIds }).then(rtn => {
        if (rtn.code === 1) {
          this.opera.code = 1
          this.opera.msg = '保存成功！'
          this.$refs.operaMsg.show()
        }
      }).catch((err) => {
        this.opera.code = -1
        this.opera.msg = err.msg || '保存失败！'
        this.$refs.operaMsg.show()
      })
    },
    saveCallFun() {
      if (this.opera.code === 1) {
        this.hideDialog()
        this.$emit('save')
      }
    },
    getMonitorCount() {
      this.monitorCount = this.allFollow.filter(ent => { return ent.selected || ent.monitor }).length
    }
  },
  components: {
    jDialog,
    jTags,
    jSelect,
    jLoading,
    jOperaMsg
  }
}
</script>
<style lang='less' scoped>
table>thead {
  background: #f4f4f4;
}

.j-tabs {
  width: 1033px;
  height: 6.5rem;
  .page-company {
    padding: 30px 58px 9px;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    .attention-company {
      width: 383px; // height: 56.5vh;
      border: 1px solid #ccc;
      border-top: 2px solid #2395ea;
      .checkBox {
        -webkit-appearance: none;
        background: #fff;
        border: 1px solid #ccc;
      }
      .page-scroll {
        width: 100%;
        max-height: 42.9vh;
        -webkit-box-pack: justify;
        flex-wrap: wrap;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .page-add {
      line-height: 55vh;
      margin: 0 20px;
    }
    .selected-company {
      width: 383px; // height: 56vh;
      border: 1px solid #ccc;
      border-top: 2px solid #2395ea;
      overflow: hidden;
      .monitor-firm {
        height: 20px;
        margin: 24px 0 11px 18px;
      }
      .page-scroll {
        width: 100%;
        max-height: 42.9vh;
        -webkit-box-pack: justify;
        flex-wrap: wrap;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .attention-title {
      height: 39px;
      line-height: 39px;
      color: #000;
      padding-left: 19px;
      font-size: 15px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      span {
        font-size: 18px;
        color: #3ca1f8;
        margin-left: 5px;
      }
    }
    .add-btn {
      width: 87px;
      height: 30px;
      color: #2481d8;
      border: 1px solid #bddbf5;
      background: #eef2f7; // margin: 231px 30px 0;
      border-radius: 3px;
    }
  }
  .publist-list-category {
    margin: 0px 0 10px 20px;
    select {
      width: 110px;
      height: 25px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
  .item-subject {
    padding-left: 12px;
  }
  .add-firm {
    margin: 0px 58px 0px;
    height: 30px;
    .handle button:nth-child(1) {
      width: 66px;
      background: none;
      border: 1px solid #0092ff;
      color: #0092ff;
    }
    .handle button:nth-child(2) {
      width: 66px;
      background: none;
      border: 1px solid #fd8324;
      color: #fd8324;
    }
  }
  .operate {
    margin: 20px 58px 0px;
    height: 42px;
    text-align: center;
  }
  .paging {
    width: 55%;
  }
}
</style>
