import React,{Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {setValidationResult} from './utils/';
import validator from './utils/validator.js';
import 'react-select/dist/react-select.css';
import {Creatable, AsyncCreatable, Async} from 'react-select';
var selectTypes= {'Select': Select, 'Creatable': Creatable, 'AsyncCreatable': AsyncCreatable, 'Async': Async};
var _ = require('underscore')

class MyReactSelect extends React.Component {
    static displayName = 'MyReactSelect';

    static propTypes = {
		/**
		 * value which specifies whether the component should be shown or not
		 */
		show: PropTypes.bool,
		/**
		 * value used while making ajax calls. Can be get, post, put etc.
		 */
		method: PropTypes.string,
		/**
		 * value to send to ajax request. (json)
		 */
		send: PropTypes.object,
		/*
		* value which determines if Select is Async, Creatable or AsyncCreatable.
		 */
		selectType: PropTypes.string,
		/*
		* value which determines text displayed on backspace
		 */
		backspaceToRemoveMessage: PropTypes.string

	};

    static defaultProps = {
        show: true,
        method: 'get',
        selectType: 'Select',
        backspaceToRemoveMessage: ''
    };

    state = {
        options: null,
        path: this.props.path ? this.props.path + '.' + this.props.elementId : this.props.elementId
    };

    handleOnChange = (value) => {

        setValidationResult.bind(this)(this.props, {value: value, path: this.state.path}, this.props.onChange);
    };

    convertArrayToOptionsIfNeeded = (arr) => {
        if (arr && arr[0] && arr[0].label == undefined) {
            var options = arr.map((x) => {
                return {label: x, value: x}
            })
            return options;
        }
        return arr;
    };

    componentDidMount() {
        let that = this;
        let options = null;
        if (this.props.dataUrl) {
           // this.makeAjaxCall(this.props);
        }
        else {
            let obj = {value: this.props.value, options: this.props.options, path: this.state.path};
            setValidationResult.bind(this)(this.props, obj, this.props.handleInitialValidation);
        }
    }

    makeAjaxCall = (props) => {
    
    };

    componentWillReceiveProps(nextProps) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var oldOptions = this.props.options;
        var newOptions = nextProps.options;
        var checkValue = _.isEqual(oldValue, newValue) && _.isEqual(oldOptions, newOptions) && _.isEqual(nextProps.mandatory, this.props.mandatory);;
        if (!checkValue) {
            let newOptions;
            if(this.props.dataUrl)
                newOptions = _.isEqual(oldOptions, newOptions)?this.state.options: nextProps.options;
            else
                newOptions = nextProps.options;
            setValidationResult.bind(this)(nextProps, {value: nextProps.value, options:newOptions}, this.props.onChange)
        }
        if(this.props.send!=nextProps.send||this.props.dataUrl!=nextProps.dataUrl){
           // this.makeAjaxCall(nextProps);
        }

    }

    render() {
        if (!this.props.show) {
            return null;
        }
        var currentOptions = this.convertArrayToOptionsIfNeeded(this.state.options);
        let Select = selectTypes[this.props.selectType]
        return (

            <div className={this.props.className + " commonFormComponents"}

                 style={this.props.style}>
                {this.props.label ? <div>{this.props.label}</div> : null}
                <div className="select">
                    <Select {...this.props} className={null} label={null} options={currentOptions}
                            value={this.state.value} onChange={this.handleOnChange}
                            ref={this.props.elementId}
                            style={null}
                            placeholder={currentOptions ? (this.props.placeholder ? this.props.placeholder : "Select...") : "Loading..."}/>
                </div>
                <div className="errorContainer">
                    {this.props.clickedSubmit && this.state.validationResult && this.state.validationResult.statusType === "ERROR" ? this.state.validationResult.statusMessage : null}
                </div>
            </div>
        );
    }
}

export default MyReactSelect;
