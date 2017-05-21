<template>
  <div class="myphone">
    <div class="phone">
      <div class="phone-title">{{title}}</div>
      <div class="phone-content" v-drag @mouseup="changeCurrentItem"
           :style="{background: `url(${currentPageCode ? currentPageCode.pageMainAttr.background : ''}) #fff repeat center center`}"
           @contextmenu.prevent="handleContextmenu" @click="contextMenuStyle.display = 'none'">
        <div class="grid"></div>
        <!--<div v-html="currentPageContent2"></div>-->
        <template v-for="(item, index) in currentItems">
          <div v-if="item.type === 'pic'" :style="item.style | filterStyle" class="content" :data-index="index">
            <img :src="item.src" class="animated" width="100%" height="100%"
                 :style="item.animate | filterAni">
          </div>
          <div v-else-if="item.type === 'txt'" class="content" :data-index="index" :style="item.style | filterStyle2">
            <div class="animated" :style="item.animate | filterAni">
              {{item.content}}
            </div>
          </div>
        </template>
      </div>
      <div class="toolbar">
        <ul>
          <li title="预览当前页" @mouseup="PreCurrentPage"></li>
        </ul>
      </div>
    </div>
    <div class="contextmenu" :style="contextMenuStyle" @click="deleteCurrentItem">
      <p>删除</p>
    </div>
  </div>
</template>

<script>
  import 'css/animate.min.css';

  export default {
    data() {
      return {
        contextMenuStyle: {
          display: 'none',
          left: 0,
          top: 0
        }
      }
    },
    filters: {
      filterAni(value) {
        return {
          animation: `${value.effect} ${value.duration + 's'} ${value.delay + 's'} ${value.count}`
        }
      },
      filterStyle(value) {
        // 图片样式
        return {
          position: 'absolute',
          left: value.left + '%',
          top: value.top + '%',
          width: value.width + 'px',
          height: value.height ? value.height + 'px' : 'auto',
          opacity: value.opacity
        }
      },
      filterStyle2(value) {
        // 文字样式
        return {
          position: 'absolute',
          left: value.left + '%',
          top: value.top + '%',
          color: value.color,
          opacity: value.opacity,
          fontSize: value.fontSize + 'px',
          minWidth: '100px'
        }
      }
    },
    computed: {
      currentPage() {
        return this.$store.state.currentPage
      },
      currentPageCode() {
        return this.$store.getters.currentPageCode
      },
      currentItems() {
        return this.$store.getters.currentPageCode.items
      },
      title() {
        return this.$store.state.title
      }
    },
    methods: {
      changeCurrentItem(e) {
        var $parent = $(e.target).parent('.content');

        var index = $parent.data('index') >= 0 ? $parent.data('index') : -1;

        var leftPer = parseFloat($parent.css('left')) / 320 * 100;
        var topPer = parseFloat($parent.css('top')) / 486 * 100;

        if (index > -1) {
          this.$store.dispatch('changeCurrentItemIndex', index);
          this.$store.dispatch('changeCurrentItemPostion', {
            left: leftPer,
            top: topPer
          });
        }
      },
      handleContextmenu(ev) {

        var offset = $(ev.target).parents('.myphone').offset();

        var left = ev.pageX + 10 - offset.left;
        var top = ev.pageY + 10 - offset.top;


        if ($(ev.target).hasClass('animated')) {
          var index = $(ev.target).parent('.content').data('index');
          this.$store.dispatch('changeCurrentItemIndex', index);
          this.contextMenuStyle = {
            display: 'block',
            left: left + 'px',
            top: top + 'px'
          }
        }
      },
      deleteCurrentItem() {
        this.$store.dispatch('deleteCurrentItem');
        this.contextMenuStyle.display = 'none';
      },
      PreCurrentPage() {
        this.$store.dispatch('PreCurrentPage');
      }
    },
    directives: {
      drag: {
        inserted: function (el) {
          // inserted生命周期才能获取el的宽和高
          var containerWidth = parseFloat($(el).css('width'));
          var containerHeight = parseFloat($(el).css('height'));
          $(el).on('mousedown', '.content', function (ev) {
            var disX = ev.pageX - $(this).position().left;
            var disY = ev.pageY - $(this).position().top;

            var $that = $(this);

            $(document).on('mousemove', function (ev) {
              var l = (ev.pageX - disX);
              var t = (ev.pageY - disY);

              // 磁性吸附 + 限制拖拽范围
              /*if (l < 10) {
               l = 0;
               } else if (l > containerWidth - $that.innerWidth() - 10) {
               l = containerWidth - $that.innerWidth();
               }

               if (t < 10) {
               t = 0;
               } else if (t > containerHeight - $that.innerHeight() - 10) {
               t = containerHeight - $that.innerHeight();
               }*/

              $that.css({
                left: l / containerWidth * 100 + '%',
                top: t / containerHeight * 100 + '%'
              });
            });

            $(document).on('mouseup', function () {
              $(document).off('mousemove');
              $(document).off('mouseup');
            });

            // return false阻止浏览器拖拽图片的默认行为
            return false;
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .myphone {
    position: relative;
    width: 326px;
    height: 620px;
    margin: 70px auto 0;
  }

  .phone {
    width: 326px;
    height: 620px;
    background: url("~img/phone.svg") no-repeat;
    margin: 70px auto 0;
    position: relative;
    .phone-title {
      position: absolute;
      top: 65px;
      color: #fff;
      width: 100%;
      text-align: center;
    }
    .phone-content {
      width: 320px;
      height: 486px;
      background: #fff;
      position: absolute;
      top: 97px;
      left: 3px;
    }
    .grid {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: url("~img/grid_bg.png") no-repeat;
    }
    .content {
      cursor: pointer;
    }
    .toolbar {
      position: absolute;
      right: -40px;
      top: 80px;
      li {
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-image: url("~img/icon.png");
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
      }
      li:nth-child(1) {
        background-position: -90px -270px;
      }
    }
  }

  .contextmenu {
    cursor: pointer;
    position: absolute;
    width: 120px;
    line-height: 36px;
    background: #fff;
    text-align: center;
    color: #ada0e6;
    border: 1px solid #ddd;
    box-shadow: 0 0 4px rgba(0, 0, 0, .4);
  }
</style>
