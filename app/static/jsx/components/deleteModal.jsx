var React = require('react');
var {browserHistory} = require('react-router');

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

	deleteAccount: function(id, e) {
		e.preventDefault();
		let url = this.props.carID ? '/api/v1/car/'+id : '/api/v1/'+this.props.params.type+'/'+this.props.params.id;
		let self = this;

		let serverRequest = $.ajax({
		  	url: url,
		  	type: 'DELETE',
		  	dataType: 'json',
		  	contentType: 'application/json',
		  	beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
				if(self.props.carID){
					xhr.setRequestHeader('owner_id', self.props.params.id);
				}
			},
		  	data: JSON.stringify({
		  		password: this.state.password,
		  		owner: this.props.params.id
		  	}),
			success: function(data) {
				if(data.success){
					if(self.props.carID){
						self.props.changePage('list')
					}
					else if(data.unauthorized){
						browserHistory.push('/');
					}
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
							<form onSubmit={this.deleteAccount.bind(null, this.props.carID)} >
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
							  		<button type="submit" className="button is-danger">
							  			{this.props.carID ? 'Delete Car' : 'Delete Account'}
							  		</button>
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