import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES } from "./routeNames";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.LIST,
      component: () => import('@/views/ToDoList.vue'),
	  children: [
		{
			path: 'task/:id',
			name: ROUTE_NAMES.TASK,
			component: () => import('@/views/TaskPage.vue'),
			props: true,
		},
		{
			path: 'task/create',
			name: ROUTE_NAMES.CREATE,
			component: () => import('@/views/TaskEdit.vue'),
		},
		{
			path: 'task/edit/:id',
			name: ROUTE_NAMES.EDIT,
			component: () => import('@/views/TaskEdit.vue'),
			props: true,
		}
	  ]
    },
  ],
})

export default router
