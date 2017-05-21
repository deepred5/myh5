// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex';
import store from './store';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Vuex);

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    axios.post('/apis/user/auth').then(res => {
      if (res.data.code === 0) {
        return next({path: '/list'});
      }
    })
  } else {
    axios.post('/apis/user/auth').then(res => {
      if (res.data.code === 1) {
        return next({path: '/'});
      }
    }).catch(err => {
      return next({path: '/'});
    });
  }
  next();
});

// ajax拦截器
// 请求前显示loading,响应后隐藏loading


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.dispatch('setLoading', true);
  return config;
}, function (error) {
  // Do something with request error
  store.dispatch('setLoading', false);
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  store.dispatch('setLoading', false);
  return response;
}, function (error) {
  // Do something with response error
  store.dispatch('setLoading', false);
  return Promise.reject(error);
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}

});
