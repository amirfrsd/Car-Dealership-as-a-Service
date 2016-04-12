import React from 'react';
import Header from '../components/header.jsx';

var CarsPage = React.createClass({

	getInitialState: function() {
		return {
			params: {
				type: 'owner',
				id: this.props.params.id
			} 
		};
	},

	render: function() {
		return (
			<Header params={this.state.params} />
		);
	}

});

module.exports = CarsPage;