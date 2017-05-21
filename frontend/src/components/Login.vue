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
      <input type="checkbox" v-model="formData.remember"><span class="remember">记住密码</span>
      <input type="checkbox" v-model="formData.freePassword"><span>一周免登陆</span>
      <a href="javascript:;" class="signup" @click="signup">注册</a>
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
          username: '',
          password: '',
          remember: true,
          freePassword: true
        },
        showError: false,
        errorMsg: '',

      }
    },
    created() {
      if (localStorage.remember === 'true') {
        this.formData.username = localStorage.username || '';
        this.formData.password = localStorage.password || '';
      }
    },
    methods: {
      signup() {
        this.$emit('signup');
      },
      submit() {
        if (this.check()) {
          this.$http.post('/apis/user/login', this.formData).then(res => {
            console.log(res.data);
            if (res.data.code === 1) {
              this.renderError(res.data.message);
            } else {
              localStorage.remember = this.formData.remember;
              if (this.formData.remember) {
                localStorage.username = this.formData.username;
                localStorage.password = this.formData.password;
              }
              this.$router.push({name: 'list'});
              this.formData = {
                username: '',
                password: '',
                remember: true,
                freePassword: true
              }
            }
          })
        }
      },
      renderError(msg) {
        this.showError = true;
        this.errorMsg = msg;
      },
      check() {
        if (!this.formData.username) {
          this.renderError('用户名不能为空');
          return false;
        }
        if (!this.formData.password) {
          this.renderError('密码不能为空');
          return false;
        }
        this.showError = false;
        this.errorMsg = '';
        return true;
      }
    }
  }
</script>
