<template>
  <ul class="main-nav">
    <li>
      <router-link to="/list">
        <span class="icon"></span>
        <span>我的作品</span>
      </router-link>
    </li>
    <!--<li>
      <span class="icon"></span>
      <span>图片库</span>
    </li>
    <li>
      <span class="icon"></span>
      <span>音乐库</span>
    </li>-->
    <li>
      <router-link to="/user">
        <span class="icon"></span>
        <span>个人中心</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    methods: {},
    computed: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .main-nav {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 60px;
    font-size: 14px;
    text-align: center;
    li {
      box-sizing: border-box;
      padding-top: 5px;
      width: 80px;
      height: 60px;
      display: inline-block;
      vertical-align: middle;
      line-height: 20px;
    }
    li:nth-child(1) {
      .icon {
        background-position: 0 0;
      }
    }
    li:nth-child(2) {
      .icon {
        background-position: 0 -180px;
      }
    }
    li:nth-child(3) {
      .icon {
        background-position: 0 -150px;
      }
    }
    li:nth-child(4) {
      .icon {
        background-position: 0 -120px;
      }
    }
    li:nth-child(5) {
      .icon {
        background-position: 0 -240px;
      }
    }
    li:nth-child(6) {
      .icon {
        background-position: 0 -270px;
      }
    }
    span {
      display: block;
      text-align: center;
    }
    .icon {
      width: 30px;
      height: 30px;
      background-image: url("~img/icon.png");
      margin: 0 auto;
    }
  }
</style>
