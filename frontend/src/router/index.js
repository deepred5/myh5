import Vue from 'vue';
import Router from 'vue-router';
import Home from 'pages/home';
import List from 'pages/list';
import Edit from 'pages/edit';
import User from 'pages/User';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
    /*{ // todo 用户中心 管理图片 管理音乐 管理个人信息
      path: '/user/',
      name: 'user',
      component: User
    }*/
  ]
})
