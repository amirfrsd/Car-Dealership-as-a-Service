var React = require('react');

var RegisterForm = React.createClass({

	getInitialState:function(){
		return {
			client: true,
			email: '',
			password: '',
			name: ''
		}
	},

	handleClick: function(type){
		if(type == 'client'){
			this.setState({
				client: true,
			})
		}
		else{
			this.setState({
				client: false,
			})
		}
	},

	validatePassword: function(){
  		if(this.state.password != this.refs.confirmPassword.value.trim())
    		this.refs.confirmPassword.setCustomValidity("Passwords Don't Match");
  		else
    		this.refs.confirmPassword.setCustomValidity('');
	},

	componentDidUpdate: function(prevProps, prevState) {
		if(prevState.password != this.state.password)
			this.validatePassword();
	},

	handleChange: function(type, e){
		if(type == 'email')
			this.setState({
				email: e.target.value
			});
		else if(type == 'name')
			this.setState({
				name: e.target.value
			})
		else{
			this.setState({
				password: e.target.value
			});	
			this.validatePassword();
		}
	},

	register: function(e){
		
		e.preventDefault();
		
		let self = this;

		let serverRequest = $.ajax({
		  	url: '/api/v1/register',
		  	type: 'POST',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	data: JSON.stringify({
		  		name: this.state.name,
		  		email: this.state.email,
		  		password: this.state.password,
		  		type: this.state.client ? 'client' : 'owner'
		  	}),
			success: function(data) {
				if(data.success){
					self.props.login(true);
				}
			},
		});
	},
	
	render: function() {
		return (
			<div className="column">
				<div className="login-box">
					<div className="column is-8 is-offset-2">
						<h1 className="title">Register</h1>
						<form onSubmit={this.register}>
							<p className="control has-addons">
								<a 
									className={this.state.client ? "button is-primary is-medium" : "button is-medium"} 
									onClick={this.handleClick.bind(null, 'client')}>
									Client
								</a>
								<a 
									className={!this.state.client ? "button is-primary is-medium" : "button is-medium"} 
									onClick={this.handleClick.bind(null, 'owner')}>
									Owner
								</a>
							</p>
							<p className="control has-icon">
							  	<input 
							  		className="input" 
							  		type="text" 
							  		placeholder="Name"
							  		value={this.state.name}
							  		onChange={this.handleChange.bind(null, 'name')}
							  		required
							  	/>
							  	<i className="fa fa-user"></i>
							</p>
							<p className="control has-icon">
							  	<input 
							  		className="input" 
							  		type="email" 
							  		placeholder="Email"
							  		value={this.state.email}
							  		onChange={this.handleChange.bind(null, 'email')}
							  		required
							  	/>
							  	<i className="fa fa-envelope"></i>
							</p>
							<p className="control has-icon">
							 	<input 
							 		className="input"
							 		type="password" 
							 		placeholder="Password"
							 		value={this.state.password}
							 		onChange={this.handleChange.bind(null, 'password')}
							 		required
							 	/>
							  	<i className="fa fa-lock"></i>
							</p>
							<p className="control has-icon">
							 	<input 
							 		className="input" 
							 		type="password"
							 		ref="confirmPassword" 
							 		placeholder="Confirm Password"
							 		onKeyUp={this.validatePassword}
							 		required
							 	/>
							  	<i className="fa fa-lock"></i>
							  	
							</p>
							<p className="control is-grouped is-pulled-right">
							  	<button type="submit" className="button is-success">Register</button>
							  	<button className="button is-link" onClick={this.props.login.bind(null, true)}>Login</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = RegisterForm;