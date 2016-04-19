var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, browserHistory} = require('react-router');
var LandingPage = require('./pages/landingPage.jsx');
var ProfilePage = require('./pages/profilePage.jsx');
var SearchPage = require('./pages/searchPage.jsx');
var DealershipPage = require('./pages/dealershipPage.jsx');
var CarPage = require('./pages/carPage.jsx');


var App = React.createClass({
    
    render:function(){
        
        return (
            <Router history={browserHistory}>
                <Route path="/" component={LandingPage}/>
                <Route path="/owner/:id/dealerships" component={DealershipPage}/>
                <Route path="/owner/:id/cars" component={CarPage}/>
			    <Route path="/:type/:id" component={ProfilePage}/>
			    <Route path="/:type/:id/search" component={SearchPage}/>
            </Router>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
