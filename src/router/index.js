import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Check from '@/components/Check.vue';
import CreateAndUpdate from '@/components/CreateAndUpdate.vue';
// import Detail from '@/components/Detail.vue';
import Search from '@/components/Search.vue';

import Member from '@/views/Member.vue';
import MemberList from '@/components/member/MemberList.vue';

import Employee from '@/views/Employee.vue';
import Coach from '@/views/Coach.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/member',
    // name: 'member',
    component: Member,
    children: [
      {
        path: '',
        name: '會員列表',
        component: MemberList,
      },
      {
        path: ':id',
        name: '更新',
        // meta: { typeLabel: '更新' },
        component: CreateAndUpdate,
      },
    ],
  },
  {
    path: '/employee',
    // name: '員工',
    component: Employee,
    children: [
      {
        path: '',
        name: '員工列表',
        component: MemberList,
      },
    ],
  },
  {
    path: '/coach',
    // name: '場租教練',
    component: Coach,
    children: [
      {
        path: '',
        name: '教練列表',
        component: MemberList,
      },
      // {
      //   path: 'create',
      //   name: '建立場租教練',
      //   component: Member,
      // },
    ],
  },
  {
    path: '/checkin',
    name: '入場',
    meta: { type: 'checkin' },
    component: Check,
  },
  {
    path: '/checkout',
    name: '離場',
    meta: { type: 'checkout' },
    component: Check,
  },
  {
    path: '/consume',
    name: '消費',
    component: Check,
  },
  {
    path: '/search',
    name: '查詢',
    component: Search,
  },
  {
    path: '/create',
    name: '加入',
    component: CreateAndUpdate,
  },
  {
    path: '/record',
    name: '紀錄',
    component: Check,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
