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
    {
      path: '/demo/components',
      name: 'demo-components',
      component: () => import('../views/DemoComponents.vue'),
    },
    {
      path: '/demo/design-tokens',
      name: 'demo-design-tokens',
      component: () => import('../views/DemoDesignTokens.vue'),
    },
  ],
})

export default router
