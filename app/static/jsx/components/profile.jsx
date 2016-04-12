import React from 'react';

var Profile = React.createClass({

	render: function() {
		return (
			<div className="column is-8 is-offset-2 page">
				<h1 className="title">My Profile</h1>
				<div className="control is-grouped">
					<button className="button" onClick={this.props.changePage.bind(null, 'edit')}>Edit Profile</button>
					<button className="button" onClick={this.props.changePage.bind(null, 'changePassword')}>Change Password</button>
					<button className="button is-danger">Delete Account</button>
				</div>
				<p><strong>Account Type</strong><span className="profile-info"> {this.props.data.type == 'client' ? 'Client' : 'Owner'}</span></p>
				<p><strong>Name</strong><span className="profile-info"> {this.props.data.name}</span></p>
				<p><strong>Email</strong><span className="profile-info"> {this.props.data.email}</span></p>
				<p><strong>Contact</strong><span className="profile-info"> {this.props.data.contact}</span></p>
			</div>
		);
	}

});

module.exports = Profile;