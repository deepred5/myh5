<template>
  <ul class="add-content">
    <li @click="addTxtItem">
      <span class="icon"></span>
      <span>文本</span>
    </li>
    <li @click="showPicLib">
      <span class="icon"></span>
      <span>图片</span>
    </li>
    <li @click="showBackgroundLib">
      <span class="icon"></span>
      <span>背景</span>
    </li>
    <li @click="showMusicLib">
      <span class="icon"></span>
      <span>音乐</span>
    </li>
    <li @click="save">
      <span class="icon"></span>
      <span>保存</span>
    </li>
    <li @click="preview">
      <span class="icon"></span>
      <span>预览</span>
    </li>
    <li @click="showConfig">
      <span class="icon"></span>
      <span>设置</span>
    </li>
  </ul>
</template>

<script>
  export default {
    methods: {
      addTxtItem() {
        this.$store.dispatch('addTxtItem');
      },
      showPicLib() {
        this.$store.dispatch('setShowPicLib', true);
        this.$store.dispatch('changeIsSetBackground', false);
      },
      showBackgroundLib() {
        this.$store.dispatch('setShowPicLib', true);
        this.$store.dispatch('changeIsSetBackground', true);
      },
      showMusicLib() {
        this.$store.dispatch('setShowMusicLib', true);
      },
      showConfig() {
        this.$store.dispatch('setConfig', true);
      },
      save() {
        this.$http.post('/apis/work/save', {
          id: this.$route.params.id,
          mainCode: this.mainCode,
          title: this.title,
          thumbnail: this.thumbnail
        }).then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.$store.dispatch('openMessage', {
              type: 'success',
              content: res.data.message
            });
          }
        });
      },
      preview() {
        var url = `http://${window.location.host}/show/${this.$route.params.id}`;
        console.log(url);
        window.open(url);
      },
      config() {

      }
    },
    computed: {
      mainCode() {
        return this.$store.state.mainCode;
      },
      thumbnail() {
        return this.$store.state.thumbnail;
      },
      title() {
        return this.$store.state.title;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .add-content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 60px;
    font-size: 14px;
    text-align: center;
    li {
      box-sizing: border-box;
      padding-top: 5px;
      cursor: pointer;
      width: 50px;
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
        background-position: 0 -30px;
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
    li:nth-child(7) {
      .icon {
        background-position: -30px 0;
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
