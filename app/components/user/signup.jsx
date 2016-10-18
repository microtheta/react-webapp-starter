'use strict';

var React = require('react');
var Link = require('react-router').Link;
var NavBar = require('../shared/navbar');
var If = require('../shared/if');

module.exports = React.createClass({
	displayName: 'LoginPage',

	render: function render() {
		return (
			<div className="">
				
				<NavBar currentmenu="signup" />

				<div className="uk-container uk-container-center uk-animation-fade uk-margin-large-top">

					<div className="uk-grid uk-margin-large-top">

						<If when={!this.props.email}>
							<div className="uk-width-medium-4-10 uk-container-center">

								{ this.props.signuperrors ? 
									<div className="uk-alert uk-alert-danger" data-uk-alert>
										<a href="javascript:void(0)" className="uk-alert-close uk-close"></a>
										<ul>
											{
												this.props.signuperrors.map(function(err, i) {
													return <li key={err.param}> {err.msg} </li>
												})
											}
										</ul>
									</div> : ''
								}

								{
									this.props.existingUser ?
										<div className="uk-width-medium-1-1 uk-container-center">

											<div className="uk-alert uk-alert-large uk-alert-primary">

												<h2> Email address already in use </h2>

												<p> An existing account is already associated with the email address you have entered. </p>
												<p> <Link to="/login"> Click here to login </Link> using your password. </p>
												<p> If you forgot your password, <Link to="/resetpassword"> click here </Link> to reset your password. </p>
				
											</div>						

										</div> : ''
								}

								<div className="uk-panel uk-panel-header">

									<h2> Sign up </h2>

									<form className="uk-form uk-form-stacked" action="/signup" method="post">

										<div className="uk-form-row">
											{ /* <label className="uk-form-label">Your Name</label> */ }
											<div className="uk-form-controls uk-grid uk-grid-small">
												<div className="uk-width-1-2">
													<input autoFocus type="text" placeholder="First Name" name="firstName" className="uk-width-1-1 uk-form-large" defaultValue={this.props.reqBody && this.props.reqBody.firstName} required/>
												</div>
												<div className="uk-width-1-2">
													<input type="text" placeholder="Last Name" name="lastName" className="uk-width-1-1 uk-form-large" defaultValue={this.props.reqBody && this.props.reqBody.lastName} required />
												</div>
											</div>
										</div>

										<div className="uk-form-row">
											{ /* <label className="uk-form-label">Your Email</label> */ }
											<div className="uk-form-controls">
												<input type="email" placeholder="Email address" name="email" className="uk-width-1-1 uk-form-large" defaultValue={this.props.reqBody && this.props.reqBody.email} required />
											</div>
										</div>

										<div className="uk-form-row">
											{ /* <label className="uk-form-label">Choose Password</label> */ }
											<div className="uk-form-controls">
												<input type="password" placeholder="New password" name="password" className="uk-width-1-1 uk-form-large" required />
											</div>
										</div>

										<div className="uk-form-row">
											{ /* <label className="uk-form-label">Choose Password</label> */ }
											<div className="uk-form-controls">
												<input type="password" placeholder="Confirm password" name="confirmpassword"  className="uk-width-1-1 uk-form-large" required />
											</div>
										</div>

										<div className="uk-form-row">
											<div className="uk-form-controls uk-grid uk-grid-small">
												<div className="uk-width-3-10">
													<button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large">
													Submit
													</button>
												</div>
												<div className="uk-width-7-10">
													<div className="uk-width-1-1 uk-text-right uk-text-bottom">
														Already have an account? <Link className="uk-link uk-text-nowrap" to="/login">Login here</Link>
													</div>
												</div>
											</div>
										</div>

									</form>

								</div>

							</div>
						</If>

						<If when={this.props.email}>
							
							<div className="uk-width-medium-7-10 uk-container-center">

								<div className="uk-alert uk-alert-large uk-alert-primary">

									<h2> Thank You! Please check your inbox to activate your account </h2>

									<p> We've sent you a confirmation email with a link to activate your account. </p>
									<p> Please check your email(<b>{this.props.email}</b>) and click the link. </p>
									<p> This helps to ensure that your (and our) inbox remains free of spam. :)</p>
	
								</div> 							

							</div>

						</If>

					</div>

				</div>

			</div>
		)
	}
});