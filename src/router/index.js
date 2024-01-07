import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/views/AddTask',
    component: () => import ('../views/AddTask.vue')
  },
  // {
  //   path: '/',
  //   redirect: '/views/AddTask'
  // },
  {
    path: '/',
    component: () => import ('../views/Initial.vue')
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/category/:id',
    component: () => import ('../views/Category.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
