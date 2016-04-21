var React = require('react');
var Header = require('../components/header.jsx');
var SearchList = require('../components/searchList.jsx');
var SearchQueries = require('../components/searchQueries.jsx');
var CarProfile = require('../components/carProfile.jsx');

var SearchPage = React.createClass({

	getInitialState: function() {
		return {
			location: '',
			brand: '',
			model: '',
			priceLow: null,
			priceHigh: null,
			mileageLow: null,
			mileageHigh: null,
			fuel: '',
			carsData: {
				cars: []
			},
			pageType: 'list',
			carID: null
		};
	},

	componentWillMount: function() {
		let self = this;
		
		let serverRequest = $.ajax({
			url: '/api/v1/cars',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			
			success: function(data) {
				
				if(data.success){
					self.setState({
						carsData: data
					});
				}
			}
		});
	},

	changePageType: function(newPage, id) {
		if(newPage == 'profile'){
			this.setState({
				pageType: newPage,
				carID: id
			});
		}
		else{
			this.setState({
				pageType: newPage,
				carID: null
			});
		}
	},

	handleChange: function(type, e) {
		if(type == 'brand')
			this.setState({
				brand: e.target.value
			});
		else if(type == 'model')
			this.setState({
				model: e.target.value
			});
		else if(type == 'mileageLow')
			this.setState({
				mileageLow: e.target.value
			});
		else if(type == 'mileageHigh')
			this.setState({
				mileageHigh: e.target.value
			});
		else if(type == 'fuel')
			this.setState({
				fuel: e.target.value
			});
		else if(type == 'priceLow')
			this.setState({
				priceLow: e.target.value
			});
		else if(type == 'priceHigh')
			this.setState({
				priceHigh: e.target.value
			});
		else if(type == 'location')
			this.setState({
				location: e.target.value
			});
	},

	render: function() {
		let queries = {
			location: this.state.location,
			brand: this.state.brand,
			model: this.state.model,
			priceLow: this.state.priceLow,
			priceHigh: this.state.priceHigh,
			mileageLow: this.state.mileageLow,
			mileageHigh: this.state.mileageHigh,
			fuel: this.state.fuel
		};

		let page;
		if(this.state.pageType == 'profile'){
			page = 	<div className="column is-8 is-offset-2 page">
						<CarProfile changePage={this.changePageType} car={this.state.carsData.cars[this.state.carID]} params={this.props.params} fromSearch={true} />
					</div>
		}
		else{
			page = 	<div className="column is-8 is-offset-2 page">
						<SearchQueries queries={queries} handleChange={this.handleChange} />
						<SearchList data={this.state} changePage={this.changePageType}/>
					</div>
		}

		return (
			<div>
				<Header params={this.props.params} />
				<div className="columns">
					{page}
				</div>
			</div>
		);
	}

});

module.exports = SearchPage;