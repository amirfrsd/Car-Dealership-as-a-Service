var React = require('react');

var CarList = React.createClass({
	
	getInitialState: function() {
		return {
			data: {
				'cars': []
			},
			orderBy: 'name'
		};
	},

	render: function() {
		return (
			<div>
				<div className="control is-grouped">
					<button className="button" onClick={this.props.changePage.bind(null, 'create')} >Add new car</button>
				</div>
				<label>Order by</label>
				<div className="control">
					<span className="select">
					    <select value={this.state.orderBy} onChange="">
					      	<option value="name">Name</option>
					      	<option value="location">Location</option>
					    </select>
					</span>
				</div>
				<table className="table is-striped page">
					<thead>
						<tr>
							<th>Name</th>
							<th>Location</th>
							<th>Contact</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = CarList;