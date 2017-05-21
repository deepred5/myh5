<template>
  <div class="list">
    <my-header :setPass="true"></my-header>
    <div class="list-title">
      <p>我的H5作品</p>
    </div>
    <div class="list-content">
      <ul class="clearfix">
        <li class="create" @click="showCreate = true">
          <div class="icon">
            <div class="icon-container">
              <div class="row"></div>
              <div class="col"></div>
            </div>
          </div>
          <p class="info">创建新作品</p>
        </li>
        <li v-for="work in works">
          <div class="cover">
            <a :href="`/show/${work._id}`" target="_blank">
              <vue-q-art
                :config="{value: `http://${host}/show/${work._id}`, imagePath: work.thumbnail, filter: 'color'}"
                class="qart"></vue-q-art>
              <img :src="work.thumbnail" alt="cover">
            </a>
          </div>
          <div class="info">
            <p>{{work.title}}</p>
          </div>
          <div class="operate">
            <router-link :to="{name: 'edit', params: {id: work._id}}">编辑</router-link>
            <a href="javascript:;" @click="deleteWork(work._id)">删除</a>
            <a href="javascript:;" v-if="work.status === 0" @click="release(work._id)">发布</a>
          </div>
          <span class="status" :class="{complete: work.status === 1}">{{work.status === 0 ? '草稿' : '发布'}}</span>
        </li>
      </ul>
    </div>
    <modal v-model="showCreate" title="创建作品">
      <create v-model="showCreate"></create>
    </modal>
  </div>
</template>

<script>
  import myHeader from 'components/Header';
  import Modal from 'components/Modal';
  import Create from 'components/Create';
  // import MainNav from 'components/MainNav';
  import VueQArt from 'vue-qart';


  export default {
    data() {
      return {
        showCreate: false,
        works: [],
        host: window.location.host
      }
    },
    components: {
      myHeader,
      Modal,
      Create,
      VueQArt
    },
    created() {
      this.fetchWorks();
    },
    methods: {
      deleteWork(id) {
        this.$http.post('/apis/work/delete', {
          id: id
        }).then(res => {
          if (res.data.code === 0) {
            this.fetchWorks();
          }
        });
      },
      release(id) {
        this.$http.post('/apis/work/release', {
          id: id
        }).then(res => {
          if (res.data.code === 0) {
            this.fetchWorks();
          }
        });
      },
      fetchWorks() {
        this.$http.get('/apis/list').then(res => {
          if (res.data.code === 0) {
            this.works = res.data.works;
            console.log(this.works);
          }
        })
      },
      demo() {
        this.config2.value = `http://www.bilibili.com`;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  $purple: #ada0e6;

  .list {
    min-width: 960px;

    .mytest {
      width: 100px;
      height: 100px;
      background: #fed;
    }

    canvas {
      width: 220px;
      height: 210px;
    }

    .list-title {
      width: 960px;
      margin: 10px auto;
      font-size: 24px;
      color: #1A1A19;
      padding: 60px 0 10px 0;
      border-bottom: 1px solid #ccc;
    }

    .list-content {
      width: 960px;
      margin: 0 auto;
      color: #3f4a58;
      .create {
        cursor: pointer;
        .icon {
          height: 207px;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-container {
            width: 100px;
          }
          .col, .row {
            width: 100px;
            height: 6px;
            background: $purple;
            position: absolute;
          }
          .col {
            transform: rotate(90deg);
          }
        }
        p {
          color: $purple;
          border: none;
        }
      }
      li {
        overflow: hidden;
        float: left;
        width: 220px;
        height: 285px;
        background: #fff;
        position: relative;
        margin: 10px;
      }
      img {
        width: 220px;
        height: 210px;
      }
      .cover {
        width: 220px;
        height: 210px;
      }
      .qart {
        position: absolute;
        transition: .5s;
        background: rgba(0, 0, 0, .5);
        opacity: 0;
        left: 0;
        top: 0;
        &:hover {
          opacity: 1;
        }
        z-index: 10;
        button {
          display: none;
        }
      }
      .info {
        text-align: center;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }
      .operate {
        overflow: hidden;
        a {
          line-height: 36px;
          text-align: center;
          box-sizing: border-box;
          float: left;
          width: 33%;
          color: $purple;
          flex: 1;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .status {
        width: 120px;
        height: 24px;
        background: #aaa;
        color: #fff;
        position: absolute;
        transform: rotate(45deg);
        text-align: center;
        font-size: 14px;
        line-height: 24px;
        right: -30px;
        top: 15px;
      }
      .complete {
        background: $purple;
      }
    }
  }
</style>
