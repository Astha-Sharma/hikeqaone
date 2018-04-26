import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import validator from './utils/validator.js';
import PropTypes from 'prop-types';
import {setValidationResult} from './utils/';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../css/elements/button.css'
var _ = require('underscore');



class MyFileInput extends Component {
    static propTypes = {
        /**
         * The type which is 'MyFileInput'
         */
        type: PropTypes.oneOf(['MyFileInput']),
        /**
         * the label of the input box
         */
        label: PropTypes.string,
        /**
          * value which specifies whether the component should be shown or not
          */
        show: PropTypes.bool,
        /**
         * the unique key of the input file box. It is assumed that each form component will have a unique elementId.
         */
        elementId: PropTypes.string,
        /**
         * true if file is required to be selected, false otherwise
         */
        mandatory: PropTypes.bool,
        /**
         * the options css classnames that can be added to the input file box container to change its style,
         */
        className: PropTypes.string,
        /**
         * send the updated value to the parent on every change. function(result)
         */
        onChange: PropTypes.func,
        /**
         * true if the form button has been clicked, which tells the input file box to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.
         */
        clickedSubmit: PropTypes.bool,
        /**
         * true if it is allowed to select multiple files.
         */
        multiSelect: PropTypes.bool,
        /**
         * The color we want to give to the button. Example : theme="red" if we want to add a red color to the button.
         */
        theme: PropTypes.string
    };

    static defaultProps = {
        multiSelect: false,
        regex: "",
        clickedSubmit: false,
        mandatory: false,
        value: null,
        type: "MyFileInput",
        show: true
    };

    state = {
        path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
    };

    handleOnClick = (event) => {
         var fileInput = ReactDOM.findDOMNode(this.refs[this.props.elementId]);
         fileInput.click();
    };

    handleOnChange = (event) => {
        var obj ={value:event.target.files,path: this.state.path}
        setValidationResult.bind(this)( this.props, obj, this.props.onChange);
    };

    componentDidMount() {
        var obj ={value:this.props.value,path: this.state.path}
        setValidationResult.bind(this)( this.props, obj, this.props.handleInitialValidation);
    }

    render() {
        if (!this.props.show) {
           return null;
        }
        let value ;
        if(!this.props.value){
            value = null;
        }
        // no pluck in lodash _.pluck(this.state.value,'name')
        return (
            <div className={"myButtonContainer "+(this.props.className?this.props.className: "")} style={this.props.style}>
                <div>
                    <span className = "fileUploadName">
                        {this.state.value ? _.map(this.state.value, 'name').toString():"Upload a file..."}
                    </span>
                    <div className={"btn btn-sm "+(this.props.theme?this.props.theme:"")} onClick={this.handleOnClick}>
                        {this.props.icon && <i className={this.props.icon}></i>}
                        {this.props.label}
                        <input {...this.props} type="file" ref={this.props.elementId}
                                               onChange={this.handleOnChange} value={value} style={{display:'none'}}/>
                    </div> 	&nbsp; 	&nbsp;
                    {this.props.info && this.props.info != "" ?
                            <Tooltip placements="top" overlay={<div>{this.props.info}</div>}>
                                <i href='#' className={'fa fa-info-circle'} style={{color: 'orange', fontSize:'17px'}}/>
                            </Tooltip> : null
                    }
                </div>
                <div className="errorContainer">
                    {this.props.clickedSubmit && this.state.validationResult && this.state.validationResult.statusType==="ERROR"?this.state.validationResult.statusMessage:null}
                </div>
            </div>
        );
    }
}

export default MyFileInput;
