var React = require('react');
var Header = require('../components/header.jsx');
var ClientProfile = require('../components/clientProfile.jsx');
var ClientList = require('../components/clientList.jsx');

var ClientsPage = React.createClass({

	getInitialState: function() {
		return {
			params: {
				type: 'owner',
				id: this.props.params.id
			},
			clientData: {},
			pageType: 'list' 
		};
	},

	changePageType: function(newPage, id) {
		if(newPage == 'profile'){
			this.getClient(id);
			this.setState({
				pageType: newPage,
			});
		}
		else{
			this.setState({
				pageType: newPage
			});
		}
	},

	getClient: function(id) {
		let self = this;
		let serverRequest = $.ajax({
			url: '/api/v1/client/'+id,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
				xhr.setRequestHeader('id', self.props.params.id);
				xhr.setRequestHeader('from', 'clients');
			},
			success: function(data) {

				if(data.success){
					self.setState({
						clientData: data
					});
				}
			}
		});
	},

	render: function() {
		let page;
			
		if(this.state.pageType == 'profile'){
			page = <ClientProfile changePage={this.changePageType} data={this.state.clientData} params={this.props.params} />
		}
		else{
			page = <ClientList changePage={this.changePageType} params={this.props.params} />
		}
		
		let token = window.location.search.substring(1).split('=')[1];

		return (
			<div>
				<Header params={this.state.params} token={token} />
				<div className="columns">
					<div className="column is-8 is-offset-2 page">
						{page}
					</div>
				</div>
			</div>
		);
	}

});

module.exports = ClientsPage;