var React = require('react');

var LandingHeader = React.createClass({

	render: function() {
		return (
			<header className="header">
				<div className="container">
					<div className="header-left">
						<a href="/" className="header-item">
							<img src="static/img/logo.png" alt="Logo"></img>
						</a>

					</div>
				</div>
			</header>
		);
	}

});

module.exports = LandingHeader;