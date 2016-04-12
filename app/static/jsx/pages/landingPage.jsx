import React from 'react';
import LandingHeader from '../components/landingHeader.jsx';
import LandingTitle from '../components/landingTitle.jsx';
import LoginForm from '../components/loginForm.jsx';
import RegisterForm from '../components/registerForm.jsx';

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
