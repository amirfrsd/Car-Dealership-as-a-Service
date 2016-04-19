var React = require('react');
var Header = require('../components/header.jsx');
var Profile = require('../components/profile.jsx');
var EditProfile = require('../components/editProfile.jsx');
var ChangePassword = require('../components/changePassword.jsx');

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