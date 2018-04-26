import React, {Component} from 'react';
import validator from './utils/validator.js';
import {setValidationResult} from './utils/';
import PropTypes from 'prop-types';
var _ = require('underscore');

class MyCustomComponent extends Component {
    static propTypes = {
        /**
          * value which specifies whether the component should be shown or not
          */
        show: PropTypes.bool
    };

    static defaultProps = {
        show: true,
        className : ""
    };

    state = {
        path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
    };

    onContentChange = (obj) => {
        let newProps = {};
        _.extend(newProps, this.props, obj);
        this.setState(newProps);
        this.props.onChange(newProps);
    };

    render() {
        if (!this.props.show) {
           return null;
        }
        return (
             <div className={"commonFormComponents customFormComponent " + this.props.className } style={this.props.style} >
                {this.props.label?<div>{this.props.label}</div>:null}
                <div className="customComponentWrapper" ref={this.props.elementId}>
                    {this.props.render?this.props.render(this):null}
                </div>
                <div className = "errorContainer">
                    {this.props.clickedSubmit && this.state.validationResult && this.state.validationResult.statusType==="ERROR"?this.state.validationResult.statusMessage:null}
                </div>
            </div>
        );
    }
}

export default MyCustomComponent;
