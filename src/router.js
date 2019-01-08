import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component:resolve => require(['@/components/index.vue'],resolve)
      // component: () => import(/* webpackChunkName: "index" */ './components/index.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './components/login.vue')
    },
    {
      path: '/silkBag/:tipid',
      name: 'silkBag',
      component: () => import(/* webpackChunkName: "silkBag" */ './components/silkBag/silkBag.vue')
    },
    {
      path: '/twoLevel/:tipid',
      name: 'twoLevel',
      component: () => import(/* webpackChunkName: "twoLevel" */ './components/silkBag/twoLevel.vue')
    },
    {
      path: '/details/:tipid',
      name: 'details',
      component: () => import(/* webpackChunkName: "details" */ './components/silkBag/details.vue')
    },
    {
      path: '/sleceted',
      name: 'sleceted',
      component: () => import(/* webpackChunkName: "sleceted" */ './components/sleceted/sleceted.vue')
    },
    {
      path: '/slecetedDetails/:selectid',
      name: 'slecetedDetails',
      component: () => import(/* webpackChunkName: "slecetedDetails" */ './components/sleceted/details.vue')
    },
    {
      path: '/mapbox/:coordinateX/:coordinateY',
      name: 'mapbox',
      component: () => import(/* webpackChunkName: "mapbox" */ './components/common/mapbox.vue')
    },
  ]
})
router.beforeEach((to, from, next) => {
  const whiteList = ['/silkBag','/twoLevel','/details','/sleceted','/slecetedDetails','/mapbox'] // 路由白名单
  const token = sessionStorage.getItem('token')
  if (token) {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      if (to.path === '/') {
        next()
      } else {
        next('/')
      }
    }
  }
});
export default router
