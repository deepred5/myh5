<template>
  <div class="user">
    <my-header>
      <main-nav></main-nav>
    </my-header>
    <div class="list-title">
      <p>我的个人中心</p>
    </div>
  </div>
</template>

<script>
  import myHeader from 'components/Header';
  import MainNav from 'components/MainNav';
  export default {
    components: {
      myHeader,
      MainNav
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-title {
    width: 960px;
    margin: 10px auto;
    font-size: 24px;
    color: #1A1A19;
    padding: 60px 0 10px 0;
    border-bottom: 1px solid #ccc;
  }

</style>
