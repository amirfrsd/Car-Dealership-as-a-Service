var React = require('react');

var DealershipRow = React.createClass({

	render: function() {
		return (
			<tr>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.location}</td>
				<td>{this.props.data.contact}</td>
			</tr>
		);
	}

});

module.exports = DealershipRow;