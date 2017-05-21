<template>
  <div class="pic-lib">
    <ul class="pic-list">
      <li v-for="(item, index) in picList" @click="addPicItem(index)">
        <img :src="item.filePath">
        <p>
          <a href="javascript:;">选择</a>
          <a href="javascript:;" @click.stop="deletePic(item._id)">删除</a>
        </p>
      </li>
    </ul>
    <div class="fileinput-button">
      <span>上传</span>
      <input type="file" accept="image/gif, image/jpeg, image/png, image/jpg" @change="upload">
    </div>
    <button class="mybtn" v-if="isSetBackground" @click="reset">取消背景图</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        picList: [],
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      reset() {
        this.$store.dispatch('addBackgroundPic', '');
      },
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
            this.fetchList();
            this.$store.dispatch('openMessage', {
              type: 'success',
              content: res.data.message
            });
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
      fetchList() {
        this.$http.get('/apis/img/list').then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.picList = res.data.pics;
          }
        });
      },
      addPicItem(index) {
        var src = this.picList[index].filePath;

        if (!this.isSetBackground) {
          // 添加图片
          this.$store.dispatch('addPicItem', src);
        } else {
          // 添加背景
          this.$store.dispatch('addBackgroundPic', src);
        }


        // 关闭遮罩
        this.$store.dispatch('setShowPicLib', false);
      },
      deletePic(id) {
        console.log(id);
        this.$http.post('/apis/img/delete', {id: id})
          .then(res => {
            console.log(res.data);
            if (res.data.code === 0) {
              this.fetchList();
            }
          })
      }
    },
    created() {
      console.log('piclib created');
      this.fetchList();
    },
    computed: {
      isSetBackground() {
        return this.$store.state.isSetBackground;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .pic-lib {
    padding: 15px;
    .pic-list {
      width: 100%;
      height: 330px;
      overflow: auto;
      li {
        cursor: pointer;
        width: 130px;
        height: 160px;
        margin: 0 10px 10px 0;
        float: left;
        p {
          text-align: center;
          display: flex;
          a {
            flex: 1;
            color: #aaa;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      img {
        width: 130px;
        height: 130px;
        display: inline-block;
        vertical-align: top;
      }
    }

    .mybtn {
      margin-top: 5px;
      margin-left: 10px;
      width: 100px;
    }

  }
</style>
