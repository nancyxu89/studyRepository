<template>
  <j-dialog :initTitle="title" class='attr_dialog' ref="dialog" :class="{'modify':!isAdd}">
    <h4>新增关注企业的项目类型为：</h4>
    <div class="types">
      <label v-for="(type,index) in types" class="project_type" v-bind:key="index">
        <jCheckbox :id="'type_'+type.value" v-model="type.selected"></jCheckbox>{{type.name}}
      </label>
    </div>
    <div class="footer">
      <p class="remark">关注后可在关注列表中修改项目类</p>
      <button :disabled="!selTypes.length" class="save-btn" @click="save">保 存</button>
      <button class="cancle-btn" @click="close">取 消</button>
    </div>
  </j-dialog>
</template>

<script>
import {
  mapActions
} from 'vuex'
import {
  jDialog,
  jCheckbox
} from '../../components'
export default {
  props: {
    value: {
      type: String | Array,
      default: function() {
        return []
      }
    },
    entId: {
      type: String | Number,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      // isAdd: true,
      types: [],
      isCanSave: true,
      init: null
    }
  },
  computed: {
    isAdd() {
      return !this.value || !this.value.length
    },
    title() {
      return this.isAdd ? '设置项目类型' : '修改项目类型'
    },
    selTypes() {
      return this.types.filter(type => { return type.selected })
    }
  },
  created() {
    this.getTypes()
  },
  methods: {
    save() {
      let ev = {
        selTypes: this.selTypes,
        canSave: true
      }
      this.$emit('saving', ev)
      if (ev.canSave) {
        // 执行保存
        var values = this.selTypes.map(item => {
          return item.value
        })
        var projectType = values.join(',')
        let rtn
        if (this.isAdd) {
          rtn = this.add({
            entId: this.entId,
            projectType: projectType
          })
        } else {
          rtn = this.modify({
            entId: this.entId,
            projectType: projectType
          })
        }
        rtn.then(r => {
          if (r) {
            this.$emit('input', this.selTypes)
            this.$emit('save', this.selTypes)
            this.close()
          } else {

          }
        })
      }
    },
    setSelected() {
      this.init.then(() => {
        this.value || (this.value = [])
        this.types.forEach(t => {
          t.selected = this.value.includes(t.value)
        })
      })
    },
    close() {
      this.$refs.dialog.show = false
    },
    show() {
      this.setSelected()
      this.$refs.dialog.show = true
    },
    getTypes() {
      this.init = this.$store.dispatch('getEnum').then(() => {
        this.types = this.$store.state.project_type.map(type => {
          return {
            selected: false,
            ...type
          }
        })
        // return this.types;
      })
    },
    ...mapActions({
      add: 'addAttention',
      modify: 'modifyAttention'
    })

  },
  components: {
    jDialog,
    jCheckbox
  }
}
</script>

<style lang="less" scoped>
  .attr_dialog {
    width: 455px;
    color: rgba(0, 0, 0, 0.8);
  }

  h4 {
    font-size: 14px;
    font-weight: normal;
    line-height: 3;
  }

  .types {
    display:-ms-flexbox;display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid #d5d5d5;
    padding-bottom: 10px;
  }

  .remark {
    text-align: left;
    margin: 15px 0;
  }

  .project_type {
    display: inline-block;
    width: 120px;
    line-height: 3.417;
  }

  hr {
    background: #d5d5d5;
    color: #d5d5d5;
    border-color: #d5d5d5;
  }

  .footer {
    text-align: center;
    .save-btn {
      margin-right: 10px;
    }
    .cancle-btn {
      margin-left: 10px;
    }
  }

  .modify{
    h4,.remark{
      display: none;
    }
    .types{
      border:none;
    }
  }
</style>
