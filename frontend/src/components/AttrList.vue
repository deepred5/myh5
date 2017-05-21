<template>
  <transition name="move">
    <div class="attr-list" @mouseup.stop>
      <div class="attr-list-title">
        <p>属性设置</p>
      </div>
      <p class="element-id">元素id: {{currentItemIndex}}</p>
      <div class="attr-type">
        <ul>
          <li :class="{active:isStyle}" @click="currentSet = 'style'">样式</li>
          <li :class="{active:!isStyle}" @click="currentSet = 'ani'">动画</li>
        </ul>
      </div>
      <div class="set-style" v-if="currentSet === 'style'">
        <div class="txt-attr" v-if="currentType === 'txt'">
          <p class="attr-title">文本样式</p>
          <div class="form-group set-color">
            <label>字体颜色</label>
            <input type="color" v-model="style.color" @input="setStyle('color')">
            <input type="text" v-model="style.color" @input="setStyle('color')">
          </div>
          <div class="form-group">
            <label>字体大小</label>
            <input type="range" min="14" max="50" v-model.number="style.fontSize" step="1"
                   @input="setStyle('fontSize')">
            <input type="number" v-model.number="style.fontSize" step="1" min="14" max="50"
                   @input="setStyle('fontSize')">
          </div>
          <div class="form-group">
            <label>透明度</label>
            <input type="range" min="0" max="1" step="0.1" v-model.number="style.opacity" @input="setStyle('opacity')">
            <input type="number" min="0" max="1" v-model.number="style.opacity" step="0.1" @input="setStyle('opacity')">
          </div>
          <div class="form-group set-txt-content">
            <label>文字内容</label>
            <input type="text" v-model="txtContent" @input="setTxtContent">
          </div>
        </div>
        <div class="pic-attr" v-else-if="currentType === 'pic'">
          <p class="attr-title">图片样式</p>
          <div class="form-group">
            <label>宽度</label>
            <input type="range" min="0" max="320" v-model.number="style.width" step="1" @input="setStyle('width')">
            <input type="number" min="0" max="320" v-model.number="style.width" step="1" @input="setStyle('width')">
          </div>
          <div class="form-group">
            <label>高度</label>
            <input type="range" min="0" max="486" v-model.number="style.height" step="1" @input="setStyle('height')">
            <input type="number" min="0" max="486" v-model.number="style.height" step="1" @input="setStyle('height')">
          </div>
          <div class="form-group">
            <label>透明度</label>
            <input type="range" min="0" max="1" step="0.1" v-model.number="style.opacity" @input="setStyle('opacity')">
            <input type="number" min="0" max="1" step="0.1" v-model.number="style.opacity" @input="setStyle('opacity')">
          </div>
        </div>
      </div>
      <div class="set-ani" v-else>
        <p class="attr-title">动画样式</p>
        <div class="form-group">
          <label>动画名称</label>
          <select v-model="animate.effect" @change="setAnimate('effect')">
            <optgroup label="无动画">
              <option value="">无效果</option>
            </optgroup>
            <optgroup label="Attention Seekers">
              <option value="bounce">bounce</option>
              <option value="flash">flash</option>
              <option value="pulse">pulse</option>
              <option value="rubberBand">rubberBand</option>
              <option value="shake">shake</option>
              <option value="swing">swing</option>
              <option value="tada">tada</option>
              <option value="wobble">wobble</option>
              <option value="fadeIn">fadeIn</option>
            </optgroup>
            <optgroup label="Bouncing Entrances">
              <option value="bounceIn">bounceIn</option>
              <option value="bounceInDown">bounceInDown</option>
              <option value="bounceInLeft">bounceInLeft</option>
              <option value="bounceInRight">bounceInRight</option>
              <option value="bounceInUp">bounceInUp</option>
            </optgroup>
            <optgroup label="Bouncing Exits">
              <option value="bounceOut">bounceOut</option>
              <option value="bounceOutDown">bounceOutDown</option>
              <option value="bounceOutLeft">bounceOutLeft</option>
              <option value="bounceOutRight">bounceOutRight</option>
              <option value="bounceOutUp">bounceOutUp</option>
            </optgroup>

            <optgroup label="Fading Entrances">
              <option value="fadeIn">fadeIn</option>
              <option value="fadeInDown">fadeInDown</option>
              <option value="fadeInDownBig">fadeInDownBig</option>
              <option value="fadeInLeft">fadeInLeft</option>
              <option value="fadeInLeftBig">fadeInLeftBig</option>
              <option value="fadeInRight">fadeInRight</option>
              <option value="fadeInRightBig">fadeInRightBig</option>
              <option value="fadeInUp">fadeInUp</option>
              <option value="fadeInUpBig">fadeInUpBig</option>
            </optgroup>

            <optgroup label="Fading Exits">
              <option value="fadeOut">fadeOut</option>
              <option value="fadeOutDown">fadeOutDown</option>
              <option value="fadeOutDownBig">fadeOutDownBig</option>
              <option value="fadeOutLeft">fadeOutLeft</option>
              <option value="fadeOutLeftBig">fadeOutLeftBig</option>
              <option value="fadeOutRight">fadeOutRight</option>
              <option value="fadeOutRightBig">fadeOutRightBig</option>
              <option value="fadeOutUp">fadeOutUp</option>
              <option value="fadeOutUpBig">fadeOutUpBig</option>
            </optgroup>

            <optgroup label="Flippers">
              <option value="flip">flip</option>
              <option value="flipInX">flipInX</option>
              <option value="flipInY">flipInY</option>
              <option value="flipOutX">flipOutX</option>
              <option value="flipOutY">flipOutY</option>
            </optgroup>

            <optgroup label="Lightspeed">
              <option value="lightSpeedIn">lightSpeedIn</option>
              <option value="lightSpeedOut">lightSpeedOut</option>
            </optgroup>

            <optgroup label="Rotating Entrances">
              <option value="rotateIn">rotateIn</option>
              <option value="rotateInDownLeft">rotateInDownLeft</option>
              <option value="rotateInDownRight">rotateInDownRight</option>
              <option value="rotateInUpLeft">rotateInUpLeft</option>
              <option value="rotateInUpRight">rotateInUpRight</option>
            </optgroup>

            <optgroup label="Rotating Exits">
              <option value="rotateOut">rotateOut</option>
              <option value="rotateOutDownLeft">rotateOutDownLeft</option>
              <option value="rotateOutDownRight">rotateOutDownRight</option>
              <option value="rotateOutUpLeft">rotateOutUpLeft</option>
              <option value="rotateOutUpRight">rotateOutUpRight</option>
            </optgroup>

            <optgroup label="Sliding Entrances">
              <option value="slideInUp">slideInUp</option>
              <option value="slideInDown">slideInDown</option>
              <option value="slideInLeft">slideInLeft</option>
              <option value="slideInRight">slideInRight</option>

            </optgroup>
            <optgroup label="Sliding Exits">
              <option value="slideOutUp">slideOutUp</option>
              <option value="slideOutDown">slideOutDown</option>
              <option value="slideOutLeft">slideOutLeft</option>
              <option value="slideOutRight">slideOutRight</option>

            </optgroup>

            <optgroup label="Zoom Entrances">
              <option value="zoomIn">zoomIn</option>
              <option value="zoomInDown">zoomInDown</option>
              <option value="zoomInLeft">zoomInLeft</option>
              <option value="zoomInRight">zoomInRight</option>
              <option value="zoomInUp">zoomInUp</option>
            </optgroup>

            <optgroup label="Zoom Exits">
              <option value="zoomOut">zoomOut</option>
              <option value="zoomOutDown">zoomOutDown</option>
              <option value="zoomOutLeft">zoomOutLeft</option>
              <option value="zoomOutRight">zoomOutRight</option>
              <option value="zoomOutUp">zoomOutUp</option>
            </optgroup>

            <optgroup label="Specials">
              <option value="hinge">hinge</option>
              <option value="rollIn">rollIn</option>
              <option value="rollOut">rollOut</option>
            </optgroup>
          </select>
        </div>
        <div class="form-group">
          <label>动画时长</label>
          <input type="range" min="0" max="10" v-model.number="animate.duration" step="0.1"
                 @change="setAnimate('duration')">
          <input type="number" min="0" max="10" v-model.number="animate.duration" step="0.1"
                 @input="setAnimate('duration')">
        </div>
        <div class="form-group">
          <label>动画延迟</label>
          <input type="range" min="0" max="50" v-model.number="animate.delay" step="0.1" @change="setAnimate('delay')">
          <input type="number" min="0" max="50" v-model.number="animate.delay" step="0.1" @input="setAnimate('delay')">
        </div>
        <div class="form-group">
          <label>动画次数</label>
          <input type="range" min="0" max="100" v-model.number="animate.count" step="1" @change="setAnimate('count')"
                 :disabled="isInfinite">
          <input type="number" min="0" max="100" step="1" v-model.number="animate.count" :disabled="isInfinite"
                 @input="setAnimate('count')">
          <input type="checkbox" v-model="isInfinite">
          <span>循环</span>
        </div>
        <div class="preview">
          <span @click="previewCurrentItemAni">预览动画</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        style: {
          width: '',
          height: '',
          opacity: 1,
          fontSize: 16,
          color: '#000'
        },
        txtContent: '',
        currentSet: 'style',
        animate: {
          effect: '',
          duration: 1,
          delay: 0,
          count: 1
        },
        isInfinite: false
      }
    },
    computed: {
      isStyle() {
        return this.currentSet === 'style';
      },
      currentItemIndex() {
        return this.$store.state.currentItemIndex;
      },
      currentPage() {
        return this.$store.state.currentPage;
      },
      currentType() {
        return this.$store.getters.currentType;
      },
      currentItem() {
        return this.$store.getters.currentItem;
      }
    },
    watch: {
      isInfinite(val) {
        this.animate.count = val ? 'infinite' : 1;
        this.setAnimate('count');
      },
      currentItem(val) {
        if (val) {
          this.animate = val.animate;
          this.style = val.style;
          this.txtContent = val.content;
          this.isInfinite = this.animate.count === 'infinite';
        }
      }
    },
    methods: {
      setStyle(type) {
        var payload = {[type]: this.style[type]};
        console.log(payload);
        this.$store.dispatch('setCurrentItemStyle', payload);
      },
      setTxtContent() {
        this.$store.dispatch('setTxtContent', this.txtContent);
      },
      setAnimate(type) {
        var payload = {[type]: this.animate[type]};
        console.log(payload);
        this.$store.dispatch('setCurrentItemAnimate', payload);
      },
      previewCurrentItemAni() {
        this.$store.dispatch('previewCurrentItemAni');
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  $purple: #ada0e6;
  .attr-list {
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 280px;
    box-sizing: border-box;
    position: fixed;
    right: 0;
    top: 60px;
    bottom: 0;
    text-align: center;
    transition: .4s;
    .element-id {
      padding: 5px 0 0;
    }
    .form-group {
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
    label {
      display: inline-block;
      font-size: 14px;
      vertical-align: middle;
      width: 80px;
    }
    input {
      vertical-align: middle;
      margin: 0;
    }
    input[type="range"] {
      width: 100px;
      margin-right: 20px;
    }
    input[type="number"] {
      width: 50px;
    }
    input[type="color"] {
      width: 70px;
      height: 28px;
      padding: 0;
      background: transparent;
      border: none;
    }
    .attr-list-title {
      height: 36px;
      background: $purple;
      color: #fff;
      line-height: 36px;
    }
    .attr-type {
      ul {
        display: flex;
        padding: 10px 5px;
      }
      li {
        flex: 1;
        height: 38px;
        line-height: 38px;
        background: #f0f3f4;
        margin-right: 5px;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
      }
      li:last-child {
        margin-right: 0;
      }
      .active {
        background: $purple;
        color: #fff;
      }
    }
    .attr-title {
      background: #f0f3f4;
      padding: 10px;
    }
    .txt-attr {
      text-align: left;
      .set-color {
        input[type="text"] {
          width: 80px;
          margin-left: 20px;
        }
      }
      .set-txt-content {
        input {
          width: 174px;
        }
      }
    }
    .pic-attr {
      text-align: left;
    }
    .set-ani {
      font-size: 14px;
      text-align: left;
      select {
        width: 174px;
      }
      span {
        vertical-align: middle;
      }
    }
    .preview {
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      padding: 10px;
      span {
        transition: .5s;
        display: inline-block;
        padding: 10px;
        background: $purple;
        color: #fff;
        border-radius: 5px;
        &:hover {
          background: #8b8fbf;
        }
      }
    }
  }

  .move-enter, .move-leave-active {
    transform: translate3d(280px, 0, 0);
  }

</style>
