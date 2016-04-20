var React = require('react');

var CarTag = React.createClass({

	render: function() {
		return (
			<span className="tag is-success tags">{this.props.dealership.name}</span>
		);
	}

});

module.exports = CarTag;