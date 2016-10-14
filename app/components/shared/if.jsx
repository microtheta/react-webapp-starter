 'use strict';


var React = require('react');

var If = React.createClass({

	displayName: 'If',

	render: function() {
		if(this.props.when) {
			return this.props.children;
		} else {
			return false;
		}
	},

});

module.exports = If;