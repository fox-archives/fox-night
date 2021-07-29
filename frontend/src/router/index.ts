import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/library',
		name: 'Library',
		component: () =>
			import(/* webpackChunkName: "media" */ '../views/Library.vue'),
	},
	{
		path: '/events',
		name: 'Events',
		component: () =>
		import(/* webpackChunkName: "media" */ '../views/Events.vue'),
	},
	{
		path: '/player',
		name: 'Player',
		component: () =>
			import(/* webpackChunkName: "media" */ '../views/Player.vue'),
	},
	{
		path: '/:catchAll(.*)',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/FourOhFour.vue'),
		name: 'FourOhFour'
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
