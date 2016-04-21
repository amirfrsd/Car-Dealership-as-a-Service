var React = require('react');

var ClientProfile = React.createClass({

	render: function() {
		return (
			<div>
				<h1 className="title">My Profile</h1>
				<div className="control">
					<button className="button" onClick={this.props.changePage.bind(null, 'list')}>Back</button>
				</div>
				<p><strong>Account Type</strong><span className="profile-info">Client</span></p>
				<p><strong>Name</strong><span className="profile-info"> {this.props.data.name}</span></p>
				<p><strong>Email</strong><span className="profile-info"> {this.props.data.email}</span></p>
				<p><strong>Contact</strong><span className="profile-info"> {this.props.data.contact}</span></p>
			</div>
		);
	}

});

module.exports = ClientProfile;