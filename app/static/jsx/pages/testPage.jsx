import React from 'react';

var TestPage = React.createClass({

	render: function() {
		
		return (
			<div>
				<h1 className="title is-1">{this.props.params.type}</h1>
				<h1 className="title is-1">{this.props.params.id}</h1>
			</div>
		);
	}

});

module.exports = TestPage;