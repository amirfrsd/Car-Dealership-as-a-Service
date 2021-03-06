var React = require('react');
var {Link} = require('react-router');

var Header = React.createClass({
	
	getInitialState: function() {
		return {
			token: this.props.token 
		};
	},

	render: function() {
		
		let cars;
		let dealerships;
		let clients;

		if(this.props.params.type == 'owner'){
			cars = 	<Link to={'/'+this.props.params.type+'/'+this.props.params.id+'/cars'+'?token='+this.state.token} className="header-tab" activeClassName="is-active">Cars</Link>;
			dealerships = <Link to={'/'+this.props.params.type+'/'+this.props.params.id+'/dealerships'+'?token='+this.state.token} className="header-tab"activeClassName="is-active">Dealerships</Link>;
			clients = <Link to={'/'+this.props.params.type+'/'+this.props.params.id+'/clients'+'?token='+this.state.token} className="header-tab" activeClassName="is-active">Clients</Link>;
		}
		else{
			cars = <div/>
			dealerships = <div/>
			clients = <div/>
		}

		return (
			<header className="header">
				<div className="container">
					<div className="header-left">
						<a href={'/'+this.props.params.type+'/'+this.props.params.id+'?token='+this.state.token} className="header-item">
							<img src="static/img/logo.png" alt="Logo"></img>
						</a>

						<Link 
							to={'/'+this.props.params.type+'/'+this.props.params.id+'?token='+this.state.token} 
							className="header-tab" 
							activeClassName="is-active"
							>Profile
						</Link>

						{dealerships}
						{cars}
						{clients}

						<Link 
							to={'/'+this.props.params.type+'/'+this.props.params.id+'/search'+'?token='+this.state.token} 
							className="header-tab" 
							activeClassName="is-active"
							>Search
						</Link>
					</div>
					<div className="header-right header-menu">
				      	<Link 
							to={'/'} 
							className="header-item" 
							activeClassName="is-active"
							>Logout
						</Link>
				    </div>
				</div>
			</header>
		);
	}

});

module.exports = Header;