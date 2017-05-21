<template>
  <transition name="fade">
    <div class="config" @click="closeConfig">
      <div class="work-config" @click.stop>
        <div class="work-config-title">
          <p>全局设置</p>
        </div>
        <div class="work-cover">
          <img :src="thumbnail" alt="cover">
          <div class="fileinput-button">
            <span>上传封面</span>
            <input type="file" accept="image/gif, image/jpeg, image/png, image/jpg" @change="upload">
          </div>
        </div>
        <div class="work-set-title">
          <label>设置标题</label>
          <input type="text" :value="title" ref="profile">
        </div>
        <div class="save">
          <button class="mybtn" @click="save">保存</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      upload(ev) {
        var files = ev.target.files;
        var formData = new FormData();

        for (var item in files) {
          formData.append('files', files[item]);
        }

        console.log(files[0]);

        this.$http.post('/apis/img/upload', formData).then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.$store.dispatch('openMessage', {
              type: 'success',
              content: res.data.message
            });
            this.$store.dispatch('setThumbnail', res.data.filePath);
          } else {
            this.$store.dispatch('openMessage', {
              type: 'error',
              content: res.data.message
            });
          }
        }).catch(err => {
          this.$store.dispatch('openMessage', {
            type: 'error',
            content: err
          });
        });
      },
      save() {
        var mytitle = this.$refs.profile.value;
        if (!mytitle) {
          this.$store.dispatch('openMessage', {
            type: 'error',
            content: '标题不能为空'
          });
          return;
        } else {
          this.$store.dispatch('setTitle', mytitle);
        }
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
            this.closeConfig();
          }
        });
      },
      closeConfig() {
        this.$store.dispatch('setConfig', false);
      }
    },
    computed: {
      thumbnail() {
        return this.$store.state.thumbnail;
      },
      title() {
        return this.$store.state.title;
      },
      mainCode() {
        return this.$store.state.mainCode;
      },
      thumbnail() {
        return this.$store.state.thumbnail;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .config {
    z-index: 999;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
  }

  .work-config {
    position: fixed;
    right: 0;
    top: 60px;
    background: #fff;
    width: 300px;
    bottom: 0;

    .work-config-title {
      height: 36px;
      background: #ada0e6;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }

    .work-cover {
      margin-top: 30px;
      text-align: center;
      img {
        border: 1px solid #a28ef6;
        width: 220px;
        height: 220px;
        vertical-align: top;
      }
      .fileinput-button {
        width: 150px;
        margin-top: 30px;
      }
    }

    .work-set-title {
      margin-top: 20px;
      text-align: center;
      label {
        width: 80%;
        display: inline-block;
        margin-bottom: 10px;
      }
      input {
        width: 200px;
        border: 1px solid #ccc;
        padding: 10px;
      }
    }

    .save {
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
