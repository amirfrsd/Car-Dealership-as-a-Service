var React = require('react');
var Header = require('../components/header.jsx');
var CreateDealership = require('../components/createDealership.jsx');
var DealershipsList = require('../components/dealershipsList.jsx');
var DealershipProfile = require('../components/dealershipProfile.jsx');
var EditDealership = require('../components/editDealership.jsx');
var {browserHistory} = require('react-router');

var DealershipsPage = React.createClass({

	getInitialState: function() {
		return {
			params: {
				type: 'owner',
				id: this.props.params.id
			},
			pageType: 'list',
			dealershipData: {}
		};
	},

	getDealership: function(id) {
		let self = this;
		let serverRequest = $.ajax({
			url: '/api/v1/dealership/'+id,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
				xhr.setRequestHeader('owner_id', self.props.params.id);
			},
			success: function(data) {
				
				if(data.success){
					self.setState({
						dealershipData: data
					});
				}
				else if(data.unauthorized){
					browserHistory.push('/');
				}
			}
		});
	},

	changePageType: function(newPage, id) {
		if(newPage == 'profile'){
			if(this.state.pageType != 'edit')
				this.getDealership(id);

			this.setState({
				pageType: newPage,
			});
		}
		else if(newPage == 'edit'){
			this.setState({
				pageType: newPage
			});
		}
		else{
			this.setState({
				pageType: newPage,
				dealershipData: {}
			});
		}
	},

	render: function() {
		let page;
			
		if(this.state.pageType == 'create'){
			page = <CreateDealership changePage={this.changePageType} params={this.props.params} />
		}
		else if(this.state.pageType == 'profile'){
			page = <DealershipProfile changePage={this.changePageType} dealership={this.state.dealershipData} params={this.props.params} />
		}
		else if(this.state.pageType == 'edit'){
			page = <EditDealership changePage={this.changePageType} refreshInfo={this.getDealership} dealership={this.state.dealershipData} params={this.props.params} />
		}
		else{
			page = <DealershipsList changePage={this.changePageType} params={this.props.params} />
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

module.exports = DealershipsPage;