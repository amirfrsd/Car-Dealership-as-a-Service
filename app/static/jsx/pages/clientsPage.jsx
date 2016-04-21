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
			page = <ClientProfile changePage={this.changePageType} data={this.state.clientData} />
		}
		else{
			page = <ClientList changePage={this.changePageType} />
		}

		return (
			<div>
				<Header params={this.state.params}/>
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