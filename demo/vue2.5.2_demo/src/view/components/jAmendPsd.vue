<template>
  <!--修改密码-->
  <j-dialog :init-title="title"
            :init-show="false"
            :init-show-title='showTitle'
            class='attr_dialog'
            ref="dialog">
    <div class='bouncedBox'>
      <ul class='formList'>
        <li>
          <label>原密码</label>
          <input id="rawPsw" type="text" @keyup="keyEvent"/>
          <i>*</i>
        </li>
        <li>
          <label>新密码</label>
          <input id="newPsw" type="text" @keyup="keyEvent"/>
          <i>*</i>
        </li>
        <li>
          <label>确认密码</label>
          <input id="renewPsw" type="text" @keyup="keyEvent"/>
          <i>*</i>
          <div class="jurisdiction" v-show="errMsg">两次输入的密码不一致</div>
        </li>
        <p>为了你的帐户安全建议你定期修改密码,如忘记密码请联系系统管理员。</p>
      </ul>
    </div>
    <div class="saved">
      <button class="save-btn" @click='save'>保 存</button>
      <button class="cancle-btn" @click='close'>取 消</button>
    </div>
  </j-dialog>
</template>
<script>
  import {jDialog} from '../../components'
  import {user as api} from '../../api'

  export default {
    props: {
      title: {type: String},
      itemList: {type: Object}
    },
    data: function() {
      return {
        errMsg: false
      }
    },
    computed: {
      showTitle() {
        return !!this.title
      }
    },
    methods: {
      keyEvent: function(event) {
        let vm = this
        let targetId = event.target.id
        let curItem = document.getElementById(targetId)
        let rawPswInputValue = document.getElementById('rawPsw').value
        if (targetId != 'rawPsw' && rawPswInputValue == '') {
          alert('请输入原密码')
          curItem.value = ''
          return
        }

        if (targetId == 'renewPsw') {
          let newPswInputValue = document.getElementById('newPsw').value
          if (newPswInputValue == '') {
            alert('请输入新密码')
            curItem.value = ''
            return
          }
          let isMatch = newPswInputValue.indexOf(curItem.value)
          if (curItem.value != '' && isMatch != 0) {
            vm.errMsg = true
          } else {
            vm.errMsg = false
          }
        }
      },
      logout() {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
      save: function() {
        let vm = this
        let oldPswValue = document.getElementById('rawPsw').value
        let newPswValue = document.getElementById('newPsw').value
        let renewPswValue = document.getElementById('renewPsw').value
        if (newPswValue != renewPswValue) {
          vm.errMsg = true
        }
        if (vm.errMsg || oldPswValue == '' || newPswValue == '' || renewPswValue == '') {
          return
        }
        api.updateUserPsw({
          oldPassword: oldPswValue,
          newPassword: newPswValue
        }).then(function(response) {
          if (response != null && response.code == 1) {
            alert('修改成功!')
            vm.logout()
          } else if (response != null && response.msg != null) {
            alert(response.msg)
          } else {
            alert('修改失败,请稍后再试!')
          }
          vm.close()
        }).catch(function(error) {
          if (error != null && error.msg != null) {
            alert(error.msg)
          } else {
            alert('修改失败,请稍后再试!')
          }
        })
      },
      close: function() {
        document.getElementById('rawPsw').value = ''
        document.getElementById('newPsw').value = ''
        document.getElementById('renewPsw').value = ''
        this.$refs.dialog.show = false
      },
      show() {
        this.$refs.dialog.show = true
      }
    },
    components: {
      jDialog
    }
  }
</script>
<style scoped lang='less'>
  .attr_dialog {
    width: 455px;
    color: rgba(0, 0, 0, 0.8);
  }

  .bouncedBox {
    margin: 22px 22px 22px 22px;

  .formList {

  li {
    height: 53px;
    line-height: 40px;

  label {
    display: inline-block;
    width: 80px;
    text-align: right;
  }

  input {
    width: 220px;
    height: 28px;
    border: 1px solid #d2d2d2;
    margin-left: 23px;
    outline: none;
    padding-left: 15px;
  }

  i {
    color: red;
  }

  }
  }
  p {
    width: 220px;
    margin-left: 23%;
    line-height: 18px;
    margin-top: 10px;
  }

  }

  .jurisdiction {
    width: 201px;
    height: 23px;
    line-height: 23px;
    color: #ff4a2c;
    padding-left: 102px;
    margin-top: -5px;
    margin-left: 5px;
    font-size: 12px;
    background-image: url(../../assets/images/label.png);
    background-repeat: no-repeat;
    background-position: 28% 40%;
  }

  .saved {
    text-align: center
  }
</style>

