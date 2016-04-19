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
			carData: {} 
		};
	},

	render: function() {
		let page;
			
		if(this.state.pageType == 'create'){
			page = <CreateCar  />
		}
		else if(this.state.pageType == 'profile'){
			page = <CarProfile  />
		}
		else if(this.state.pageType == 'edit'){
			page = <EditCar />
		}
		else{
			page = <CarList />
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