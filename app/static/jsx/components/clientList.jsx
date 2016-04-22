var React = require('react');
var ClientRow = require('./clientRow.jsx');
var {browserHistory} = require('react-router');

var ClientList = React.createClass({

	getInitialState: function() {
		return {
			data: {
				clients: []
			},
			orderBy: 'name' 
		};
	},

	componentWillMount: function() {
		this.getClientList();
	},

	handleChange: function(e) {
		this.setState({
			data: {
				'clients': this.state.data.clients.sort(this.sortData(e.target.value))
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
			return (a.email > b.email) - (a.email < b.email)
		}
	},

	getClientList: function() {
		let self = this;
		
		let serverRequest = $.ajax({
			url: '/api/v1/clients',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
				xhr.setRequestHeader('owner_id', self.props.params.id);
			},
			success: function(data) {
				if(data.success){
					data.clients.sort(self.sortData('name'));
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

	render: function() {
		let self = this;

		return (
			<div>
				<label>Order by</label>
				<div className="control">
					<span className="select">
					    <select value={this.state.orderBy} onChange={this.handleChange}>
					      	<option value="name">Name</option>
					      	<option value="email">Email</option>
					    </select>
					</span>
				</div>
				<table className="table is-striped page">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Contact</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.clients.map(function(client){
							return <ClientRow key={client.id} data={client} changePage={self.props.changePage} />
						})}
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = ClientList;