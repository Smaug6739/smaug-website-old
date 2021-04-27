import Login from '../views/smaug/login.vue';
import Project from '../views/view.project.vue';
import Resource from '../views/view.resource.vue';
import Projects from '../views/projects.vue';
import Resources from '../views/resources.vue';

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
		path: '/resources/:page',
		name: 'Resources',
		component: Resources
	},
	{
		path: '/project/:projectId',
		name: 'Project',
		component: Project
	},
	{
		path: '/resource/:resourceId',
		name: 'Resource',
		component: Resource
	},
]

export default routes.map(route => {
	const meta = {
		public: true,
	}
	return { ...route, meta }
})