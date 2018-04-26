import React, {Component} from 'react'
import PropTypes from 'prop-types';
import validator from './utils/validator.js';
import {setValidationResult} from './utils/';
import '../css/elements/checkbox.css'

/* <MyCheckBox
          onChange={(e) => this.doAction(e)}
          label="Mera CheckBox"
          value={this.state.checkboxValue}
          elementId = 'box'
          className=""/>*/

class MyCheckBox extends Component{

    constructor(props){
    	super(props)
    	this.state={
    		value:false,
			path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
    	}
    }
    static defaultProps = {
        label:"",
        type:"CheckBox",
        show: true
    };

    componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.value
		})
	}

    componentDidMount() {
		var obj ={value:this.props.value,path: this.state.path}
		setValidationResult.bind(this)( this.props, obj, this.props.handleInitialValidation);
	}

    handleOnClick = (event) => {
		event.preventDefault();
		var obj ={value:!this.state.value,path: this.state.path}
		setValidationResult.bind(this)(this.props, obj, this.props.onChange);
	};

    render() {
	if (!this.props.show) {
	   return null;
	}
	return (
		<div className={"myCheckBoxContainer "+(this.props.className? this.props.className: "")} style={this.props.style}>
			<div className="md-checkbox" onClick={this.handleOnClick} >
				<input {...this.props} type="checkbox" id={this.props.elementId} className="md-check" checked={this.state.value} ref={this.props.elementId}/>
				<label htmlFor={this.props.elementId}>
					<span className="inc"></span>
					<span className="check"></span>
					<span className="box"></span>
					<div className ="textClass">{this.props.label}</div>
				</label>
			</div>
		</div>
		)
	}
}


MyCheckBox.PropTypes={
		/**
		 * The type which is 'MyCheckbox'
		 */
		type: PropTypes.oneOf(['MyCheckBox']),
		/**
		 * the label of the input box
		 */
		label: PropTypes.oneOfType([PropTypes.string,PropTypes.object]),
		/**
		  * value which specifies whether the component should be shown or not
		  */
		show: PropTypes.bool,
		/**
		 * the unique key of the check box. It is assumed that each form component will have a unique elementId.
		 */
		elementId:PropTypes.string,
		/**
		 * the default value that the checkbox will have
		 */
		value: PropTypes.bool,
		/**
		 * the options css classnames that can be added to the check box container to change its style,
		 */
		className:PropTypes.string,
		/**
		 * send the updated value to the parent on every change. function(result)
		 */
		onChange: PropTypes.func
}

export default MyCheckBox;
