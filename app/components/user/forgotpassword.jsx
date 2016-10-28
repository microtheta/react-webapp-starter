'use strict';

var React = require('react');
var NavBar = require('../shared/navbar');
var $data = require('../utils/fetchdata');


module.exports = React.createClass({
	displayName: 'ResetPassword',
	
	getInitialState: function() {
		return {
			unknownError: null,
			errors: null,
			success: null,
			userEmail: null
		}
	},

	handleSubmit: function(e) {
		e.preventDefault();

		var _this = this;
		
		_this.setState(_this.getInitialState());

		$data.post('/api/user/forgotpassword', $(e.target).serialize())
		.then(function(data) {
			if(data.success) {
				_this.setState({
					success: true,
					userEmail: data.email,
					errors: null,
					unknownError: null

				});
			}
			else {
				_this.setState({
					unknownError: true
				});
			}
		})
		.catch(function(data) {
			if(data.success === false) {
				if(data.errors) {
					_this.setState({
						errors: data.errors
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

	render: function render() {
		return (
			<div className="uk-text-center">
				
				<NavBar/>

				<div className="uk-container uk-container-center uk-animation-fade uk-margin-large-top">

					<div className="uk-greed uk-margin-large-top">

						<div className="uk-width-medium-3-10 uk-container-center">
						{ 	
							this.state.unknownError ?
								<div className="uk-alert uk-alert-danger" data-uk-alert>
									<a href="javascript:void(0)" className="uk-alert-close uk-close"></a>
									<p> Some internal error. Can you please try again later? </p>
								</div> 
							: null
						}

						{ 	
							this.state.success ?
								<div className="uk-alert uk-alert-primary" data-uk-alert>
									
									<h2> Password Reset Mail Sent </h2>
									
									<p> We have sent you an email (at <b>{ this.state.userEmail }</b>) with further instructions.</p>
									<p> Please check your inbox to reset your password.</p>
									
								</div>
						 	:
							<span>
								{ 	
									this.state.errors ?
										<div className="uk-alert uk-alert-danger" data-uk-alert>
											<a href="javascript:void(0)" className="uk-alert-close uk-close"></a>
											{
												this.state.errors.map(function(err, i) {
													return <p key={i}> {err.msg} </p>
												})
											}
										</div> 
									: null
								}

								<form className="uk-panel uk-panel-box uk-form" onSubmit={this.handleSubmit}> {/* action="/forgotpassword" method="post"  */}

									<h3><i className="uk-icon-lock uk-icon-large"></i></h3>

									<div> <h2 className="uk-text-center">Forgot Password?</h2> </div>

									<p> <small> Enter your email address here and we will send you a mail with password reset instruction. </small> </p>

									<div className="uk-form-row">
										<input autoFocus className="uk-width-1-1 uk-form-large" type="text" placeholder="Email address" name="email" required />
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