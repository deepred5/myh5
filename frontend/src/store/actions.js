import mockData from './mockdata';
import axios from 'axios';

var actions = {
  addTxtItem({commit}) {
    commit('addTxtItem');
  },
  addBackgroundPic({commit}, payload) {
    commit('addBackgroundPic', payload);
  },
  changeCurrentPage({commit}, payload) {
    commit('changeCurrentPage', payload);
  },
  initData({commit}, payload) {
    console.log('当前id', payload);
    axios.get('/apis/work/info', {
      params: {
        id: payload
      }
    }).then(res => {
      if (res.data.code === 0) {
        var work = res.data.work;
        console.log('获取当前作品信息成功', res.data);
        commit('initData', work)
      }
    });

    /*setTimeout(function () {
     commit('initData', mockData)
     }, 1000);*/
  },
  changeCurrentItemIndex({commit}, payload) {
    commit('changeCurrentItemIndex', payload);
  },
  changeCurrentItemPostion({commit}, payload) {
    commit('changeCurrentItemPostion', payload);
  },
  changeIsSetBackground({commit}, payload) {
    commit('changeIsSetBackground', payload);
  },
  deleteCurrentItem({commit}) {
    commit('deleteCurrentItem');
  },
  deleteCurrentPage({commit}, payload) {
    commit('changeCurrentPage', 0);
    commit('deleteCurrentPage', payload);
  },
  addPage({commit}) {
    commit('addPage');
  },
  addPicItem({commit}, payload) {
    commit('addPicItem', payload);
  },
  setCurrentItemStyle({commit}, payload) {
    commit('setCurrentItemStyle', payload);
  },
  setCurrentItemAnimate({commit, state}, payload) {
    var preEffect = state.mainCode.pages[state.currentPage].items[state.currentItemIndex].animate.effect;
    if (!('effect' in payload)) {
      commit('setCurrentItemAnimate', {effect: ''});
      clearTimeout(window.animateTimer);
      window.animateTimer = setTimeout(function () {
        commit('setCurrentItemAnimate', payload);
        commit('setCurrentItemAnimate', {effect: preEffect});
      }, 50);
    } else {
      commit('setCurrentItemAnimate', payload);
    }
  },
  PreCurrentPage({commit, state}) {
    var PreCurrentItems = state.mainCode.pages[state.currentPage].items.slice();
    commit('setCurrentItems', []);
    setTimeout(function () {
      commit('setCurrentItems', PreCurrentItems);
    }, 50);
  },
  previewCurrentItemAni({dispatch, state}) {
    dispatch('setCurrentItemAnimate', {duration: state.mainCode.pages[state.currentPage].items[state.currentItemIndex].animate.duration})
  },
  setTxtContent({commit}, payload) {
    commit('setTxtContent', payload);
  },
  setShowAttrlist({commit}, payload) {
    commit('setShowAttrlist', payload);
  },
  setShowPicLib({commit}, payload) {
    commit('setShowPicLib', payload);
  },
  setShowMusicLib({commit}, payload) {
    commit('setShowMusicLib', payload);
  },
  setBackgroundMusic({commit}, payload) {
    commit('setBackgroundMusic', payload);
  },
  setLoading({commit}, payload) {
    commit('setLoading', payload);
  },
  setThumbnail({commit}, payload) {
    commit('setThumbnail', payload);
  },
  setTitle({commit}, payload) {
    commit('setTitle', payload);
  },
  setConfig({commit}, payload) {
    commit('setConfig', payload);
  },
  openMessage({commit, dispatch}, payload) {
    payload.show = true;
    commit('setMessageConfig', payload);
    clearTimeout(window.messageTimer);
    window.messageTimer = setTimeout(function () {
      dispatch('closeMessage');
    }, 1500);
  },
  closeMessage({commit}) {
    commit('setMessageConfig', {
      show: false,
      type: '',
      content: ''
    });
  }
};

export default actions;
