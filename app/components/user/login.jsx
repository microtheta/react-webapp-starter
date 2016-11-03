'use strict';

var React = require('react');
var Link = require('react-router').Link;
import { browserHistory } from 'react-router';

var NavBar = require('../shared/navbar');
var Loading = require('../shared/loading');
var $data = require('../utils/fetchdata');


module.exports = React.createClass({
	displayName: 'LoginPage',

	showLoading: function(){
		this.setState({
			isLoading: true
		});
	},

	hideLoading: function(){
		this.setState({
			isLoading: false
		});
	},

	getInitialState: function() {
		return {
			newactivationMailSent : false,
			errors: null,
			notverified: false,
			inactive: false,
			isLoading: false
		}
	},

	handleSubmit: function(e){
		e.preventDefault();

		var _this = this;

		_this.showLoading();

		$data.post('api/user/login', $(e.target).serialize())
		.then(function(data) {
			_this.hideLoading();

			if(data.success) {
				browserHistory.push(data.to);
			}
			else {
				_this.setState({
					unknownError: true
				});
			}
		})
		.catch(function(data) {
			_this.hideLoading();
			
			if(data.success === false) {
				if(data.errors) {
					_this.setState({
						errors: data.errors
					});
				}
				else if(data.notverified) {
					_this.setState({
						errors: null,
						notverified: true,
						notVerifiedemail: data.email
					});
				}
				else if(data.inactive) {
					_this.setState({
						errors: null,
						inactive: true
					});
				}
				else {
					_this.setState({
						unknownError: true
					});
				}
			}
			else {
				_this.setState({
					unknownError: true
				});
			}
		});
	},

	resendActivationMail: function() {
		var _this = this;
		
		_this.setState({
			newactivationMailSent: 'sending'
		});

		$.post('/api/activationmail', {email:_this.state.notVerifiedemail}, function(data) {
		
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

							{ this.state.errors ?
								<div className="uk-alert uk-alert-danger" data-uk-alert>
									<a href="javascript:void(0)" className="uk-alert-close uk-close"></a>
									{
										this.state.errors.map(function(err, i) {
											return <p key={i}> {err.msg} </p>
										})
									}
								</div> : ''
							}

							{
								this.state.notverified ?

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
															<p> Activation Email sent to <b> {this.state.notVerifiedemail} </b> </p>
													}
													</span>
												}
											</span>
										}

									</div> : ''
							}

							{
								this.state.inactive ?
								<div className="uk-alert uk-alert-danger" data-uk-alert>
									Account is not active.
								</div> : ''
							}

							<img className="uk-margin-bottom" width="140" height="120" src="/public/images/logo.png" alt="" />
							<Loading loading={this.state.isLoading}>
								<form className="uk-panel uk-panel-box uk-form" onSubmit={this.handleSubmit} >
									<div className="uk-form-row">
										<input autoFocus className="uk-width-1-1 uk-form-large" type="text" placeholder="Email/Username" name="email" required />
									</div>
									<div className="uk-form-row">
										<input className="uk-width-1-1 uk-form-large" type="password" placeholder="Password" name="password"  required />
									</div>
									<div className="uk-form-row">
										<button type="submit" className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Login</button>
									</div>
									<div className="uk-form-row uk-text-small uk-vertical-align-middle">
										<Link className="uk-float-right uk-link uk-link-muted" to="/forgotpassword">Forgot Password?</Link>
									</div>
								</form>
							</Loading>

						</div>

					</div>

				</div>

			</div>
		)
	}
});