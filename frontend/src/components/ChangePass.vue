<template>
  <form class="modal-form" @submit.prevent="submit">
    <!-- 阻止浏览器自动填充表单 -->
    <input style="display:none">
    <input type="password" style="display:none">

    <div class="error" :class="{'show-error': showError}">{{errorMsg}}</div>
    <div class="item">
      <label>原密码</label>
      <input type="password" placeholder="请输入密码" v-model.trim="formData.password">
    </div>
    <div class="item">
      <label>新密码</label>
      <input type="password" placeholder="请再次输入密码" v-model.trim="formData.newPwd">
    </div>
    <div class="item">
      <label>确认新密码</label>
      <input type="password" placeholder="请再次输入密码" v-model.trim="formData.repeatPwd">
    </div>
    <div class="item">
      <button>登陆</button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          password: '',
          newPwd: '',
          repeatPwd: ''
        },
        showError: false,
        errorMsg: '',
      }
    },
    methods: {
      submit() {
        if (this.check()) {
          this.$http.post('/apis/user/change', this.formData).then(res => {
            console.log(res.data);
            if (res.data.code === 1) {
              this.renderError(res.data.message);
            } else {
              this.formData = {
                password: '',
                newPwd: ''
              };
              this.$emit('modify');
            }
          })
        }
      },
      renderError(msg) {
        this.showError = true;
        this.errorMsg = msg;
      },
      check() {
        if (!this.formData.password) {
          this.renderError('原密码不能为空');
          return false;
        }
        if (!this.formData.newPwd) {
          this.renderError('新密码不能为空');
          return false;
        }
        if (this.formData.newPwd !== this.formData.repeatPwd) {
          this.renderError('两次输入密码不同');
          return false;
        }
        this.showError = false;
        this.errorMsg = '';
        return true;
      }
    }
  }
</script>
