import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import LandingPage from './pages/landingPage.jsx';
import ProfilePage from './pages/profilePage.jsx';
import SearchPage from './pages/searchPage.jsx';


var App = React.createClass({
    
    render:function(){
        
        return (
            <Router history={browserHistory}>
                <Route path="/" component={LandingPage}/>
			    <Route path="/:type/:id" component={ProfilePage}/>
			    <Route path="/:type/:id/search" component={SearchPage}/>
            </Router>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
