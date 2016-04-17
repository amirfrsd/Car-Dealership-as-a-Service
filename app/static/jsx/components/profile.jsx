var React = require('react');
var DeleteModal = require('./deleteModal.jsx');

var Profile = React.createClass({

	getInitialState: function() {
		return {
			isDeleting: false 
		};
	},

	handleClick: function() {
		this.setState({
			isDeleting: !this.state.isDeleting
		})
	},

	render: function() {
		return (
			<div className="column is-8 is-offset-2 page">
				<h1 className="title">My Profile</h1>
				<div className="control is-grouped">
					<button className="button" onClick={this.props.changePage.bind(null, 'edit')}>Edit Profile</button>
					<button className="button" onClick={this.props.changePage.bind(null, 'changePassword')}>Change Password</button>
					<button className="button is-danger" onClick={this.handleClick} >Delete Account</button>
				</div>
				<p><strong>Account Type</strong><span className="profile-info"> {this.props.data.type == 'client' ? 'Client' : 'Owner'}</span></p>
				<p><strong>Name</strong><span className="profile-info"> {this.props.data.name}</span></p>
				<p><strong>Email</strong><span className="profile-info"> {this.props.data.email}</span></p>
				<p><strong>Contact</strong><span className="profile-info"> {this.props.data.contact}</span></p>
				<DeleteModal isDeleting={this.state.isDeleting} handleClick={this.handleClick} params={this.props.params} />
			</div>
		);
	}

});

module.exports = Profile;