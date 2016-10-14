'use strict';

var React = require('react');
var If = require('./if');

module.exports = React.createClass({
	displayName: 'NavBar',

	render: function render() {
		return (
			<nav className="tm-navbar uk-navbar uk-navbar-attached uk-margin-bottom">

				<div className="uk-container uk-container-center">

					<a className="uk-navbar-brand uk-hidden-small" href="/">
						<img className="uk-margin uk-margin-remove" src="/public/images/logo.png" style={{"height":"30px", "width":"auto"}} title="UIkit" alt="UIkit" />
					</a>

					<If when={this.props.user} >

						<span>
							<ul className="uk-navbar-nav uk-hidden-small">
								<li><a href="documentation_get-started.html">Get Started</a></li>
								<li className="uk-active"><a href="core.html">Core</a></li>
								<li><a href="components.html">Components</a></li>
								<li><a href="customizer.html">Customizer</a></li>
								<li><a href="../showcase/index.html">Showcase</a></li>
								<li><a href="tutorials.html">Tutorials</a></li>
								<li><a href="uikit3.html">UIkit 3</a></li>
							</ul>

							<div className="uk-navbar-flip">
								<ul className="uk-navbar-nav">
									<li className="uk-button-dropdown" data-uk-dropdown="{mode:'click'}" aria-haspopup="true" aria-expanded="false">
										<div className="uk-navbar-brand" style={{"lineHeight": "41px"}}>
											<img style={{"maxHeight": "32px"}} className="uk-border-circle" src="/public/images/placeholder_avatar.svg" alt="" /> 
										</div>
										<div className="uk-dropdown-blank uk-dropdown-navbar uk-panel uk-panel-box uk-dropdown-bottom uk-padding-bottom-remove" aria-hidden="true" >
											<div>
												<h3 className="uk-panel-title">Title</h3>
												Lorem ipsum dolor sit amet, consectetur adipisicing elit.	
											</div>
											<hr/>
											<div>
												<i className="uk-icon-cog uk-icon-small uk-icon-hover uk-align-left"></i>
												<a href="/logout">
													<i className="uk-icon-sign-out uk-icon-small uk-icon-hover uk-align-right" title="Log out"></i>
												</a>
											</div>
										</div>
									</li>
								</ul>
							</div>

							<a href="#tm-offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas="{'mode':'slide'}"></a>

							<div className="uk-navbar-brand uk-navbar-center uk-visible-small">
								<img src="/public/images/logo.png" style={{"height":"30px", "width":"auto"}} title="UIkit" alt="UIkit" /> UIkit
							</div>
						
							<div id="tm-offcanvas" className="uk-offcanvas">

								<div className="uk-offcanvas-bar">

									<ul className="uk-nav uk-nav-offcanvas uk-nav-parent-icon" data-uk-nav="{multiple:true}">
										<li className="uk-parent"><a href="#">Documentation</a>
											<ul className="uk-nav-sub">
												<li><a href="documentation_get-started.html">Get started</a></li>
												<li><a href="documentation_how-to-customize.html">How to customize</a></li>
												<li><a href="documentation_layouts.html">Layout examples</a></li>
												<li><a href="core.html">Core</a></li>
												<li><a href="components.html">Components</a></li>
												<li><a href="documentation_project-structure.html">Project structure</a></li>
												<li><a href="documentation_less-sass.html">Less &amp; Sass files</a></li>
												<li><a href="documentation_create-a-theme.html">Create a theme</a></li>
												<li><a href="documentation_create-a-style.html">Create a style</a></li>
												<li><a href="documentation_customizer-json.html">Customizer.json</a></li>
												<li><a href="documentation_javascript.html">JavaScript</a></li>
												<li><a href="documentation_custom-prefix.html">Custom prefix</a></li>
											</ul>
										</li>
										<li className="uk-nav-header">Core</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-wrench"></i> Defaults</a>
											<ul className="uk-nav-sub">
												<li><a href="base.html">Base</a></li>
												<li><a href="print.html">Print</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-th-large"></i> Layout</a>
											<ul className="uk-nav-sub">
												<li><a href="grid.html">Grid</a></li>
												<li><a href="panel.html">Panel</a></li>
												<li><a href="block.html">Block</a></li>
												<li><a href="article.html">Article</a></li>
												<li><a href="comment.html">Comment</a></li>
												<li><a href="utility.html">Utility</a></li>
												<li><a href="flex.html">Flex</a></li>
												<li><a href="cover.html">Cover</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-bars"></i> Navigations</a>
											<ul className="uk-nav-sub">
												<li><a href="nav.html">Nav</a></li>
												<li><a href="navbar.html">Navbar</a></li>
												<li><a href="subnav.html">Subnav</a></li>
												<li><a href="breadcrumb.html">Breadcrumb</a></li>
												<li><a href="pagination.html">Pagination</a></li>
												<li><a href="tab.html">Tab</a></li>
												<li><a href="thumbnav.html">Thumbnav</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-check"></i> Elements</a>
											<ul className="uk-nav-sub">
												<li><a href="list.html">List</a></li>
												<li><a href="description-list.html">Description list</a></li>
												<li><a href="table.html">Table</a></li>
												<li><a href="form.html">Form</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-folder-open"></i> Common</a>
											<ul className="uk-nav-sub">
												<li><a href="button.html">Button</a></li>
												<li><a href="icon.html">Icon</a></li>
												<li><a href="close.html">Close</a></li>
												<li><a href="badge.html">Badge</a></li>
												<li><a href="alert.html">Alert</a></li>
												<li><a href="thumbnail.html">Thumbnail</a></li>
												<li><a href="overlay.html">Overlay</a></li>
												<li><a href="text.html">Text</a></li>
												<li><a href="column.html">Column</a></li>
												<li><a href="animation.html">Animation</a></li>
												<li><a href="contrast.html">Contrast</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-magic"></i> JavaScript</a>
											<ul className="uk-nav-sub">
												<li><a href="dropdown.html">Dropdown</a></li>
												<li><a href="modal.html">Modal</a></li>
												<li><a href="offcanvas.html">Off-canvas</a></li>
												<li><a href="switcher.html">Switcher</a></li>
												<li><a href="toggle.html">Toggle</a></li>
												<li><a href="scrollspy.html">Scrollspy</a></li>
												<li><a href="smooth-scroll.html">Smooth scroll</a></li>
											</ul>
										</li>
										<li className="uk-nav-header">Components</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-th-large"></i> Layout</a>
											<ul className="uk-nav-sub">
												<li><a href="grid-js.html">Dynamic Grid</a></li>
												<li><a href="grid-parallax.html">Parallax Grid</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-bars"></i> Navigations</a>
											<ul className="uk-nav-sub">
												<li><a href="dotnav.html">Dotnav</a></li>
												<li><a href="slidenav.html">Slidenav</a></li>
												<li><a href="pagination-js.html">Dynamic Pagination</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-folder-open"></i> Common</a>
											<ul className="uk-nav-sub">
												<li><a href="form-advanced.html">Form advanced</a></li>
												<li><a href="form-file.html">Form file</a></li>
												<li><a href="form-password.html">Form password</a></li>
												<li><a href="form-select.html">Form select</a></li>
												<li><a href="placeholder.html">Placeholder</a></li>
												<li><a href="progress.html">Progress</a></li>
											</ul>
										</li>
										<li className="uk-parent"><a href="#"><i className="uk-icon-magic"></i> JavaScript</a>
											<ul className="uk-nav-sub">
												<li><a href="lightbox.html">Lightbox</a></li>
												<li><a href="autocomplete.html">Autocomplete</a></li>
												<li><a href="datepicker.html">Datepicker</a></li>
												<li><a href="htmleditor.html">HTML editor</a></li>
												<li><a href="slider.html">Slider</a></li>
												<li><a href="slideset.html">Slideset</a></li>
												<li><a href="slideshow.html">Slideshow</a></li>
												<li><a href="parallax.html">Parallax</a></li>
												<li><a href="accordion.html">Accordion</a></li>
												<li><a href="notify.html">Notify</a></li>
												<li><a href="search.html">Search</a></li>
												<li><a href="nestable.html">Nestable</a></li>
												<li><a href="sortable.html">Sortable</a></li>
												<li><a href="sticky.html">Sticky</a></li>
												<li><a href="timepicker.html">Timepicker</a></li>
												<li><a href="tooltip.html">Tooltip</a></li>
												<li><a href="upload.html">Upload</a></li>
											</ul>
										</li>
										<li className="uk-nav-divider"></li>
										<li><a href="../showcase/index.html">Showcase</a></li>
										<li><a href="tutorials.html">Tutorials</a></li>
										<li><a href="uikit3.html">UIkit 3</a></li>
									</ul>

								</div>
							</div>
						</span>

					</If>

					<If when={!this.props.user} >

						<div className="uk-navbar-flip">
							<ul className="uk-navbar-nav">
								<li>
									<a href="/login"> LOGIN </a>
								</li>
								<li>
									<a href="/signup"> CREATE AN ACCOUNT </a>
								</li>
							</ul>
						</div>

					</If>

				</div>

			</nav>
		)
	}
});