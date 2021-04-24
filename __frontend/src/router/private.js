import Projects from '../views/smaug/projects.vue';
import PostProject from '../views/smaug/post.project.vue';
import ViewProject from '../views/smaug/view.project.vue';

const routes = [

	{
		path: '/admin/projects',
		name: 'AdminProjects',
		component: Projects
	},
	{
		path: '/admin/projects/:id',
		name: 'View project',
		component: ViewProject
	},
	{
		path: '/admin/projects/new',
		name: 'Post project',
		component: PostProject
	},
]

export default routes.map(route => {
	const meta = {
		public: false,
	}
	return { ...route, meta }
})