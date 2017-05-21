<template>
  <transition name="fade">
    <div class="modal-container" v-show="visible" @click="closeModal">
      <div class="modal-content" @click.stop :style="mystyle">
        <div class="modal-header">
          <h3>{{title}}</h3>
          <a class="close" @click="closeModal">X</a>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '标题'
      },
      picLib: {
        type: Boolean,
        default: false
      },
      musicLib: {
        type: Boolean,
        default: false
      },
      mystyle: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        visible: this.value
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      }
    },
    methods: {
      closeModal() {
        this.visible = false;
        // 关闭遮罩
        this.$emit('input', false);
        if (this.picLib) {
          // 如果传入的v-modal是vuex数据,需要发送actions才能关闭遮罩
          this.$store.dispatch('setShowPicLib', false);
        }
        if (this.musicLib) {
          this.$store.dispatch('setShowMusicLib', false);
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .modal-container {
    z-index: 999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
  }

  .modal-content {
    border-radius: 5px;
    width: 450px;
    background: #fff;
    position: absolute;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .modal-header {
      border-radius: 5px;
      color: #526069;
      padding: 14px 16px;
      background: #f7f7f7;
      position: relative;
      line-height: 20px;
      .close {
        position: absolute;
        right: 16px;
        top: 16px;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #59c7f9;
        }
      }
    }
  }

</style>
