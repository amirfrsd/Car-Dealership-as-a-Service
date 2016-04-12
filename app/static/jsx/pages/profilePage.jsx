import React from 'react';
import Header from '../components/header.jsx';
import Profile from '../components/profile.jsx';
import EditProfile from '../components/editProfile.jsx';
import ChangePassword from '../components/changePassword.jsx';

var ProfilePage = React.createClass({

	getInitialState: function() {
		return {
			data: {},
			pageType: 'profile',
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

	changePageType: function(newState) {
		this.setState({
			pageType: newState
		})
	},

	render: function() {
		let page;

		if(this.state.pageType == 'changePassword'){
			page = <ChangePassword data={this.state.data} changePage={this.changePageType} params={this.props.params} />
		}
		else if(this.state.pageType == 'edit'){
			page = <EditProfile data={this.state.data} changePage={this.changePageType} params={this.props.params} refreshInfo={this.getProfileInfo} />
		}
		else{
			page = <Profile data={this.state.data} changePage={this.changePageType} params={this.props.params} /> 
		}

		return (
			<div>
				<Header params={this.props.params}/>
				<div className="columns">
					{page}
				</div>
			</div>
		);
	}

});

module.exports = ProfilePage;