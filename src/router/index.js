/*
 * @Date         : 2020-04-30 10:23:16
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-30 17:02:47
 * @FilePath     : \kaoshi\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/car',
        name: 'Car',
        component: () => import(/* webpackChunkName: "about" */ '../views/Car.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
