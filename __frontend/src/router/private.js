import Admin from '../views/smaug/admin.vue';

const routes = [

	{
		path: '/admin',
		name: 'Admin',
		component: Admin
	},
]

export default routes.map(route => {
	const meta = {
		public: false,
	}
	return { ...route, meta }
})