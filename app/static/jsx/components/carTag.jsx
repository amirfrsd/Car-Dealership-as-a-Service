var React = require('react');

var CarTag = React.createClass({

	render: function() {
		return (
			<span>
				
				{this.props.delete ?
					<span className="tag is-success tags">
						{this.props.dealership.name}
						<button className="delete" onClick={this.props.deleteDealership.bind(null, this.props.index)} />
					</span>
				:
					<span className="tag is-success tags">{this.props.dealership.name}</span>
				}
			</span>
		);
	}

});

module.exports = CarTag;