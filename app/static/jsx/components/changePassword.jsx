var React = require('react');
var {browserHistory} = require('react-router');

var ChangePassword = React.createClass({

	getInitialState: function() {
		return {
			password: '',
			newPassword: ''
		};
	},

	handleChange: function(type, e) {
		if(type == 'password')
			this.setState({
				password: e.target.value
			});
		else if(type == 'newPassword')
			this.setState({
				newPassword: e.target.value
			});
	},

	validate: function() {	
  		if(this.state.newPassword != this.refs.confirmNewPassword.value.trim())
    		this.refs.confirmNewPassword.setCustomValidity("Passwords Don't Match");
  		else
    		this.refs.confirmNewPassword.setCustomValidity("");
	
	},

	saveNewPassword: function(e) {

		e.preventDefault();

		let self = this;
		let serverRequest = $.ajax({
		  	url: '/api/v1/'+this.props.params.type+'/'+this.props.params.id+'/password',
		  	type: 'PUT',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
			},
		  	data: JSON.stringify({
		  		password: this.state.password,
		  		newPassword: this.state.newPassword
		  	}),
			success: function(data) {
				if(data.success){
					self.props.changePage('profile');
				}
				else if(data.unauthorized){
					browserHistory.push('/');
				}
			},
		});
	},

	render: function() {
		return (
			<div className="column is-4 is-offset-2 page">
				<h1 className="title">Change Password</h1>
				<form onSubmit={this.saveNewPassword} >
					<div className="control is-grouped">
						<button className="button" type="submit">Save New Password</button>
						<a className="button" onClick={this.props.changePage.bind(null, 'profile')}>Back</a>
					</div>
					<div className="control is-horizontal">
						<div className="control has-icon">
						    <input 
						    	className="input" 
						    	type="password" 
						    	value={this.state.password} 
						    	placeholder="Current password"
						    	onChange={this.handleChange.bind(null, 'password')}
						    	required
						    />
						    <i className="fa fa-lock"></i>
						</div>
					</div>
					<div className="control is-horizontal">
						<div className="control has-icon">
						    <input 
						    	className="input" 
						    	type="password" 
						    	value={this.state.newPassword} 
						    	placeholder="New password"
						    	onChange={this.handleChange.bind(null, 'newPassword')}
						    	required
						    />
						    <i className="fa fa-lock"></i>
						</div>
					</div>
					<div className="control is-horizontal">
						<div className="control has-icon">
						    <input 
						    	className="input" 
						    	type="password" 
						    	ref="confirmNewPassword"
						    	placeholder="Confirm new password"
						    	onKeyUp={this.validate} 
						    	required
						    />
						    <i className="fa fa-lock"></i>
						</div>
					</div>
				</form>
			</div>
		);
	}

});

module.exports = ChangePassword;