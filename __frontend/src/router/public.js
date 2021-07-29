const routes = [
	{
		path: '/smaug/login',
		name: 'Smaug Login',
		component: () => import('../views/smaug/login.vue')
	},
	{
		path: '/projects/:page',
		name: 'Projects',
		component: () => import('../views/projects.vue')
	},
	// {
	// 	path: '/resources/:page',
	// 	name: 'Resources',
	// 	component: Resources
	// },
	{
		path: '/project/:projectId',
		name: 'Project',
		component: () => import('../views/view.project.vue')
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue')
	},
	// {
	// 	path: '/resource/:resourceId',
	// 	name: 'Resource',
	// 	component: Resource
	// },
]

export default routes.map(route => {
	const meta = {
		public: true,
	}
	return { ...route, meta }
})