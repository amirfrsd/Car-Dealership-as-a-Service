var React = require('react');

var DealershipProfilePage = React.createClass({

	render: function() {
		return (
			<div>
				<h1 className="title">{this.props.dealership.name}</h1>
				<div className="control is-grouped">
					{this.props.dealership.owner_id == this.props.params.id ? 
						<button className="button" onClick={this.props.changePage.bind(null, 'edit')}>Edit Dealership</button>
					:
						<div />
					}
					
					<button className="button" onClick={this.props.changePage.bind(null, 'list')}>Back</button>
				</div>
				<p><strong>Name</strong><span className="profile-info"> {this.props.dealership.name}</span></p>
				<p><strong>Location</strong><span className="profile-info"> {this.props.dealership.location}</span></p>
				<p><strong>Contact</strong><span className="profile-info"> {this.props.dealership.contact}</span></p>
			</div>
		);
	}

});

module.exports = DealershipProfilePage;