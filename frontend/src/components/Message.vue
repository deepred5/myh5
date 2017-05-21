<template>
  <transition name="fade">
    <div class="message" :class="getClass(messageConfig.type)" v-show="messageConfig.show">
      <p>{{messageConfig.content}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      messageConfig: {
        type: Object,
        default: function () {
          return {
            content: '', // 提示信息
            type: '', // 提示类型 success error info
            show: false
          }
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      getClass(type) {
        if (type) {
          return {
            ['message-' + type]: true
          }
        }
        return {};
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .message {
    border-radius: 5px;
    background: #fff;
    padding: 10px 40px;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    z-index: 999999;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7)
  }

  .message-info {
    border: 1px solid #d6ebff;
    background-color: #ebf5ff;
  }

  .message-success {
    border: 1px solid #f4f1fc;
    background-color: #f4f1ff;
  }

  .message-error {
    border: 1px solid #ffd6cc;
    background-color: #ffebe6;
  }

</style>
