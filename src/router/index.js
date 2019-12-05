import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Checkin from '@/components/Checkin.vue';

import Member from '@/views/Member.vue';
// import MemberCheckin from '@/components/member/MemberCheckin.vue';
import MemberList from '@/components/member/MemberList.vue';
import MemberCreate from '@/components/member/MemberCreate.vue';

import Employee from '@/views/Employee.vue';
import EmployeeCreate from '@/components/employee/EmployeeCreate.vue';
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
      // {
      //   path: ':id',
      //   name: 'member_info',
      //   component: Member,
      // },
      {
        path: 'create',
        name: '建立會員',
        component: MemberCreate,
      },
      {
        path: 'checkin',
        name: '搜尋會員',
        meta: { type: 'member', typeLabel: '會員' },
        component: Checkin,
      },
      // {
      //   path: 'checkin/:phone',
      //   name: '會員進場',
      //   meta: { type: 'member', typeLabel: '會員' },
      //   component: MemberCheckin,
      // },
    ],
  },
  {
    path: '/employee',
    name: '員工',
    component: Employee,
    children: [
      // {
      //   path: ':id',
      //   name: 'employee_info',
      //   component: Member,
      // },
      {
        path: 'create',
        name: '建立員工',
        component: EmployeeCreate,
      },
      // {
      //   path: 'checkin',
      //   name: '員工打卡',
      //   meta: { type: 'employee', typeLabel: '員工' },
      //   component: Checkin,
      // },
    ],
  },
  {
    path: '/coach',
    name: '場租教練',
    component: Coach,
    children: [
      // {
      //   path: '/:id',
      //   name: 'employee_info',
      //   component: Member,
      // },
      {
        path: 'create',
        name: '建立場租教練',
        component: Member,
      },
      // {
      //   path: 'checkin',
      //   name: '場租教練進場',
      //   meta: { type: 'coach', typeLabel: '場租教練' },
      //   component: Checkin,
      // },
    ],
  },
  {
    path: '/checkin',
    name: '進場',
    component: Checkin,
  },
  {
    path: '/checkout',
    name: '離場',
    component: Checkin,
  },
  {
    path: '/consume',
    name: '消費',
    component: Checkin,
  },
  {
    path: '/search',
    name: '查詢',
    component: Checkin,
  },
  {
    path: '/create',
    name: '加入',
    component: Checkin,
  },
  {
    path: '/record',
    name: '紀錄',
    component: Checkin,
  },
  // {
  //   path: '/create',
  //   name: '建立',
  //   component: Member,
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
