<template>
  <div id="home">
    <header>
      <div class="logo">
        <a href="#">
          <img src="~img/logo.svg" alt="logo">
        </a>
      </div>
      <h1>HTML5可视化编辑系统</h1>
      <ul>
        <li><a href="javascript:;" @click="login">登陆</a></li>
        <li><a href="javascript:;" @click="signup">注册</a></li>
      </ul>
    </header>
    <div id="container">
      <div class="section section1">
        <div class="section-content">
          <h3>可视化制作H5</h3>
          <p>创作如此简单</p>
        </div>
      </div>
      <div class="section section2">
        <div class="section-content">
          <h3>挖掘你的想象力</h3>
          <p>与世界分享你的作品</p>
        </div>
      </div>
      <!--<div class="section section3">
      </div>-->
    </div>
    <modal v-model="showLogin" title="登陆">
      <login @signup="signup"></login>
    </modal>
    <modal v-model="showSignup" title="注册">
      <signup @login="login"></signup>
    </modal>
  </div>
</template>

<script>

  import '../../node_modules/fullpage.js/dist/jquery.fullpage.min.css';
  import '../../node_modules/fullpage.js/vendors/jquery.easings.min';
  import '../../node_modules/fullpage.js/dist/jquery.fullpage.min';

  import Modal from 'components/Modal';
  import Login from 'components/Login';
  import Signup from 'components/Signup';

  export default {
    data() {
      return {
        showLogin: false,
        showSignup: false
      }
    },
    mounted() {
      $('#container').fullpage({
        navigation: true,
        navigationColor: '#fff',
        afterLoad: function (anchorLink, index) {

          if (index === 1) {
            $('.section1 .section-content').delay(300).animate({
              opacity: 1,
              bottom: '30%'
            }, 1000, 'easeOutExpo');
          }

          if (index === 2) {
            $('.section2 .section-content').delay(300).animate({
              opacity: 1,
              bottom: '30%'
            }, 1000, 'easeOutExpo');
          }

        },
        onLeave: function (index, direction) {
          if (index === 1) {
            $('.section1 .section-content').delay(300).animate({
              opacity: 0,
              bottom: '28%'
            }, 1000, 'easeOutExpo');
          }
          if (index === 2) {
            $('.section2 .section-content').delay(300).animate({
              opacity: 0,
              bottom: '28%'
            }, 1000, 'easeOutExpo');
          }

        }
      });
    },
    destroyed() {
      $.fn.fullpage.destroy('all');
    },
    components: {
      Modal,
      Login,
      Signup
    },
    methods: {
      login() {
        this.showLogin = true;
        this.showSignup = false;
      },
      signup() {
        this.showSignup = true;
        this.showLogin = false;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #home {
    header {
      position: fixed;
      top: 0;
      left: 0;
      height: 60px;
      line-height: 60px;
      width: 100%;
      padding: 0 25px;
      box-sizing: border-box;
      z-index: 99;
      transition: .4s;
      color: #fff;
      &:hover {
        background: rgba(0, 0, 0, .6);
      }
      h1 {
        position: absolute;
        width: 100%;
        text-align: center;
      }
      ul {
        position: relative;
        z-index: 2;
        font-size: 14px;
        float: right;
        overflow: hidden;
        height: 60px;
        li {
          float: left;
        }
        a {
          margin-right: 10px;
          padding: 8px 20px;
          border: 1px solid transparent;
          border-radius: 20px;
          transition: .2s;
          &:hover {
            border: 1px solid #fff;
          }
        }
      }
      .logo {
        float: left;
        height: 60px;
        vertical-align: middle;
        position: relative;
        z-index: 2;
        img {
          height: 37px;
          padding-top: 12px;
        }
      }
    }
    #container {
      .section {
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .section:nth-child(1) {
        background-image: url("~img/1.jpg");
      }
      .section:nth-child(2) {
        background-image: url("~img/3.jpg");
      }
      .section:nth-child(3) {
        background-image: url("~img/2.jpg");
      }
    }

    .section-content {
      position: absolute;
      left: 10%;
      bottom: 28%;
      opacity: 0;
      color: #fff;
      font-size: 20px;
      h3 {
        font-size: 48px;
        font-weight: 400;
        margin-bottom: 20px;
      }
    }

    video {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  #fp-nav ul li a span {
    background: #fff !important;
  }
</style>
