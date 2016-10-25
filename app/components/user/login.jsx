'use strict';

var React = require('react');
var NavBar = require('../shared/navbar');

module.exports = React.createClass({
	displayName: 'LoginPage',
	getInitialState: function() {
		return {
			newactivationMailSent : false
		}
	},
	resendActivationMail: function() {
		var _this = this;
		
		_this.setState({
			newactivationMailSent: 'sending'
		});

		$.post('/api/activationmail', {email:_this.props.reqBody.email}, function(data) {
		
			_this.setState({
				newactivationMailSent: true
			});

		}).fail(function() {
			_this.setState({
				newactivationMailSent: 'failed'
			});
		});

	},

	render: function render() {
		return (
			<div className="uk-text-center">
				
				<NavBar currentmenu="login" />

				<div className="uk-container uk-container-center uk-animation-fade uk-margin-large-top">

					<div className="uk-greed uk-margin-large-top">

						<div className="uk-width-medium-3-10 uk-container-center">

							{ this.props.loginerrors ?
								<div className="uk-alert uk-alert-danger" data-uk-alert>
									<a href="javascript:void(0)" className="uk-alert-close uk-close"></a>
									{
										this.props.loginerrors.map(function(err, i) {
											return <p key={i}> {err.msg} </p>
										})
									}
								</div> : ''
							}

							{
								this.props.notverified ?

									<div className="uk-alert uk-alert-warning" data-uk-alert>
										<h2> Email is not verified. </h2>
										
										{ 
											!this.state.newactivationMailSent ? 
												<span>
													<p> We've sent you a mail with activation link. Login to your mail account and click on account activation link. </p>

													<p> 
														If you have not recieved a mail, <a onClick={this.resendActivationMail} className="uk-link uk-link-muted" href="javascript:void(0)"> Click here </a> to resend it. 
													</p>
												</span>
											:
											<span>
												{
													this.state.newactivationMailSent == 'sending' ?
														<i className="uk-icon-spinner uk-icon-spin"></i>
													:	
													<span> 
													{
														this.state.newactivationMailSent == 'failed' ?
															<p>  Right now, we are unable to send a mail. Please excuse us for this and try again later.</p>
														:
															<p> Activation Email sent to <b> {this.props.reqBody.email} </b> </p>
													}
													</span>
												}
											</span>
										}

									</div> : ''
							}

							{
								this.props.inactive ?
								<div className="uk-alert uk-alert-danger" data-uk-alert>
									Account is not active.
								</div> : ''
							}

							<img className="uk-margin-bottom" width="140" height="120" src="/public/images/logo.png" alt="" />

							<form className="uk-panel uk-panel-box uk-form" action="/login" method="post" >
								<div className="uk-form-row">
									<input autoFocus className="uk-width-1-1 uk-form-large" type="email" placeholder="Email/Username" name="email" defaultValue={this.props.reqBody && this.props.reqBody.email} required />
								</div>
								<div className="uk-form-row">
									<input className="uk-width-1-1 uk-form-large" type="password" placeholder="Password" name="password"  required />
								</div>
								<div className="uk-form-row">
									<button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Login</button>
								</div>
								<div className="uk-form-row uk-text-small uk-vertical-align-middle">
									<a className="uk-float-right uk-link uk-link-muted" href="/forgotpassword">Forgot Password?</a>
								</div>
							</form>

						</div>

					</div>

				</div>

			</div>
		)
	}
});