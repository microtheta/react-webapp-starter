'use strict';

var React = require('react');
var $data = require('../utils/fetchdata');

var NavBar = require('../shared/navbar');


module.exports = React.createClass({
	displayName: 'GreedPage',

	getInitialState: function(){
		return {
			user: this.props.user || {}
		}
	},

	componentDidMount: function() {
		var _this = this;
		$data.get('/api/userdetails').then(function(data) {
			_this.setState({
				user: data
			});
		});
	},

	render: function render() {
		return (
			<div>
				<NavBar user={this.state.user} />
				<div className="uk-container-center uk-container uk-margin-top uk-margin-bottom" >
					<div className="uk-grid">
						<div className="uk-width-small-1-1 uk-width-medium-2-10">
							
						</div>
						<div className="uk-width-small-1-1 uk-width-medium-6-10">
							
							<div className="uk-article">

								<h1 className="uk-article-title"> My Article Title </h1>

								<p className="uk-article-meta">Written by {this.state.user.firstName} Super User on 12 April 2012. Posted in Blog</p>

								<p className="uk-article-lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor className ut labore et dolore magna aliqua.</p>

								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

								<hr className="uk-article-divider" />
								
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

								<a href="#">Read more</a>

							</div>

							<hr className="uk-article-divider" />

							<ul className="uk-comment-list">
								<li>
									<article className="uk-comment">
										<header className="uk-comment-header">
											<img className="uk-comment-avatar" src="/public/images/placeholder_avatar.svg" width="50" height="50" alt="" />
											<h4 className="uk-comment-title">Author</h4>
											<div className="uk-comment-meta">12 days ago | Profile | #</div>
										</header>
										<div className="uk-comment-body">
											<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
										</div>
									</article>
									<ul>
										<li>
											<article className="uk-comment">
												<header className="uk-comment-header">
													<img className="uk-comment-avatar" src="/public/images/placeholder_avatar.svg" width="50" height="50" alt="" />
													<h4 className="uk-comment-title">Author</h4>
													<div className="uk-comment-meta">12 days ago | Profile | #</div>
												</header>
												<div className="uk-comment-body">
													<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
												</div>
											</article>
										</li>
										<li>
											<article className="uk-comment">
												<header className="uk-comment-header">
													<img className="uk-comment-avatar" src="/public/images/placeholder_avatar.svg" width="50" height="50" alt="" />
													<h4 className="uk-comment-title">Author</h4>
													<div className="uk-comment-meta">12 days ago | Profile | #</div>
												</header>
												<div className="uk-comment-body">
													<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
												</div>
											</article>
										</li>
									</ul>
								</li>
							</ul>


						</div>
						<div className="uk-width-small-1-1 uk-width-medium-2-10">
							
						</div>
					</div>
				</div>
			</div>
		)
	}
});