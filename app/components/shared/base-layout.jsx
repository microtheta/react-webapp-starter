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

					<link rel="icon" type="image/x-icon" href="/public/favicon/favicon.ico" />
					<link rel="apple-touch-icon" sizes="180x180" href="/public/favicon/apple-touch-icon.png" />
					<link rel="icon" type="image/png" href="/public/favicon/favicon-32x32.png" sizes="32x32" />
					<link rel="icon" type="image/png" href="/public/favicon/favicon-16x16.png" sizes="16x16" />
					<link rel="manifest" href="/public/favicon/manifest.json" />
					<link rel="mask-icon" href="/public/favicon/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="theme-color" content="#ffffff" />


					<link rel="stylesheet" href="/public/css/uikit/uikit.css" />
					<link rel="stylesheet" href="/public/css/loading.css" />
					
				</head>
				<body className="uk-height-1-1">

					{this.props.children}

					<script src="/build/lib.min.js"></script>

					{!this.props.excludeClientApp ? <script src="/build/app.js"></script> : null }

				</body>
			</html>
		)
	}
});