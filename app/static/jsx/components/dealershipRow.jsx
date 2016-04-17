var React = require('react');

var DealershipRow = React.createClass({

	handleClick: function(id) {
		console.log(id);
	},

	render: function() {
		return (
			<tr className="clickable" onClick={this.handleClick.bind(null, this.props.data.id)}>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.location}</td>
				<td>{this.props.data.contact}</td>
			</tr>
		);
	}

});

module.exports = DealershipRow;