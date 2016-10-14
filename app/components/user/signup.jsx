'use strict';

var React = require('react');
var NavBar = require('../shared/navbar');

module.exports = React.createClass({
	displayName: 'LoginPage',

	render: function render() {
		return (
			<div className="">
				
				<NavBar currentmenu="signup" />

				<div className="uk-container uk-container-center uk-animation-fade uk-margin-large-top">

					<div className="uk-grid uk-margin-large-top">

						<div className="uk-width-medium-4-10 uk-container-center">

							<div className="uk-panel uk-panel-header">

								<h2> Sign up </h2>

								<form className="uk-form uk-form-stacked">

									<div className="uk-form-row">
										{ /* <label className="uk-form-label">Your Name</label> */ }
										<div className="uk-form-controls uk-grid uk-grid-small">
											<div className="uk-width-1-2">
												<input autoFocus type="text" placeholder="First Name" className="uk-width-1-1 uk-form-large" />
											</div>
											<div className="uk-width-1-2">
												<input type="text" placeholder="Last Name" className="uk-width-1-1 uk-form-large" />
											</div>
										</div>
									</div>

									<div className="uk-form-row">
										{ /* <label className="uk-form-label">Your Email</label> */ }
										<div className="uk-form-controls">
											<input type="text" placeholder="Email address" className="uk-width-1-1 uk-form-large" />
										</div>
									</div>

									<div className="uk-form-row">
										{ /* <label className="uk-form-label">Choose Password</label> */ }
										<div className="uk-form-controls">
											<input type="text" placeholder="New password" className="uk-width-1-1 uk-form-large" />
										</div>
									</div>

									<div className="uk-form-row">
										{ /* <label className="uk-form-label">Choose Password</label> */ }
										<div className="uk-form-controls">
											<input type="text" placeholder="Confirm password" className="uk-width-1-1 uk-form-large" />
										</div>
									</div>

									<div className="uk-form-row">
										<div className="uk-form-controls">
											<button type="submit" className="uk-width-2-10 uk-button uk-button-primary uk-button-large">
											Submit
											</button>
										</div>
									</div>

								</form>

							</div>

						</div>

					</div>

				</div>

			</div>
		)
	}
});