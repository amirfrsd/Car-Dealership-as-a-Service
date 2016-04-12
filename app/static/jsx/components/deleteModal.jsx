import React from 'react';
import {browserHistory} from 'react-router';

var DeleteModal = React.createClass({

	getInitialState: function() {
		return {
			password: ''
		};
	},

	handleChange: function(e) {
		this.setState({
			password: e.target.value
		});
	},

	deleteAccount: function(e) {
		e.preventDefault();

		let serverRequest = $.ajax({
		  	url: '/api/v1/'+this.props.params.type+'/'+this.props.params.id,
		  	type: 'DELETE',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	data: JSON.stringify({
		  		password: this.state.password
		  	}),
			success: function(data) {
				if(data.success){
					browserHistory.push('/');
				}
			},
		});
	},

	render: function() {
		return (
			<div className={!this.props.isDeleting ? "modal" : "modal is-active"} >
				<div className="modal-background"></div>
				<div className="modal-container">
					<div className="modal-content">
						<div className="box">
							<p>Please confirm with your password</p>
							<form onSubmit={this.deleteAccount} >
								<p className="control has-icon">
								 	<input 
								 		className="input"
								 		type="password" 
								 		placeholder="Password"
								 		value={this.state.password}
								 		onChange={this.handleChange}
								 		required
								 	/>
							  		<i className="fa fa-lock"></i>
								</p>
								<p className="control">
							  		<button type="submit" className="button is-danger">Delete Account</button>
								</p>
							</form>
						</div>
					</div>
				</div>
				<button className="modal-close" onClick={this.props.handleClick} ></button>
			</div>
		);
	}

});

module.exports = DeleteModal;