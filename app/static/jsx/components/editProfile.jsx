import React from 'react';
import {browserHistory} from 'react-router';

var EditProfile = React.createClass({

	getInitialState: function() {
		return {
			name: this.props.data.name,
			email: this.props.data.email,
			contact: this.props.data.contact
		};
	},

	handleChange: function(type, e){
		if(type == 'name')
			this.setState({
				name: e.target.value
			});
		else if(type == 'email')
			this.setState({
				email: e.target.value
			});
		else{
			this.setState({
				contact: e.target.value 
			});
		}
		
	},

	saveChanges: function(){
		let self = this;
		let serverRequest = $.ajax({
		  	url: '/api/v1/'+this.props.params.type+'/'+this.props.params.id,
		  	type: 'PUT',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	data: JSON.stringify({
		  		name: this.state.name,
		  		email: this.state.email,
		  		contact: this.state.contact,
		  	}),
			success: function(data) {
				if(data.success){
					self.props.refreshInfo();
					self.props.isEdit();
				}
			},
		});
	},

	render: function() {
		return (
			<div className="column is-4 is-offset-2 page">
				<h1 className="title">My Profile</h1>
				<div className="control is-grouped">
					<button className="button" onClick={this.saveChanges}>Save Changes</button>
					<button className="button" onClick={this.props.isEdit}>Back</button>
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
					    <label className="label">Email</label>
					</div>
					<div className="control">
					    <input 
					    	className="input" 
					    	type="email" 
					    	value={this.state.email} 
					    	placeholder="Email"
					    	onChange={this.handleChange.bind(null, 'email')}
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
			</div>
		);
	}

});

module.exports = EditProfile;