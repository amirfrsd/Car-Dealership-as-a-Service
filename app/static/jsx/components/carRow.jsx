var React = require('react');

var CarRow = React.createClass({

	handleClick: function(id) {
		this.props.changePage('profile', id);
	},

	render: function() {
		return (
			<tr className="clickable" onClick={this.handleClick.bind(null, this.props.data.id)}>
				<td>{this.props.data.brand}</td>
				<td>{this.props.data.model}</td>
				<td>{this.props.data.license}</td>
				<td>{this.props.data.color}</td>
				<td>{this.props.data.mileage}</td>
				<td>{this.props.data.fuel}</td>
				<td>{this.props.data.year}</td>
				<td>{this.props.data.price}</td>
			</tr>
		);
	}

});

module.exports = CarRow;