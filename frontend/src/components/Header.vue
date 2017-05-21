<template>
  <header class="header">
    <router-link to="/list"><h1>MY-H5</h1></router-link>
    <slot></slot>
    <ul class="user">
      <span>欢迎, {{username}}</span>
      <li @click="modify" v-if="setPass">修改密码</li>
      <li @click="logout">退出</li>
    </ul>
    <modal v-model="showChange" title="修改密码">
      <change-pass @modify="handleChange"></change-pass>
    </modal>
  </header>
</template>

<script>
  import Modal from 'components/Modal';
  import ChangePass from 'components/ChangePass';
  export default {
    data() {
      return {
        username: localStorage.username || '',
        showChange: false
      }
    },
    props: {
      setPass: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      logout() {
        this.$http.post('/apis/user/logout').then(res => {
          if (res.data.code === 0) {
            this.$router.push({name: 'home'});
          }
        })
      },
      modify() {
        this.showChange = true;
      },
      handleChange() {
        this.showChange = false;
        this.$store.dispatch('openMessage', {
          type: 'success',
          content: '修改密码成功，请重新登陆页面'
        });
        setTimeout(this.logout, 3000);
      }
    },
    components: {
      Modal,
      ChangePass
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .header {
    position: fixed;
    height: 60px;
    top: 0;
    left: 0;
    width: 100%;
    background: #0a141d;
    color: #fff;
    line-height: 60px;
    z-index: 99;
    h1 {
      float: left;
      margin-left: 30px;
    }
    .user {
      float: right;
      margin-right: 30px;
      height: 60px;
      li {
        cursor: pointer;
        display: inline-block;
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        border-radius: 8px;
        background: #e67571;
        transition: .5s;
        &:hover {
          background: #ada0e6;
        }
      }
      span {
        padding: 0 10px;
      }
    }
  }
</style>
