import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Member from '../views/Member.vue';

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
    name: 'member',
    component: Member,
    meta: { layout: 'abc' },
    children: [
      {
        path: '/:id',
        name: 'member_info',
        component: Member,
      },
      {
        path: '/create',
        name: 'member_create',
        component: Member,
      },
      {
        path: '/checkin',
        name: 'member_checkin',
        component: Member,
      },
    ],
  },
  {
    path: '/employee',
    name: 'employee',
    component: Member,
    children: [
      {
        path: '/:id',
        name: 'employee_info',
        component: Member,
      },
      {
        path: '/create',
        name: 'employee_create',
        component: Member,
      },
      {
        path: '/checkin',
        name: 'employee_checkin',
        component: Member,
      },
    ],
  },
  {
    path: '/coach',
    name: 'coach',
    component: Member,
    children: [
      // {
      //   path: '/:id',
      //   name: 'employee_info',
      //   component: Member,
      // },
      {
        path: '/create',
        name: 'coach_create',
        component: Member,
      },
      {
        path: '/checkin',
        name: 'coach_checkin',
        component: Member,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
