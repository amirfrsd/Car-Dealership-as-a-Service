import React from 'react';
import Header from '../components/header.jsx';

var SearchPage = React.createClass({

	render: function() {
		return (
			<Header params={this.props.params} />
		);
	}

});

module.exports = SearchPage;