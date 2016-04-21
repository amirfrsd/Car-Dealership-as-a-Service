var React = require('react');

var SearchRow = React.createClass({

	render: function() {
		return (
			<tr className="clickable" onClick={this.props.changePage.bind(null, 'profile', this.props.index)} >
				<td>{this.props.data.brand}</td>
				<td>{this.props.data.model}</td>
				<td>{this.props.data.license}</td>
				<td>{this.props.data.color}</td>
				<td>{this.props.data.mileage}</td>
				<td>{this.props.data.fuel}</td>
				<td>{this.props.data.year}</td>
				<td>{this.props.data.location}</td>
				<td>{this.props.data.price}</td>
			</tr>
		);
	}

});

module.exports = SearchRow;