var React =require('react');

var CreateDealership = React.createClass({

	getInitialState: function() {
		return {
			name: '',
			location: '',
			contact: '' 
		};
	},

	handleChange: function(type, e) {
		if(type == 'name')
			this.setState({
				name: e.target.value
			});
		else if(type == 'location')
			this.setState({
				location: e.target.value
			})
		else
			this.setState({
				contact: e.target.value
			})
	},

	createDealership: function(e) {
		e.preventDefault();
		
		let self = this;
		let serverRequest = $.ajax({
		  	url: '/api/v1/dealerships',
		  	type: 'POST',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	data: JSON.stringify({
		  		id: this.props.params.id,
		  		name: this.state.name,
		  		location: this.state.location,
		  		contact: this.state.contact
		  	}),
			success: function(data) {
				console.log(data);
				if(data.success){
					self.props.handleClick();
				}
			},
		});
	},

	render: function() {
		return (
			<div className="is-half">
				<h1 className="title" >Create dealership</h1>
				<form onSubmit={this.createDealership} >
					<div className="control is-grouped">
						<button className="button" type="submit">Create dealership</button>
						<button className="button" onClick={this.props.handleClick} >Back</button>
					</div>
					<div className="control is-horizontal">
						<div className="control-label">
						    <label className="label">Name</label>
						</div>
						<div className="control">
						    <input 
						    	className="input" 
						    	type="text" 
						    	value={this.state.name} 
						    	placeholder="Name"
						    	onChange={this.handleChange.bind(null, 'name')}
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
						    <label className="label">Contact</label>
						</div>
						<div className="control">
						    <input 
						    	className="input" 
						    	type="text" 
						    	value={this.state.contact}
						    	placeholder="Contact"
						    	onChange={this.handleChange.bind(null, 'contact')}
						    />
						</div>
					</div>
				</form>
			</div>
		);
	}

});

module.exports = CreateDealership;