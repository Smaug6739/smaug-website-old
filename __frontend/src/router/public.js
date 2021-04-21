import Login from '../views/smaug/login.vue';

const routes = [

	{
		path: '/smaug/login',
		name: 'Smaug Login',
		component: Login
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue')
	},

]

export default routes.map(route => {
	const meta = {
		public: true,
	}
	return { ...route, meta }
})