var React = require('react');
var Header = require('../components/header.jsx');
var SearchList = require('../components/searchList.jsx');

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
			} 
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
		return (
			<div>
				<Header params={this.props.params} />
				<div className="columns">
					<div className="column is-8 is-offset-2 page">
						<div className="control is-horizontal">
							<div className="column">
								<label className="label">Brand</label>
								<p className="control">
								  	<input 
								  		className="input" 
								  		type="text"
								  		value={this.state.brand} 
								  		onChange={this.handleChange.bind(null, 'brand')}
								  		placeholder="Brand" />
								</p>
								<label className="label">Model</label>
								<p className="control">
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.model}
										onChange={this.handleChange.bind(null, 'model')}
								  		placeholder="Model" />
								</p>
							</div>
							<div className="column">
								<label className="label">Location</label>
								<p className="control">
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.location}
										onChange={this.handleChange.bind(null, 'location')}
								  		placeholder="Location" />
								</p>
								<label className="label">Fuel</label>
								<p className="control">
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.fuel}
										onChange={this.handleChange.bind(null, 'fuel')}
								  		placeholder="Fuel" />
								</p>
							</div>
							<div className="column">
								<label className="label">Price</label>
								<p className="control">
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.priceLow}
										onChange={this.handleChange.bind(null, 'priceLow')}
								  		placeholder="min" />
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.priceHigh}
										onChange={this.handleChange.bind(null, 'priceHigh')}
								  		placeholder="max" />
								</p>
							</div>
							<div className="column">
								<label className="label">Kilometers</label>
								<p className="control">
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.mileageLow}
										onChange={this.handleChange.bind(null, 'mileageLow')}
								  		placeholder="min" />
								  	<input 
								  		className="input" 
								  		type="text" 
										value={this.state.mileageHigh}
										onChange={this.handleChange.bind(null, 'mileageHigh')}
								  		placeholder="max" />
								</p>
							</div>
						</div>
						<SearchList data={this.state} />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = SearchPage;