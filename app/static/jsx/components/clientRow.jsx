var React = require('react');

var ClientRow = React.createClass({

	handleClick: function(id) {
		this.props.changePage('profile', id);
	},

	render: function() {
		return (
			<tr className="clickable" onClick={this.handleClick.bind(null, this.props.data.id)}>
				<td>{this.props.data.name}</td>
				<td>{this.props.data.email}</td>
				<td>{this.props.data.contact}</td>
			</tr>
		);
	}

});

module.exports = ClientRow;