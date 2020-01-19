import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	children:[{
		path:"/",
		name:"首页",
		component:()=>import('../views/Home.vue')
	}]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 判断当前路由以及路由的父路由中是否包含meta，meta里是否有requiredAuth
  // to.matched中包含当前路由以及父路由
  // 如果判断出to.matched中某个路由里有meta.requiredAuth
  if (to.matched.some(route => route.meta.requiredAuth)) {
    // 判断是否已经登录
    // if (false) {
    //   next()  
    // } else {
      // 那就跳转到登录 并且添加query参数returnurl为to.path
      next({
        path: '/login',
        query: {
          returnurl: to.path // 从哪来回哪去
        }
      })
	  // console.log(to.path)
    // }
  } else {
    next()
  }
})

export default router
