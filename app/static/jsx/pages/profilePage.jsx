import React from 'react';
import Header from '../components/header.jsx';
import Profile from '../components/profile.jsx';
import EditProfile from '../components/editProfile.jsx';

var ProfilePage = React.createClass({

	getInitialState: function() {
		return {
			data: {},
			editProfile: false,
			changePassword: false,
		};
	},

	componentWillMount: function() {
		this.getProfileInfo();
	},

	getProfileInfo: function(){
		let self = this;
		let serverRequest = $.ajax({
			url: '/api/v1/'+this.props.params.type+'/'+this.props.params.id,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				id: 1,
				type: 'client'
			}),
			success: function(data) {
				self.setState({
					data: data
				});
			}
		});
	},

	isEditProfile: function() {
		this.setState({
			editProfile: !this.state.editProfile
		})
	},

	render: function() {
		return (
			<div>
				<Header params={this.props.params}/>
				<div className="columns">
					{!this.state.editProfile ? 
						<Profile data={this.state.data} isEdit={this.isEditProfile} params={this.props.params} /> 
					: 
						<EditProfile data={this.state.data} isEdit={this.isEditProfile} params={this.props.params} refreshInfo={this.getProfileInfo} />
					}
				</div>
			</div>
		);
	}

});

module.exports = ProfilePage;