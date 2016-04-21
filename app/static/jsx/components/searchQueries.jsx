var React = require('react');

var SearchQueries = React.createClass({

	render: function() {
		return (
			<div>
				<div className="control is-horizontal">
					<div className="column">
						<label className="label">Brand</label>
						<p className="control">
						  	<input 
						  		className="input" 
						  		type="text"
						  		value={this.props.queries.brand} 
						  		onChange={this.props.handleChange.bind(null, 'brand')}
						  		placeholder="Brand" />
						</p>
						<label className="label">Model</label>
						<p className="control">
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.model}
								onChange={this.props.handleChange.bind(null, 'model')}
						  		placeholder="Model" />
						</p>
					</div>
					<div className="column">
						<label className="label">Location</label>
						<p className="control">
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.location}
								onChange={this.props.handleChange.bind(null, 'location')}
						  		placeholder="Location" />
						</p>
						<label className="label">Fuel</label>
						<p className="control">
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.fuel}
								onChange={this.props.handleChange.bind(null, 'fuel')}
						  		placeholder="Fuel" />
						</p>
					</div>
					<div className="column">
						<label className="label">Price</label>
						<p className="control">
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.priceLow}
								onChange={this.props.handleChange.bind(null, 'priceLow')}
						  		placeholder="min" />
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.priceHigh}
								onChange={this.props.handleChange.bind(null, 'priceHigh')}
						  		placeholder="max" />
						</p>
					</div>
					<div className="column">
						<label className="label">Kilometers</label>
						<p className="control">
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.mileageLow}
								onChange={this.props.handleChange.bind(null, 'mileageLow')}
						  		placeholder="min" />
						  	<input 
						  		className="input" 
						  		type="text" 
								value={this.props.queries.mileageHigh}
								onChange={this.props.handleChange.bind(null, 'mileageHigh')}
						  		placeholder="max" />
						</p>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = SearchQueries;