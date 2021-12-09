module.exports = {
	webpackDevMiddleware: (config) => {
		config.watchOptions.poll = 3000;
		return config;
	},
};
