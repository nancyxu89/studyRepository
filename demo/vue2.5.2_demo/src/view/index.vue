<template>
  <div class="hello">
    <h1>First Page</h1>
    <!--<paging :totalCount="totalCount" :pageSize="pageSize" @pageChanged="gotoPage"></paging>-->
    <!--<sort-button text="发布日期"></sort-button>
        <modal-dialog></modal-dialog>-->

    <!--<j-select class="select" :initItems="citys" v-model="city" displayKey='name' valueKey="value"></j-select>{{city}}
        <j-datePicker v-model="date"></j-datePicker>-->
    <jPublicSentimentTags></jPublicSentimentTags>
    <jAttention entId='12'
                v-model="types"></jAttention>
    <!--<label><jCheckbox id="c1"></jCheckbox>测试</label>-->
    <j-district></j-district>
    <span v-auth="'123'">sfsfa</span>
    <jDownload ref="download" @download="download"></jDownload>
    <button @click="showDownload">下载</button>
  </div>
</template>

<script>
import { jDatePicker, jSelect, jCheckbox, jDistrict, jDownload } from '../components'
import { jAttention, jPublicSentimentTags } from './components'
export default {
  name: 'index',
  data() {
    return {
      pageSize: 10,
      showPages: 3,
      totalCount: 286,
      date: '2017-03-01',
      city: {},
      citys: [
        { name: '北京', value: 1 },
        { name: '上海', value: 2 },
        { name: '广州', value: 3 },
        { name: '天津', value: 4 }
      ],
      types: [1, 2, 3]
    }
  },
  created() {
    setTimeout(() => {
      this.$store.commit('COM_ERR', { code: -10, msg: '错误测试' })
    }, 10000)
    setTimeout(() => {
      this.$store.commit('COM_ERR', { code: -30, msg: '错误测试1' })
    }, 20000)
    var type = this.$store.state.project_type
  },
  methods: {
    gotoPage: function(page) {

    },
    showDownload() {
      this.$refs.download.show()
    },
    download(data) {
    }
  },
  components: {
    jPublicSentimentTags,
    jSelect,
    jDatePicker,
    jAttention,
    jCheckbox,
    jDistrict,
    jDownload
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
  margin: 10px;
  width: 120px;
}
</style>
