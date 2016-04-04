import React from 'react';
import ReactDOM from 'react-dom';

var LandingTitle = React.createClass({

	render: function() {
		return (
			<div className="column">
				<div className="front">
					<h1 className="title is-1">
						Car Dealership
					</h1>
					<hr/>
					<h2 className="subtitle is-2">
						as a service
					</h2>
				</div>
			</div>
		);
	}
});

module.exports = LandingTitle;