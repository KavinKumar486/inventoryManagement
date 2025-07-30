import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Landing from '../views/WarehouseManager.vue'
import Orders from '@/views/Orders.vue'
import AdminLogin from '@/views/adminLogin.vue'
import AdminCustomers from '@/views/adminCustomers.vue'
import AdminWarehouse from '@/views/adminWarehouse.vue'
import AdminOrders from '@/views/adminOrders.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/login',
      name: 'secondaryLogin',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/landingPage',
      name: 'landingPage',
      component: Landing,
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutPage.vue'),
    },
    { path: '/orders',
      name:'orders',
      component: Orders },
    { path: '/admin/login', 
      component: AdminLogin, 
      meta: { requiresAuth: false } 
    },
    {
      path: '/admin/customers',
      component: AdminCustomers,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/warehouse',
      component: AdminWarehouse,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/orders',
      component: AdminOrders,
      meta: { requiresAuth: true },
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    const token = localStorage.getItem('admin_jwt_token')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('jwt_token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
