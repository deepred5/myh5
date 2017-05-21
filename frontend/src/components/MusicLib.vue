<template>
  <div class="music-lib">
    <ul class="music-list">
      <li v-for="(item, index) in musicList" @click="choice(index)">
        <p class="ellipsis">{{item.originalFilename}}</p>
        <a class="button delete" href="javascript:;" @click.stop="deleteMusic(item._id)">删除</a>
        <a class="button" href="javascript:;" @click="play(index)" v-if="!item.isPlay">播放</a>
        <a class="button" href="javascript:;" @click="pause(index)" v-else>暂停</a>
      </li>
    </ul>
    <div class="choice" v-if="currentIndex > -1">
      <p class="ellipsis">{{musicList[currentIndex].originalFilename}}</p>
      <a href="javascript:;" class="button" @click="cancel">取消</a>
      <a href="javascript:;" class="button" @click="setBackgroundMusic">确定</a>
    </div>
    <div class="fileinput-button">
      <span>上传</span>
      <input type="file" accept="audio/*" @change="upload">
    </div>
    <button class="mybtn" @click="reset">取消音乐</button>
    <audio :src="audioSrc" autoplay></audio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        musicList: [],
        audioSrc: '',
        currentIndex: -1
      }
    },
    methods: {
      reset() {
        this.$store.dispatch('setBackgroundMusic', '');
      },
      stopAll() {
        this.musicList.forEach(function (item) {
          item.isPlay = false;
        });
      },
      choice(index) {
        this.currentIndex = index;
      },
      cancel() {
        this.$store.dispatch('setShowMusicLib', false); // 关闭遮罩
        this.currentIndex = -1;
        this.audioSrc = '';
        this.stopAll();
      },
      play(index) {
        console.log('play', index);
        this.audioSrc = this.musicList[index].filePath;
        this.stopAll();
        this.musicList[index].isPlay = true;
      },
      pause(index) {
        console.log('pause', index);
        this.audioSrc = '';
        this.stopAll();
      },
      upload(ev) {
        var files = ev.target.files;
        var formData = new FormData();

        for (var item in files) {
          formData.append('files', files[item]);
        }

        console.log(files[0])

        this.$http.post('/apis/audio/upload', formData).then(res => {
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
        this.$http.get('/apis/audio/list').then(res => {
          console.log(res.data);
          if (res.data.code === 0) {
            this.musicList = res.data.musics;
            this.musicList.forEach(function (item) {
              item.isPlay = false;
            });
          }
        });
      },
      setBackgroundMusic() {
        this.$store.dispatch('setBackgroundMusic', this.musicList[this.currentIndex].filePath);
        this.$store.dispatch('setShowMusicLib', false);
        this.currentIndex = -1;
        this.audioSrc = '';
      },
      deleteMusic(id) {
        console.log(id);
        this.$http.post('/apis/audio/delete', {id: id})
          .then(res => {
            console.log(res.data);
            if (res.data.code === 0) {
              this.fetchList();
            }
          });
      }
    },
    created() {
      console.log('musicLib created');
      this.fetchList();
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .music-lib {
    padding: 15px;
    .ellipsis {
      max-width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .button {
      float: right;
      color: #ada0e6;
      &:hover {
        text-decoration: underline;
      }
    }
    .music-list {
      font-size: 16px;
      height: 140px;
      overflow: auto;
      li {
        border-radius: 4px;
        padding: 5px;
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        transition: .5s;
        &:hover {
          background: #eee;
        }
        .delete {
          margin-left: 8px;
        }
      }
      p {
        display: inline-block;
      }
    }
    .choice {
      padding: 10px;
      color: #fff;
      border-radius: 4px;
      background: #ada0e6;
      margin-bottom: 10px;
      p {
        display: inline-block;
      }
      a {
        color: #fff;
        margin-left: 10px;
      }
    }

    .mybtn {
      margin-top: 5px;
      margin-left: 10px;
      width: 80px;
    }
  }
</style>
