/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-11 15:58:48
 * @FilePath     : \kaoshi\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Center from '../views/Center.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 个人中心
    path: '/',
    name: 'Center',
    component: Center
  },
  {
    // 我的科目
    path: '/subject',
    name: 'Subject',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Subject.vue'),
    children: [
      {
        path: '/about/car',
        name: 'Car',
        component: () => import(/* webpackChunkName: "about" */ '../views/Car.vue')
      }
    ]
  },
  {
    // 确认科目
    path: '/suresubject',
    name: 'SureSubject',
    component: () => import('../views/SureSubject.vue')
  },
  {
    // 充值次数
    path: '/charge',
    name: 'Charge',
    component: () => import('../views/Charge.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
