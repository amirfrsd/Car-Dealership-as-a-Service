var React = require('react');
var SearchRow = require('./searchRow.jsx');

var SeachList = React.createClass({

	matchSearch: function(car) {
		
		if(!car.brand.toLowerCase().includes(this.props.data.brand.toLowerCase()))
			return false;
		if(!car.model.toLowerCase().includes(this.props.data.model.toLowerCase()))
			return false;
		if(!car.location.toLowerCase().includes(this.props.data.location.toLowerCase()))
			return false;
		if(!car.fuel.toLowerCase().includes(this.props.data.fuel.toLowerCase()))
			return false;
		if(this.props.data.priceLow && car.price < this.props.data.priceLow)	
			return false;
		if(this.props.data.priceHigh && car.price > this.props.data.priceHigh)
			return false;
		if(this.props.data.mileageLow && car.mileage < this.props.data.mileageLow)	
			return false;
		if(this.props.data.mileageHigh && car.mileage > this.props.data.mileageHigh)
			return false;
			
		return true;
	},

	render: function() {
		let self = this;

		return (
			<div>
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
						{this.props.data.carsData.cars.map(function(car){
							if(self.matchSearch(car))
								return <SearchRow key={car.id} data={car} />
						})}
					</tbody>
				</table>
			</div>
		);
	}

});

module.exports = SeachList;