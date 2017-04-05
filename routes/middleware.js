var _ = require('lodash');

/**
	Initialize locals
 */
exports.initLocals = function(req, res, next) {
	var locals = res.locals;

	locals.page = [{
		title: 'Weight Calculator'
	}];

	locals.navLinks = [{
		label: 'Home',
		key: 'home',
		href: '/'
	}];

	next();
};

/**
  Fetches and clears the flashMessages before a view is rendered
 */
exports.flashMessages = function(req, res, next) {
  var messages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.any(messages, function(msgs) { return msgs.length; }) ? messages : false;

  next();
};
