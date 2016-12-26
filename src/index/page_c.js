/**
 * Created by appian on 2016/12/14.
 */
import React from 'react';
import { Link } from 'react-router';

var PageC = React.createClass({
	render: function(){
		return (
			<article className="page">
				<Link to='/pagec/appian/zhang'>user/name</Link>
				{this.props.children}
			</article>
		)
	}
});

export default PageC;