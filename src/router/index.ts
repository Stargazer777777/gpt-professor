import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/views/home.vue'),
      children: [
        {
          path: '',
          redirect: (to) => {
            return to.path + '/chat';
          },
        },
        {
          path: 'chat',
          component: () => import('@/views/home/chat.vue'),
        },
        {
          path:'image',
          component:()=>import('@/views/home/image.vue')
        },
        {
          path: 'help',
          component: () => import('@/views/home/help.vue'),
        },
      ],
    },
  ],
});

export default router;
