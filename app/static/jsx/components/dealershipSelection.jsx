var React = require('react');

var DealershipSelection = React.createClass({

	render: function() {
		return (
			<option value={this.props.value}>{this.props.dealership.name}</option>
		);
	}

});

module.exports = DealershipSelection;