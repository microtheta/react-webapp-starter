'use strict';

var React = require('react');
var NavBar = require('../shared/navbar');

module.exports = React.createClass({
	displayName: 'ResetPassword',

	render: function render() {
		return (
			<div className="uk-text-center">
				
				<NavBar/>

				<div className="uk-container uk-container-center uk-animation-fade uk-margin-large-top">

					<div className="uk-greed uk-margin-large-top">

						<div className="uk-width-medium-3-10 uk-container-center">
						{ 	
							this.props.success ?
								<div className="uk-alert uk-alert-primary" data-uk-alert>
									
									<h2> Password Reset Mail Sent </h2>
									
									<p> We have sent you an email (at <b>{ this.props.email }</b>) with further instructions.</p>
									<p> Please check your inbox to reset your password.</p>
									
								</div>
						 	:
							<span>
								{ 	
									this.props.errors ?
										<div className="uk-alert uk-alert-danger" data-uk-alert>
											<a href="javascript:void(0)" className="uk-alert-close uk-close"></a>
											{
												this.props.errors.map(function(err, i) {
													return <p key={i}> {err.msg} </p>
												})
											}
										</div> 
									: null
								}

								<form className="uk-panel uk-panel-box uk-form" action="/forgotpassword" method="post" >

									<h3><i className="uk-icon-lock uk-icon-large"></i></h3>

									<div> <h2 className="uk-text-center">Forgot Password?</h2> </div>

									<p> <small> Enter your email address here and we will send you a mail with password reset instruction. </small> </p>

									<div className="uk-form-row">
										<input autoFocus className="uk-width-1-1 uk-form-large" type="email" defaultValue={this.props.email} placeholder="Email address" name="email" required />
									</div>
									<div className="uk-form-row">
										<button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Submit </button>
									</div>
								</form>
							</span>
						}
						</div>

					</div>

				</div>

			</div>
		)
	}
});