var React = require('react');

var CarProfile = React.createClass({

	render: function() {
		return (
			<div>
				<h1 className="title">{this.props.car.name}</h1>
				<div className="control is-grouped">
					<button className="button" onClick={this.props.changePage.bind(null, 'edit')}>Edit Car</button>
					<button className="button" onClick={this.props.changePage.bind(null, 'list')}>Back</button>
				</div>
				<p><strong>Brand</strong><span className="profile-info"> {this.props.car.brand}</span></p>
				<p><strong>Model</strong><span className="profile-info"> {this.props.car.model}</span></p>
				<p><strong>License</strong><span className="profile-info"> {this.props.car.license}</span></p>
				<p><strong>Color</strong><span className="profile-info"> {this.props.car.color}</span></p>
				<p><strong>Mileage</strong><span className="profile-info"> {this.props.car.mileage}</span></p>
				<p><strong>Fuel</strong><span className="profile-info"> {this.props.car.fuel}</span></p>
				<p><strong>Year</strong><span className="profile-info"> {this.props.car.year}</span></p>
				<p><strong>Price</strong><span className="profile-info"> {this.props.car.price}</span></p>
			</div>
		);
	}

});

module.exports = CarProfile;