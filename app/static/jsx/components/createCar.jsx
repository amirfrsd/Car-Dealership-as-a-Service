var React = require('react');
var CarTag = require('./carTag.jsx');
var DealershipSelection = require('./dealershipSelection.jsx');

var CreateCar = React.createClass({
	
	getInitialState: function() {
		return {
			brand: '',
			model: '',
			license: '',
			color: '',
			mileage: '',
			fuel: '',
			price: '',
			location: '',
			year: '',
			dealerships: [],
			myDealerships: [],
			selected: 0
		};
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
		else if(type == 'license')
			this.setState({
				license: e.target.value
			});
		else if(type == 'color')
			this.setState({
				color: e.target.value
			});
		else if(type == 'mileage')
			this.setState({
				mileage: e.target.value
			});
		else if(type == 'fuel')
			this.setState({
				fuel: e.target.value
			});
		else if(type == 'price')
			this.setState({
				price: e.target.value
			});
		else if(type == 'location')
			this.setState({
				location: e.target.value
			});
		else if(type == 'year')
			this.setState({
				year: e.target.value
			});
		else{
			this.setState({
				selected: e.target.value
			});
		}
	},

	addCar: function(e) {
		e.preventDefault();
		let self = this;
		
		let dealershipList = [];
		this.state.myDealerships.map(function(dealership){
			dealershipList.push(dealership.id);
		});	

		let serverRequest = $.ajax({
		  	url: '/api/v1/cars',
		  	type: 'POST',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	data: JSON.stringify({
		  		owner_id: this.props.params.id,
		  		brand: this.state.brand,
				model: this.state.model,
				license: this.state.license,
				color: this.state.color,
				mileage: this.state.mileage,
				fuel: this.state.fuel,
				price: this.state.price,
				location: this.state.location,
				year: this.state.year,
				dealerships: dealershipList

		  	}),
			success: function(data) {
				if(data.success){
					self.props.changePage('list');
				}
			},
		});
	},

	componentWillMount: function() {
		let self = this;
		
		let serverRequest = $.ajax({
			url: '/api/v1/dealerships',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
				if(data.success){
					self.setState({
						dealerships: data.dealerships,
					});
				}
			}
		});
	},

	addDealership: function() {
		
		let myArray = this.state.myDealerships;
		let allArray = this.state.dealerships;

		myArray.push(this.state.dealerships[this.state.selected]);
		allArray.splice(this.state.selected, 1);
		
		this.setState({
			myDealerships: myArray,
			dealerships: allArray,
			selected: 0
		});	
	},

	deleteDealership: function(index) {

		let myArray = this.state.myDealerships;
		let allArray = this.state.dealerships;

		allArray.push(myArray[index]);
		myArray.splice(index, 1);

		this.setState({
			myDealerships: myArray,
			dealerships: allArray.sort(this.sortData())
		});
	},

	sortData: function() {
		return function(a, b){
			return (a.name > b.name) - (a.name < b.name)
		}
	},

	render: function() {
		let self = this;

		return (
			<div className="is-half">
				<h1 className="title" >Add car</h1>
				<div className="control is-grouped">
					<button className="button" onClick={this.addCar} >Add car</button>
					<button className="button" onClick={this.props.changePage.bind(null, 'list')} >Back</button>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Brand</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.brand} 
					    	placeholder="Name"
					    	onChange={this.handleChange.bind(null, 'brand')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Model</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.model}
					    	placeholder="Model"
					    	onChange={this.handleChange.bind(null, 'model')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">License</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.license}
					    	placeholder="License"
					    	onChange={this.handleChange.bind(null, 'license')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Color</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.color}
					    	placeholder="Color"
					    	onChange={this.handleChange.bind(null, 'color')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Kilometers</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.mileage}
					    	placeholder="Kilometers"
					    	onChange={this.handleChange.bind(null, 'mileage')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Fuel</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.fuel}
					    	placeholder="Fuel"
					    	onChange={this.handleChange.bind(null, 'fuel')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Year</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.year}
					    	placeholder="Year"
					    	onChange={this.handleChange.bind(null, 'year')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Location</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.location}
					    	placeholder="Location"
					    	onChange={this.handleChange.bind(null, 'location')}
					    />
					</div>
				</div>
				<div className="control is-horizontal">
					<div className="control-label">
					    <label className="label">Price (€)</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="text" 
					    	value={this.state.price}
					    	placeholder="Price"
					    	onChange={this.handleChange.bind(null, 'price')}
					    />
					</div>
				</div>
				<p><strong>Dealerships</strong>
					{this.state.myDealerships.map(function(dealership, index){
						return <CarTag key={dealership.id} index={index} deleteDealership={self.deleteDealership} dealership={dealership} delete={true}/>
					})}
				</p>
				<div className="control is-horizontal">
				 	<div className="control-label">
				    	<label className="label">Available Dealerships</label>
				  	</div>
				  	<div className="control is-grouped">
				    	<div className="select">
				      		<select value={this.state.selected} onChange={this.handleChange.bind(null, 'selected')}>
								{this.state.dealerships.map(function(dealership, index){
									return <DealershipSelection key={dealership.id} value={index} dealership={dealership} />
								})}
				    		</select>
				    	</div>
				    	{this.state.dealerships.length > 0 ?
							<button className="button" onClick={this.addDealership} >Add to dealership list</button>
						:
							<div />
				    	}
				    	
				  	</div>
				</div>
			</div>
		);
	}

});

module.exports = CreateCar;