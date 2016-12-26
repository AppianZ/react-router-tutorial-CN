/**
 * Created by appian on 2016/12/20.
 */
import React from 'react'
import { IndexLink, Link } from 'react-router'

export default React.createClass({
	getInitialState() {
		return {
			tabTxt: [{
				path: '/pagea',
				name: 'A'
			},{
				path: '/pageb',
				name: 'B'
			},{
				path: '/pagec',
				name: 'C'
			}],
		}
	},
	
	initSpan(obj, idx){
		return(
			<span className="tab" key={idx}>
				<Link to={`${obj.path}`} activeClassName="on">{obj.name}</Link>
			</span>
		)
	},
	
	render() {
		return (
			<div id="content">
				<div id="navBox">
					<span className="tab">
						<IndexLink to="/" activeClassName="on">pageA</IndexLink>
					</span>
					<span className="tab">
						<Link to="/pageb" activeClassName="on">pageB</Link>
					</span>
					<span className="tab">
						<Link to="/pagec" activeClassName="on">pageC</Link>
					</span>
				</div>
				{this.props.children}
			</div>
		)
	}
})