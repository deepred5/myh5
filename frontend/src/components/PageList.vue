<template>
  <div class="page-list">
    <div class="page-list-title">
      <p>页面列表</p>
    </div>
    <ul>
      <li v-for="(page, index) in pages" :class="{active: index === currentPage}" @click="changeCurrentPage(index)">
        <span>第{{index + 1}}页</span>
        <span class="delete" @click.stop="deleteCurrentPage(index)" v-show="index === currentPage">X</span>
      </li>
    </ul>
    <div class="add-page" @click="addPage">
      <p>+ 添加新页</p>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      pages() {
        return this.$store.state.mainCode.pages
      },
      currentPage() {
        return this.$store.state.currentPage
      }
    },
    methods: {
      changeCurrentPage(num) {
        this.$store.dispatch('changeCurrentPage', num);
      },
      deleteCurrentPage(index) {
        if (this.pages.length === 1) {
          this.$store.dispatch('openMessage', {
            type: 'error',
            content: '至少保留一页'
          });
          return;
        }
        this.$store.dispatch('deleteCurrentPage', index);
      },
      addPage() {
        this.$store.dispatch('addPage');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  $purple: #ada0e6;
  .page-list {
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 280px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    text-align: center;
    .page-list-title {
      height: 40px;
      background: $purple;
      color: #fff;
      line-height: 40px;
    }
    ul {
      overflow: auto;
      padding: 0 20px;
      flex: 1;
    }
    li {
      position: relative;
      height: 36px;
      line-height: 36px;
      background: #dcdcdc;
      margin-top: 10px;
      border-radius: 5px;
      color: #666;
      cursor: pointer;
    }
    li:last-child {
      margin-bottom: 10px;
    }
    .active {
      background: $purple;
      color: #fff;
    }
    .delete {
      cursor: pointer;
      position: absolute;
      right: 10px;
      &:hover {
        color: #ff7e7e;
      }
    }
    .add-page {
      cursor: pointer;
      height: 40px;
      background: #3f4a58;
      line-height: 40px;
      color: #fff;
    }
  }
</style>
