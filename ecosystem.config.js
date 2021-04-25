module.exports = {
	apps: [
		{
			name: "smaug-website-backend",
			cwd: './backend/dist',
			script: "main.js",
			instances: 2,
			exec_mode: "cluster",
			env: {
				"NODE_ENV": "production",
			},
		},
		{
			name: "smaug-website-backend",
			cwd: './__frontend',
			script: "serve -s dist",
			env: {
				"NODE_ENV": "production",
			},
		}
	]
};