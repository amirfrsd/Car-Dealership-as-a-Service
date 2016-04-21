var React = require('react');
var Header = require('../components/header.jsx');
var CreateCar = require('../components/createCar.jsx');
var CarList = require('../components/carList.jsx');
var CarProfile = require('../components/carProfile.jsx');
var EditCar = require('../components/editCar.jsx');

var CarPage = React.createClass({

	getInitialState: function() {
		return {
			params: {
				type: 'owner',
				id: this.props.params.id
			},
			pageType: 'list',
			carData: {
				dealerships: []
			} 
		};
	},

	getCar: function(id) {
		let self = this;
		let serverRequest = $.ajax({
			url: '/api/v1/car/'+id,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			
			success: function(data) {
				if(data.success){
					self.setState({
						carData: data
					});
				}
			}
		});
	},

	changePageType: function(newPage, id) {
		if(newPage == 'profile'){
			if(this.state.pageType != 'edit')
				this.getCar(id);

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
				carData: {
					dealerships:[]
				}
			});
		}
	},

	render: function() {
		let page;
			
		if(this.state.pageType == 'create'){
			page = <CreateCar changePage={this.changePageType} params={this.props.params} />
		}
		else if(this.state.pageType == 'profile'){
			page = <CarProfile changePage={this.changePageType} car={this.state.carData} params={this.props.params} />
		}
		else if(this.state.pageType == 'edit'){
			page = <EditCar changePage={this.changePageType} refreshInfo={this.getCar} car={this.state.carData} params={this.props.params} />
		}
		else{
			page = <CarList changePage={this.changePageType} params={this.props.params} />
		}

		return (
			<div>
				<Header params={this.state.params} />
				<div className="columns">
					<div className="column is-8 is-offset-2 page">
						{page}
					</div>
				</div>
			</div>
		);
	}

});

module.exports = CarPage;