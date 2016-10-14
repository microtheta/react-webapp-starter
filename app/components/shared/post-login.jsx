'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'PostLogin',

	render: function render() {
		return (
			<div className="uk-height-1-1">
				{this.props.children}
	 		</div>
		)
	}
});