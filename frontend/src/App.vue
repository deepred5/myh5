<template>
  <div id="app">
    <router-view></router-view>
    <loading :show="show"></loading>
    <message :message-config="messageConfig"></message>
  </div>
</template>

<script>
  import 'babel-polyfill';
  import Loading from 'components/Loading';
  import Message from 'components/Message';
  export default {
    name: 'app',
    components: {
      Loading,
      Message
    },
    computed: {
      show(){
        return this.$store.state.showLoading;
      },
      messageConfig() {
        return this.$store.state.messageConfig;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "./assets/css/reset.css";
  @import "./assets/css/common";
</style>
