'use strict';

var React = require('react');
var BaseLayout = require('../shared/base-layout');
var NavBar = require('../shared/navbar');

module.exports = React.createClass({
	displayName: 'ResetPassword',

	render: function render() {
		return (

			<BaseLayout excludeClientApp="true">

				<div className="uk-text-center">
					
					<NavBar/>

					<div className="uk-container uk-container-center uk-animation-fade uk-margin-large-top">

						<div className="uk-greed uk-margin-large-top">

							<div className="uk-width-medium-3-10 uk-container-center">

								{
									this.props.errors ?
										<div className="uk-alert uk-alert-danger" data-uk-alert>
											{this.props.errors}
										</div> 
									: null
								}

								<form className="uk-panel uk-panel-box uk-form" method="post" >

									<div> <h2 className="uk-text-center">Set Password</h2> </div>

									<div className="uk-form-row">
										<input className="uk-width-1-1 uk-form-large" type="password" placeholder="New password" name="password" required />
									</div>

									<div className="uk-form-row">
										<input className="uk-width-1-1 uk-form-large" type="password" placeholder="Confirm password" name="confirmpassword" required />
									</div>

									<div className="uk-form-row">
										<button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large"> Submit </button>
									</div>

								</form>

							</div>

						</div>

					</div>

				</div>

			</BaseLayout>
		)
	}
});