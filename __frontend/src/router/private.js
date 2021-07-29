const routes = [

	{
		path: '/admin',
		name: 'Admin',
		component: () => import('../views/smaug/admin.vue')
	},
	{
		path: '/admin/projects/:id',
		name: 'View project',
		component: () => import('../views/smaug/view.project.vue')
	},
	// {
	// 	path: '/admin/resources/:id',
	// 	name: 'View resource',
	// 	component: import('../views/smaug/view.resource.vue')
	// },
	// {
	// 	path: '/admin/projects/new',
	// 	name: 'Post project',
	// 	component: import('../views/smaug/view.resource.vue')
	// },
	// {
	// 	path: '/admin/resources/new',
	// 	name: 'Post resource',
	// 	component: import('../views/smaug/post.resource.vue')
	// },
]

export default routes.map(route => {
	const meta = {
		public: false,
	}
	return { ...route, meta }
})