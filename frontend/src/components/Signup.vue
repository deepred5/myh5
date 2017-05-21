<template>
  <form class="modal-form" @submit.prevent="submit">
    <!-- 阻止浏览器自动填充表单 -->
    <input style="display:none">
    <input type="password" style="display:none">

    <div class="error" :class="{'show-error': showError}">{{errorMsg}}</div>
    <div class="item">
      <label>用户名</label>
      <input type="text" placeholder="请输入用户名" v-model.trim="formData.username">
    </div>
    <div class="item">
      <label>密码</label>
      <input type="password" placeholder="请输入密码" v-model.trim="formData.password">
    </div>
    <div class="item">
      <label>确认密码</label>
      <input type="password" placeholder="请再次输入密码" v-model.trim="formData.repeatPwd">
    </div>
    <div class="item">
      <label>验证码</label>
      <input type="text" class="captcha" placeholder="请输入验证码" v-model.trim="formData.captcha">
      <img :src="captchaUrl" alt="captcha" @click="changeCaptcha">
    </div>
    <div class="item clearfix">
      <a href="javascript:;" class="login" @click="login">已有账号</a>
    </div>
    <div class="item">
      <button>注册</button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        captchaUrl: '/apis/captcha',
        formData: {
          username: '',
          password: '',
          repeatPwd: '',
          captcha: ''
        },
        showError: false,
        errorMsg: ''
      }
    },
    methods: {
      login() {
        this.$emit('login');
      },
      changeCaptcha() {
        this.captchaUrl = `/apis/captcha?t=${Math.random()}`;
      },
      check()  {
        if (!this.formData.username) {
          this.renderError('用户名不能为空');
          return false;
        }
        if (!this.formData.password) {
          this.renderError('密码不能为空');
          return false;
        }
        if (this.formData.password !== this.formData.repeatPwd) {
          this.renderError('两次输入密码不同');
          return false;
        }
        if (!this.formData.captcha) {
          this.renderError('验证码不能为空');
          return false;
        }
        if (!/^[0-9a-zA-Z]{4}$/.test(this.formData.captcha)) {
          this.renderError('请输入4位有效验证码');
          return false;
        }
        this.showError = false;
        this.errorMsg = '';
        return true
      },
      renderError(msg) {
        this.showError = true;
        this.errorMsg = msg;
      },
      submit() {
        if (this.check()) {
          this.$http.post('/apis/user/signup', this.formData).then(res => {
            if (res.data.code === 1) {
              this.renderError(res.data.message)
            } else {
              this.login();
              this.formData = { // 清空数据
                username: '',
                password: '',
                repeatPwd: '',
                captcha: ''
              };
              this.changeCaptcha(); // 更换验证码
            }
          })
        }
      }
    }
  }
</script>
