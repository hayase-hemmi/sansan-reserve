import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
      component: Home,
    },
  ],
})

export default router
