require('dotenv').config();
var keystone = require('keystone');

keystone.init({
	'name': 'Weight Calculator',
	'brand': 'Weight Calculator',

	'sass': 'public',
	'sass options': {
  	indentedSyntax: true,
  	includePaths: [
    	'node_modules/bourbon/core',
    	'node_modules/bourbon-neat/core',
    	'node_modules/Bitters/core'
  	]
   },
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	users: 'users',
});

keystone.start();
