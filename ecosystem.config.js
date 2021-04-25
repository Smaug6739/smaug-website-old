module.exports = {
	apps: [
		{
			name: "smaug-website-backend",
			cwd: './backend/dist',
			script: "main.js",
			instances: 2,
			exec_mode: "cluster",
			env: {
				"NODE_ENV": "development",
			},
			env_production: {
				"NODE_ENV": "production"
			}
		}
	]
};