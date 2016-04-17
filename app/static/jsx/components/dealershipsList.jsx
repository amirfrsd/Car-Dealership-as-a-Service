var React = require('react');
var DealershipRow = require('./dealershipRow.jsx');

var DealershipsList = React.createClass({

	getInitialState: function() {
		return {
			data: {
				'dealerships': []
			},
		};
	},

	componentWillMount: function() {
		let self = this;
		let serverRequest = $.ajax({
			url: '/api/v1/owner/'+this.props.params.id+'/dealerships',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
				if(data.success){
					self.setState({
						data: data
					});
				}
			}
		});
	},

	render: function() {
		return (
			<div>
				<button className="button" onClick={this.props.handleClick} >Create new dealership</button>
				{this.state.data.success ? 
				<table className="table is-striped page">
					<thead>
						<tr>
							<th>Name</th>
							<th>Location</th>
							<th>Contact</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.dealerships.map(function(dealership){
							return <DealershipRow key={dealership.id} data={dealership} />
						})}
					</tbody>
				</table>
				:
				<div className="notification is-danger">An error ocurred while displaying the list of dealerships. Please try again later</div>
				}
			</div>
		);
	}

});

module.exports = DealershipsList;