var React = require('react');
var Header = require('../components/header.jsx');
var CreateDealership = require('../components/createDealership.jsx');
var DealershipsList = require('../components/dealershipsList.jsx');

var DealershipsPage = React.createClass({

	getInitialState: function() {
		return {
			params: {
				type: 'owner',
				id: this.props.params.id
			},
			create: false
		};
	},

	handleClick: function() {
		this.setState({
			create: !this.state.create
		})
	},

	render: function() {
		return (
			<div>
				<Header params={this.state.params} />
				<div className="columns">
					<div className="column is-8 is-offset-2 page">
						{this.state.create ? 
							<CreateDealership handleClick={this.handleClick} params={this.props.params} />
						:
							<DealershipsList handleClick={this.handleClick} params={this.props.params} />
						}
					</div>
				</div>
			</div>
		);
	}

});

module.exports = DealershipsPage;