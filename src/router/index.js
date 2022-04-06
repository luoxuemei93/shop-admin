import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const Welcome = () => import('../views/Welcome.vue')
const User = () => import('../views/user/Users.vue')
const Rights = () => import('../views/power/Rights.vue')
const Roles = () => import('../views/power/Roles.vue')
const Cate = () => import('../views/goods/Cate.vue')
const Params = () => import('../views/goods/Params.vue')
const GoodsList = () => import('../views/goods/List.vue')
const Shop = () => import('../views/goods/shop.vue')
const Order = () => import('../views/order/Order.vue')
const Report = () => import('../views/report/Report.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', name: 'login', component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/shop', component: Shop },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果token为空
  if (!tokenStr) return next('/login')
  // token不为空则放行能访问其他组件
  next()
})

export default router
