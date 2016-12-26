/**
 * Created by appian on 2016/12/20.
 */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Tab from './tab';
import pageA from './page_a';
import pageB from './page_b';
import pageC from './page_c';
import pageD from './page_d';
 
const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Tab}>
			<IndexRoute component={pageA}/>
			<Route path="/pageb" component={pageB}/>
			<Route path="/pagec" component={pageC}>
				<Route path="/pagec/:username/:nickname" component={pageD}/>
			</Route>
		</Route>
	</Router>
	, app);