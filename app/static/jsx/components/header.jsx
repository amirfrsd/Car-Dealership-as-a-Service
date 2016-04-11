import React from 'react';
import {Link} from 'react-router';

var Header = React.createClass({

	render: function() {
		
		return (
			<header className="header">
				<div className="container">
					<div className="header-left">
						<a href={'/'+this.props.params.type+'/'+this.props.params.id} className="header-item">
							<img src="static/img/logo.png" alt="Logo"></img>
						</a>

						<Link 
							to={'/'+this.props.params.type+'/'+this.props.params.id} 
							className="header-tab" 
							activeClassName="is-active"
							>Profile
						</Link>

						{this.props.params.type == 'client'? 
							<Link 
								to={'/'+this.props.params.type+'/'+this.props.params.id+'/search'} 
								className="header-tab" 
								activeClassName="is-active"
								>Search
							</Link>
							:
							<Link 
								to={'/'+this.props.params.type+'/'+this.props.params.id+'/search'} 
								className="header-tab"
								activeClassName="is-active"
								>Something
							</Link>
						}
					</div>
				</div>
			</header>
		);
	}

});

module.exports = Header;