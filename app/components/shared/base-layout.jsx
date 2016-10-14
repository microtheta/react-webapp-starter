'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'Layout',

	render: function render() {
		return (
			<html className="uk-height-1-1">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					
					<title> Hello! </title>
					<link rel="icon" type="image/x-icon" href="/public/favicon.png" />
					
					<link rel="stylesheet" href="/public/css/uikit/uikit.css" />
					
				</head>
				<body className="uk-height-1-1">

					{this.props.children}

					<script src="/build/lib.min.js"></script>
					<script src="/build/app.js"></script>
				</body>
			</html>
		)
	}
});