import Admin from '../views/smaug/admin.vue';
import PostProject from '../views/smaug/post.project.vue';
import PostResource from '../views/smaug/post.resource.vue';
import ViewProject from '../views/smaug/view.project.vue';
import ViewResource from '../views/smaug/view.resource.vue';

const routes = [

	{
		path: '/admin',
		name: 'Admin',
		component: Admin
	},
	{
		path: '/admin/projects/:id',
		name: 'View project',
		component: ViewProject
	},
	{
		path: '/admin/resources/:id',
		name: 'View resource',
		component: ViewResource
	},
	{
		path: '/admin/projects/new',
		name: 'Post project',
		component: PostProject
	},
	{
		path: '/admin/resources/new',
		name: 'Post project',
		component: PostResource
	},
]

export default routes.map(route => {
	const meta = {
		public: false,
	}
	return { ...route, meta }
})