<template>
  <div class="edit" @mouseup="setShowAttrlist">
    <my-header>
      <add-content></add-content>
    </my-header>
    <page-list></page-list>
    <attr-list v-show="showAttrlist"></attr-list>
    <phone></phone>
    <config v-show="showConfig"></config>
    <modal v-model="showPicLib" title="图片库" :pic-lib="true" :mystyle="picLibStyle">
      <pic-lib v-model="showPicLib"></pic-lib>
    </modal>
    <modal v-model="showMusicLib" title="音乐库" :music-lib="true">
      <music-lib v-model="showMusicLib"></music-lib>
    </modal>
  </div>
</template>

<script>
  import myHeader from 'components/Header';
  import addContent from 'components/AddContent';
  import pageList from 'components/PageList';
  import phone from 'components/Phone';
  import attrList from 'components/AttrList';
  import Modal from 'components/Modal';
  import PicLib from 'components/PicLib';
  import MusicLib from 'components/MusicLib';
  import Config from 'components/Config';


  export default {
    data() {
      return {
        picLibStyle: {
          width: '550px'
        }
      }
    },
    components: {
      myHeader,
      addContent,
      pageList,
      phone,
      attrList,
      Modal,
      PicLib,
      MusicLib,
      Config
    },
    created() {
      this.$store.dispatch('initData', this.$route.params.id)
    },
    methods: {
      setShowAttrlist(e) {
        var isShow = $(e.target).parent().hasClass('content');
        this.$store.dispatch('setShowAttrlist', isShow);
      }
    },
    computed: {
      showAttrlist() {
        return this.$store.state.showAttrlist;
      },
      showPicLib() {
        return this.$store.state.showPicLib;
      },
      showMusicLib() {
        return this.$store.state.showMusicLib;
      },
      showConfig() {
        return this.$store.state.showConfig;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .edit {
    overflow: hidden;
  }
</style>
