import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import LandingPage from './components/landingPage.jsx';

var App = React.createClass({
    
    render:function(){
        
        return (
            <Router history={hashHistory}>
                <Route path="/" component={LandingPage}/>
            </Router>
            
        );
    }
});

ReactDOM.render(<App />, document.getElementById('app'));
