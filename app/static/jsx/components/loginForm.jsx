var React = require('react');
var {browserHistory} = require('react-router');

var LoginForm = React.createClass({

	getInitialState:function(){
		return {
			client: true,
			email: '',
			password: ''
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

	handleChange: function(type, e){
		if(type == 'email')
			this.setState({email: e.target.value});
		else
			this.setState({password: e.target.value});
	},

	login: function(e){
		e.preventDefault();

		let serverRequest = $.ajax({
			url: '/api/v1/login',
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				type: this.state.client ? 'client' : 'owner'
			}),
			success: function(data){
				if(data.success){
					browserHistory.push('/'+data.type+'/'+data.id+'?token='+data.token);
				}
			}
		});
	},

	render: function() {

		return (
			<div className="column">
				<div className="login-box">
					<div className="column is-8 is-offset-2">
						<h1 className="title">Login</h1>
						<form onSubmit={this.login}>
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
							<p className="control is-grouped is-pulled-right">
							  	<button type="submit" className="button is-success">Login</button>
							  	<a className="button is-link" onClick={this.props.login.bind(null, false)}>Register</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = LoginForm;
