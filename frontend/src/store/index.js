import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPage: 0,
    mainCode: {
      pages: []
    },
    currentItemIndex: -1,
    showAttrlist: false,
    showPicLib: false,
    showMusicLib: false,
    showConfig: false,
    isSetBackground: false,
    title: '',
    thumbnail: '',
    showLoading: false,
    messageConfig: {
      content: '',
      type: '',
      show: false
    }
  },
  getters: {
    currentPageCode(state) {
      if (state.mainCode.pages.length) {
        return state.mainCode.pages[state.currentPage];
      }
      return {
        items: [],
        pageMainAttr: {
          background: ''
        }
      };
    },
    currentType(state, getters) {
      if (state.currentItemIndex > -1) {
        return getters.currentPageCode.items[state.currentItemIndex] ? getters.currentPageCode.items[state.currentItemIndex].type : '';
      }
      return '';
    },
    currentItem(state, getters) {
      if (state.currentItemIndex > -1) {
        return getters.currentPageCode.items[state.currentItemIndex];
      }
      return {
        type: '',
        animate: {},
        style: {}
      };
    },
    /*currentPageContent1(state, getters) {
     var html = '';
     console.log(getters.currentPageCode.items);
     getters.currentPageCode.items.forEach((item, index) => {
     if (item.type === 'pic') {
     html += `<div style="position:${item.style.position};left:${item.style.left + '%'};top:${item.style.top + '%'};width:${item.style.width + 'px'};height:${item.style.height + 'px'};opacity:${item.style.opacity}" class="content" data-index="${index}">
     <img src="${item.src}" class="ani" width="100%" height="100%" swiper-animate-effect="${item.animate.effect}" swiper-animate-duration="${item.animate.duration + 's'}" swiper-animate-delay="${item.animate.delay + 's'}" style="animation-iteration-count:${item.animate.count};">
     </div>`;
     } else if (item.type === 'txt') {
     html += `<div style="position:absolute;left:${item.style.left + '%'};top:${item.style.top + '%'};font-size:${item.style.fontSize + 'px'};min-width: 100px;color:${item.style.color};opacity:${item.style.opacity}" class="content" data-index="${index}">
     <div class="ani" swiper-animate-effect="${item.animate.effect}"  swiper-animate-duration="${item.animate.duration + 's'}" swiper-animate-delay="${item.animate.delay + 's'}" style="animation-iteration-count:${item.animate.count};">${item.content}</div>
     </div>`;
     }
     });
     return html;
     },
     currentPageContent2(state, getters) {
     var html = '';
     getters.currentPageCode.items.forEach((item, index) => {
     if (item.type === 'pic') {
     html += `<div style="position:${item.style.position};left:${item.style.left + '%'};top:${item.style.top + '%'};width:${item.style.width + 'px'};height:${item.style.height + 'px'};opacity:${item.style.opacity}" class="content" data-index="${index}">
     <img src="${item.src}" class="animated" width="100%" height="100%" style="animation:${item.animate.effect} ${item.animate.duration + 's'} ${item.animate.delay + 's'} ${item.animate.count}">
     </div>`;
     } else if (item.type === 'txt') {
     html += `<div style="position:absolute;left:${item.style.left + '%'};top:${item.style.top + '%'};font-size:${item.style.fontSize + 'px'};min-width: 100px;color:${item.style.color};opacity:${item.style.opacity}" class="content" data-index="${index}">
     <div class="animated" style="animation:${item.animate.effect} ${item.animate.duration + 's'} ${item.animate.delay + 's'} ${item.animate.count}">${item.content}</div>
     </div>`;
     }
     });
     return html;
     }*/
  },
  mutations,
  actions
});
