import { createRouter, createWebHistory } from 'vue-router'
import CustomHome from '../views/CustomHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/demo/form',
    },
    {
      path: '/demo/form',
      name: 'demo-form',
      component: CustomHome,
    },
  ],
})

export default router
