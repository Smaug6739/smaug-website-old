import Login from '../views/smaug/login.vue';
import Project from '../views/view.project.vue';
import Projects from '../views/projects.vue';

const routes = [

	{
		path: '/smaug/login',
		name: 'Smaug Login',
		component: Login
	},
	{
		path: '/projects/:page',
		name: 'Projects',
		component: Projects
	},
	{
		path: '/project/:projectId',
		name: 'Project',
		component: Project
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