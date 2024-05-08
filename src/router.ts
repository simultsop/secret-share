import { createRouter, createWebHistory } from 'vue-router'
import Read from './pages/Read.vue';
import ReadPublickey from './pages/ReadPublickey.vue';
import Share from './pages/Share.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'read',
      component: Read
    },
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    {
      path: '/:publickey',
      name: 'read publickey',
      component: ReadPublickey
    },
  ]
})

export default router
