var React = require('react');
var Header = require('../components/header.jsx');
var Profile = require('../components/profile.jsx');
var EditProfile = require('../components/editProfile.jsx');
var ChangePassword = require('../components/changePassword.jsx');
var {browserHistory} = require('react-router');

var ProfilePage = React.createClass({

	getInitialState: function() {
		return {
			data: {},
			pageType: 'profile',
			changePassword: false,
		};
	},

	componentDidMount: function() {
		this.getProfileInfo();
	},

	getProfileInfo: function(){
		let self = this;
		let serverRequest = $.ajax({
			url: '/api/v1/'+this.props.params.type+'/'+this.props.params.id,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('token', window.location.search.substring(1).split('=')[1]);
				xhr.setRequestHeader('from', 'profile');
			},
			
			success: function(data) {
				if(data.success){
					self.setState({
						data: data
					});
				}
				else if(data.unauthorized){
					browserHistory.push('/');
				}
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
		
		let token = window.location.search.substring(1).split('=')[1];

		return (
			<div>
				<Header params={this.props.params} token={token} />
				<div className="columns">
					{page}
				</div>
			</div>
		);
	}

});

module.exports = ProfilePage;