var React = require('react');
var LandingHeader = require('../components/landingHeader.jsx');
var LandingTitle = require('../components/landingTitle.jsx');
var LoginForm = require('../components/loginForm.jsx');
var RegisterForm = require('../components/registerForm.jsx');

var LandingPage = React.createClass({

	getInitialState() {
        return {
            login: true
        };
    },

    formChange: function(newState){
        this.setState({
            login: newState
        });
    },

	render: function() {
		return (
			<div>
                <LandingHeader />
                <div className="columns">
                    <LandingTitle />
                    {this.state.login ? <LoginForm login={this.formChange} /> : <RegisterForm login={this.formChange} />}
                </div>            
            </div>
		);
	}

});

module.exports = LandingPage;
