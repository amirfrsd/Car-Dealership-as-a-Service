var React = require('react');
var CarRow = require('./carRow.jsx');

var CarList = React.createClass({
	
	getInitialState: function() {
		return {
			data: {
				'cars': []
			},
			orderBy: 'brand'
		};
	},

	componentWillMount: function() {
		this.getCarList();
	},

	handleChange: function(e) {
		this.setState({
			data: {
				'cars': this.state.data.cars.sort(this.sortData(e.target.value))
			},
			orderBy: e.target.value
		});
	},

	sortData: function(field) {
		if(field == 'brand')
			return function(a, b){
				return (a.brand > b.brand) - (a.brand < b.brand)
			}
		else if(field == 'model')
			return function(a, b){
				return (a.model > b.model) - (a.model < b.model)
			}
		else if(field == 'color')
			return function(a, b){
				return (a.color > b.color) - (a.color < b.color)
			}
		else if(field == 'mileage')
			return function(a, b){
				return (a.mileage - b.mileage)
			}
		else if(field == 'fuel')
			return function(a, b){
				return (a.fuel > b.fuel) - (a.fuel < b.fuel)
			}
		else if(field == 'price')
			return function(a, b){
				return (a.price - b.price)
			}
		else if(field == 'location')
			return function(a, b){
				return (a.location > b.location) - (a.location < b.location)
			}

		return function(a, b){
			return (b.year - a.year)
		}
	},

	getCarList: function() {
		let self = this;
		
		let serverRequest = $.ajax({
			url: '/api/v1/owner/'+this.props.params.id+'/cars',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
				if(data.success){
					data.cars.sort(self.sortData('brand'));
					self.setState({
						data: data
					});
				}
			}
		});
	},

	render: function() {
		let self = this;

		return (
			<div>
				<div className="control is-grouped">
					<button className="button" onClick={this.props.changePage.bind(null, 'create')} >Add new car</button>
				</div>
				<label>Order by</label>
				<div className="control">
					<span className="select">
					    <select value={this.state.orderBy} onChange={this.handleChange}>
					      	<option value="brand">Brand</option>
					      	<option value="model">Model</option>
					      	<option value="color">Color</option>
					      	<option value="mileage">Kilometers</option>
					      	<option value="fuel">Fuel</option>
					      	<option value="location">Location</option>
					      	<option value="price">Price</option>
					      	<option value="year">Year</option>
					    </select>
					</span>
				</div>
				<table className="table is-striped page">
					<thead>
						<tr>
							<th>Brand</th>
							<th>Model</th>
							<th>License</th>
							<th>Color</th>
							<th>Kilometers</th>
							<th>Fuel</th>
							<th>Year</th>
							<th>Location</th>
							<th>Price (€)</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.cars.map(function(car){
							return <CarRow key={car.id} data={car} changePage={self.props.changePage} params={self.props.params} />
						})}
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = CarList;