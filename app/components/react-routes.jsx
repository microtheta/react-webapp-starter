import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import BaseLayout from './shared/base-layout';
import PreLogin from './shared/pre-login';
import PostLogin from './shared/post-login';

import LoginPage from './user/login';
import SignUpPage from './user/signup';
import Greed from './greed/greed';


import React from 'react';

module.exports = (
	<Router history={browserHistory}>
		<Route path='/' component={BaseLayout}>
			
			<Route component={PostLogin}>
				<IndexRoute component={Greed}></IndexRoute>
			</Route>
			
			<Route component={PreLogin}>
				<Route path='/login' component={LoginPage} />
				<Route path='/signup' component={SignUpPage} />
			</Route>
			
		</Route>
	</Router>
);