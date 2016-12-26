/**
 * Created by appian on 2016/12/20.
 */
import React from 'react';

var pageD = React.createClass({
	componentDidMount(){
		console.log(this.props);
	},
	
	render(){
		return (
			<div>
				<p>{this.props.params.nickname}  +  {this.props.params.username}</p>
			</div>
		)
	}
});

export default pageD;