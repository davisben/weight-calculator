var keystone = require('keystone');

module.exports = function(req, res) {
	keystone.session.signout(req, res, function() {
		res.redirect('/');
	});
}
