<template>
  <j-select ref="j_select">
    <div class="district">
      <!--<div>
          <h4 class="title">
            热门区域
          </h4>
          <div class="area-box">
            <span v-for="city in hotCitys" class="area" @click="selected(city)">{{city}}</span>
          </div>
        </div>-->
      <div>
        <h4 class="title">
          按大区域选择
        </h4>
        <div v-for="(group,index) in groups" v-bind:key="index" class="group">
          <span class="group-title">{{group.name}}</span>
          <div class="area-box">
            <span v-for="(provice,idx) in group.provices" v-bind:key="idx" class="area" @click="selected(provice)">{{provice}}</span>
          </div>
          <!--</span>-->
        </div>
      </div>
    </div>
    <!--</div>-->
  </j-select>
</template>

<script>
import jSelect from './jSelect.vue'

export default {
  props: ['value'],
  data() {
    return {
      groups: [{
        name: '华北',
        provices: ['北京', '天津', '河北', '山西', '内蒙古']
      },
      {
        name: '东北',
        provices: ['辽宁', '吉林', '黑龙江']
      },
      {
        name: '华东',
        provices: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东']
      },
      {
        name: '中南',
        provices: ['河南', '湖北', '湖南', '广东', '海南', '广西']
      },
      {
        name: '西南',
        provices: ['重庆', '四川', '云南', '贵州', '西藏']
      },
      {
        name: '西北',
        provices: ['陕西', '甘肃', '青海', '宁夏', '新疆']
      }
      ]
    }
  },
  methods: {
    selected(areaName) {
      this.$refs.j_select.text = areaName
      this.$emit('input', areaName)
      this.$emit('change', areaName)
    }
  },
  components: {
    jSelect
  }
}
</script>

<style scoped lang="less">
.district {
  border: 1px solid #bebebe;
  border-radius: 4px;
  background-color: #fff;
  width: 250px;
  color: #444;
  padding: 0 10px;
}

.area-box {
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap; // justify-content: space-between;
}

.area {
  margin: 3px 0;
  padding: 0px 7px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #3b96e4;
    color: #fff;
  }
}

.title {
  color: #999;
  border-bottom: 1px solid #bebebe;
}

.group {
  display: -ms-flexbox;
  display: flex;
}

.group-title {
  font-weight: bold;
  width: 40px;
  margin-top: 3px;
  flex-shrink: 0;
  flex-grow: 0;
  text-align: left;
}
</style>
