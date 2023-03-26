import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/views/home/home.vue'),
      children: [
        {
          path: '',
          redirect: (to) => {
            return to.path + '/chat';
          },
        },
        {
          path: 'chat',
          component: () => import('@/views/home/subpages/chat.vue'),
        },
        {
          path: 'help',
          component: () => import('@/views/home/subpages/help.vue'),
        },
      ],
    },
  ],
});

export default router;
