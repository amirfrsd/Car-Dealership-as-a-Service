var React = require('react');
var Header = require('../components/header.jsx');

var SearchPage = React.createClass({

	render: function() {
		return (
			<Header params={this.props.params} />
		);
	}

});

module.exports = SearchPage;