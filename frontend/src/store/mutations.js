import Vue from 'vue';

var mutations = {
  addTxtItem(state, payload) {
    state.mainCode.pages[state.currentPage].items.push({
      type: 'txt',
      style: {
        position: 'absolute',
        left: Math.random() * 80,
        top: Math.random() * 80,
        width: '',
        height: '',
        opacity: 1,
        fontSize: 16,
        color: '#000000'
      },
      animate: {
        effect: '',
        duration: 1,
        delay: 0,
        count: 1
      },
      content: `文字`,
      src: ''
    });
  },
  addPicItem(state, payload) {
    var data = {
      type: 'pic',
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 250,
        height: 150,
        opacity: 1,
        fontSize: 16,
        color: '#000000'
      },
      animate: {
        effect: '',
        duration: 1,
        delay: 0,
        count: 1
      },
      content: '',
      src: ''
    };
    data.src = payload;

    state.mainCode.pages[state.currentPage].items.push(data);
  },
  addPage(state) {
    state.mainCode.pages.push({
      items: [],
      pageMainAttr: {
        background: ''
      }
    });
  },
  addBackgroundPic(state, payload) {
    state.mainCode.pages[state.currentPage].pageMainAttr.background = payload;
  },
  changeCurrentPage(state, payload) {
    state.currentPage = payload;
  },
  initData(state, payload) {
    state.mainCode = payload.mainCode;
    state.title = payload.title;
    state.thumbnail = payload.thumbnail;
    Object.assign(state, {
      currentPage: 0,
      currentItemIndex: -1,
      showAttrlist: false,
      showPicLib: false,
      showMusicLib: false,
      showConfig: false,
      isSetBackground: false,
      showLoading: false,
      messageConfig: {
        content: '',
        type: '',
        show: false
      }
    });
  },
  changeCurrentItemIndex(state, payload) {
    state.currentItemIndex = payload;
  },
  changeCurrentItemPostion(state, payload) {
    state.mainCode.pages[state.currentPage].items[state.currentItemIndex].style.left = payload.left;
    state.mainCode.pages[state.currentPage].items[state.currentItemIndex].style.top = payload.top;
  },
  changeIsSetBackground(state, payload) {
    state.isSetBackground = payload;
  },
  deleteCurrentItem(state) {
    state.mainCode.pages[state.currentPage].items.splice(state.currentItemIndex, 1);
  },
  deleteCurrentPage(state, payload) {
    state.mainCode.pages.splice(payload, 1);
  },
  setCurrentItemStyle(state, payload) {
    Object.assign(state.mainCode.pages[state.currentPage].items[state.currentItemIndex].style, payload);
  },
  setTxtContent(state, payload) {
    state.mainCode.pages[state.currentPage].items[state.currentItemIndex].content = payload;
  },
  setCurrentItemAnimate(state, payload) {
    Object.assign(state.mainCode.pages[state.currentPage].items[state.currentItemIndex].animate, payload);
  },
  setShowAttrlist(state, payload) {
    state.showAttrlist = payload;
  },
  setCurrentItems(state, payload) {
    state.mainCode.pages[state.currentPage].items = payload;
  },
  setShowPicLib(state, payload) {
    state.showPicLib = payload;
  },
  setShowMusicLib(state, payload) {
    state.showMusicLib = payload;
  },
  setBackgroundMusic(state, payload) {
    state.mainCode.wholeAttr.bgmusic = payload;
  },
  setLoading(state, payload) {
    state.showLoading = payload;
  },
  setMessageConfig(state, payload) {
    Object.assign(state.messageConfig, payload);
  },
  setThumbnail(state, payload) {
    state.thumbnail = payload;
  },
  setTitle(state, payload) {
    state.title = payload;
  },
  setConfig(state, payload) {
    state.showConfig = payload;
  }
};

export default mutations;
