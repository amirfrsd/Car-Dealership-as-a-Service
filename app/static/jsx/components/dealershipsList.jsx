var React = require('react');
var DealershipRow = require('./dealershipRow.jsx');
var {browserHistory} = require('react-router');

var DealershipsList = React.createClass({

	getInitialState: function() {
		return {
			data: {
				'dealerships': []
			},
			myDealerships: true,
			orderBy: 'name'
		};
	},

	changeDealerhips: function(newState) {
		if(newState != this.state.myDealerships){
			this.getDealershipList(newState);
		}

		this.setState({
			myDealerships: newState
		});

	},

	handleChange: function(e) {
		this.setState({
			data: {
				'dealerships': this.state.data.dealerships.sort(this.sortData(e.target.value))
			},
			orderBy: e.target.value
		});
	},

	sortData: function(field) {
		if(field == 'name')
			return function(a, b){
				return (a.name > b.name) - (a.name < b.name)
			}

		return function(a, b){
			return (a.location > b.location) - (a.location < b.location)
		}
	},

	getDealershipList: function(myDealerships) {
		let self = this;
		let url = myDealerships ? '/api/v1/owner/'+this.props.params.id+'/dealerships' : '/api/v1/dealerships';
		
		let serverRequest = $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
				xhr.setRequestHeader('owner_id', self.props.params.id);
			},
			success: function(data) {
				if(data.success){
					data.dealerships.sort(self.sortData('name'));
					self.setState({
						data: data
					});
				}
				else if(data.unauthorized){
					browserHistory.push('/');
				}
			}
		});
	},

	componentDidMount: function() {
		this.getDealershipList(true);
	},

	render: function() {
		let self = this;

		return (
			<div>
				<div className="control is-grouped">
					<button className="button" onClick={this.props.changePage.bind(null, 'create')} >Create new dealership</button>
					<div className="control has-addons">
					
					<button 
						className={this.state.myDealerships ? "button is-primary" : "button"} 
						onClick={this.changeDealerhips.bind(null, true)}>
						My dealerships
					</button>
					<button 
						className={!this.state.myDealerships ? "button is-primary" : "button"} 
						onClick={this.changeDealerhips.bind(null, false)}>
						All Dealerships
					</button>
					</div>
				</div>
				<label>Order by</label>
				<div className="control">
					<span className="select">
					    <select value={this.state.orderBy} onChange={this.handleChange}>
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
						{this.state.data.dealerships.map(function(dealership){
							return <DealershipRow key={dealership.id} data={dealership} changePage={self.props.changePage} params={self.props.params} />
						})}
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = DealershipsList;