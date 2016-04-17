var React = require('react');
var {Link} = require('react-router');

var Header = React.createClass({

	render: function() {
		
		let cars;
		let dealerships;

		if(this.props.params.type == 'owner'){
			cars = 	<Link to={'/'+this.props.params.type+'/'+this.props.params.id+'/cars'} className="header-tab" activeClassName="is-active">Cars</Link>;
			dealerships = <Link to={'/'+this.props.params.type+'/'+this.props.params.id+'/dealerships'} className="header-tab"activeClassName="is-active">Dealerships</Link>;
		}
		else{
			cars = <div/>
			dealerships = <div/>
		}

		return (
			<header className="header">
				<div className="container">
					<div className="header-left">
						<a href={'/'+this.props.params.type+'/'+this.props.params.id} className="header-item">
							<img src="static/img/logo.png" alt="Logo"></img>
						</a>

						<Link 
							to={'/'+this.props.params.type+'/'+this.props.params.id} 
							className="header-tab" 
							activeClassName="is-active"
							>Profile
						</Link>

						{dealerships}
						{cars}

						<Link 
							to={'/'+this.props.params.type+'/'+this.props.params.id+'/search'} 
							className="header-tab" 
							activeClassName="is-active"
							>Search
						</Link>
					</div>
				</div>
			</header>
		);
	}

});

module.exports = Header;