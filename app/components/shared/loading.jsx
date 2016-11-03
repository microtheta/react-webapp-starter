 'use strict';


var React = require('react');

var Loader = React.createClass({

	displayName: 'Loader',

	render: function() {
		return (
			<div className="uk-position-relative">
				{this.props.children}
				{
					this.props.loading ?
						<div className="uk-animation-fade">
							<div className="block-component"></div>
							<div id="cssload-contain">
								<div className="cssload-wrap" id="cssload-wrap1">
									<div className="cssload-ball" id="cssload-ball1"></div>
								</div>

								<div className="cssload-wrap" id="cssload-wrap2">
									<div className="cssload-ball" id="cssload-ball2"></div>
								</div>
								
								<div className="cssload-wrap" id="cssload-wrap3">
									<div className="cssload-ball" id="cssload-ball3"></div>
								</div>
								
								<div className="cssload-wrap" id="cssload-wrap4">
									<div className="cssload-ball" id="cssload-ball4"></div>
								</div>
							</div>
						</div>
					: null 
				}
			</div>
		);
	},

});

module.exports = Loader;