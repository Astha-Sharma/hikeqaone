import PropTypes from 'prop-types';
var React = require('react');
var createReactClass = require('create-react-class');
/**
 * Alert Box is used to display info, success , warning or error
 * Alert can have optional Title, Custom Body
 * ![Alert](images/Alert.png)
 *
 */
var MyAlert = createReactClass({
    displayName: 'Alert',

    PropTypes: {
		/**
		 * Type basically decided the color of the box according to severity level.
		 */
		type: PropTypes.oneOf(['alert-info','alert-success','alert-warning','alert-danger']),
		/**
		 * CSS class for any style overrides
		 */
		className:PropTypes.string,
		/**
		 * option to display close button on top right. It's value is true by default
		 */
	},

    getDefaultProps: function () {
		return ({
			heading: null,
			close: true
		});
	},

    getInitialState: function() {
		return ({ display : true });
	},

    unsetDisplay: function() {
		this.setState({display: false});
		this.props.onClose && this.props.onClose();
	},

    componentWillUpdate(nextProps, nextState){
		if(!nextProps.display && !this.state.display) {
			this.setState({display: true});
		}
	},

    render: function () {

		return (
				this.state.display ?
				<div className={this.props.className+" alert alert-block fade in "+this.props.type}>
					{this.props.close && <button className="close alertButton" onClick={this.unsetDisplay}>&#x2715;</button>}
					{this.props.heading?<h4 classNam="alert-heading">{this.props.heading} </h4> : null}
					{this.props.children}
				</div> : null
		);
	},
});

export default MyAlert;