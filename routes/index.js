var babelify = require('babelify');
var browserify = require('browserify-middleware');
var keystone = require('keystone');
var middleware = require('./middleware');

var importRoutes = keystone.importer(__dirname);

// Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Load Routes
var routes = {
	views: importRoutes('./views'),
};

exports = module.exports = function(app) {
	app.use('/js', browserify('./client/scripts', {
		transform: [babelify.configure({
			plugins: ['es2015', 'react']
		})]
	}));

	app.get('/', routes.views.index);

	app.all('/login', routes.views.login);
	app.get('/logout', routes.views.logout);
};
