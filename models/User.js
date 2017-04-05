var keystone = require('keystone');
var Types = keystone.Field.Types;

var User = new keystone.List('User', {
  autokey: {
	  from: 'username',
	  path: 'user',
	  unique: true
	},
	map: { name: 'username' },
});

User.add({
	username: {
  	type: Types.Text,
  	initial: true,
  	required: true
  },
  email: {
  	type: Types.Email,
  	initial: true,
  	required: true,
  	index: true
  },
	password: {
  	type: Types.Password,
  	initial: true,
  	required: true
  }
}, 'Profile', {
	name: {
  	type: Types.Name,
  	required: true,
  	index: true
  }
}, 'Permissions', {
	isAdmin: {
  	type: Boolean,
  	label: 'Admin',
  	index: true
  }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

User.defaultColumns = 'username, email, name, isAdmin';
User.register();
