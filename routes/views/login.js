var keystone = require('keystone');
var _ = require('lodash');

module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'auth';
	locals.page.title = 'Login';

	view.on('post', { action: 'login' }, function(next) {
		if (!req.body.user) {
			req.flash('error', 'Please enter your username or email address.');
			return next();
		}

		if (!req.body.password) {
			req.flash('error', 'Please enter your password.');
			return next();
		}

		var onSuccess = function() {
			res.redirect('/');
		}

		var onFail = function() {
			req.flash('error', 'Your username or password were incorrect, please try again.');
			return next();
		}

		var User = keystone.list('User');
		User.model.findOne()
	    .select('email')
	    .where('username', req.body.user)
	    .exec(function(err, user) {
		    if (!_.isEmpty(user)) {
			    var email = user.email;
			    keystone.session.signin({
						email: email,
						password: req.body.password
					}, req, res, onSuccess, onFail);
		    }
		    else {
			    keystone.session.signin({
						email: req.body.user,
						password: req.body.password
					}, req, res, onSuccess, onFail);
		    }
	    });
	});

	view.render('login');
}
