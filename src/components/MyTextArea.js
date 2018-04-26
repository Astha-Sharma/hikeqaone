import PropTypes from 'prop-types';
import React from 'react';

class MyTextArea extends React.Component {
    static propTypes = {
        /**
         * The type which is 'MyTextArea'
         */
        type: PropTypes.oneOf(['MyTextArea']),
        /**
         * the label of the input box
         */
        label: PropTypes.string,
        /**
         * Allows disabling input to the text area
         */
        disabled: PropTypes.bool,
        /**
         * value which specifies whether the component should be shown or not
         */
        show: PropTypes.bool,
        /**
         * the unique key of the input box. It is assumed that each form component will have a unique elementId.
         */
        elementId: PropTypes.string,
        /**
         * the default value that the input will have
         */
        value: PropTypes.string,
        /**
         * Specifies the visible width of a text area
         */
        cols: PropTypes.string,
        /**
         * Specifies the visible number of lines in a text area
         */
        rows: PropTypes.string,
        /**
         * true if value is required in the input box, false otherwise
         */
        mandatory: PropTypes.bool,
        /**
         * the regular expression passes as a string that the entered value in the input box must satisty.
         */
        regex: PropTypes.string,
        /**
         * the options css classnames that can be added to the input box container to change its style,
         */
        className: PropTypes.string,
        /**
         * the placeholder that input box might have.
         */
        placeholder: PropTypes.string,
        /**
         * send the updated value to the parent on every change. function(result)
         */
        onChange: PropTypes.func,
        /**
         * true if the form button has been clicked, which tells the inputbox to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.
         */
        clickedSubmit: PropTypes.bool
    };

    static defaultProps = {
        value: "",
        multiselect: false,
        placeholder:"",
        regex: "",
        clickedSubmit: false,
        show: true,
        type:"MyTextArea",
        disabled: false
    };

    state = {
        defaultClass: "form-control",
        containerClass: "commonFormComponents",
        defaultContainerClass: "form-group form-md-line-input",
        value: ""
    };

    handleOnChange = (event) => {
        var result = {};
        var elementId = this.props.elementId;
        var value = value = event.target.value;
        var statusType = null;

        var regex = new RegExp(this.props.regex);

        var error = this.isValidValue(this.props.mandatory, value, regex);
        if(error)
            statusType = "ERROR"
        else
            statusType = "SUCCESS"

        result['elementId'] = elementId;
        result['value'] = value;
        result['statusType'] = statusType;
        result['type'] = 'MyTextArea';


        this.setState({
            value: event.target.value,
            error: error
        });
        this.props.onChange && this.props.onChange(result);
    };

    componentDidMount() {
        var result = {};
        var elementId = this.props.elementId;
        var value = this.props.value;
        var statusType = null;
        var regex = new RegExp(this.props.regex);
        var error = this.isValidValue(this.props.mandatory, value, regex);
        if (error===true) {
            statusType = "ERROR";
        }
        else {
            statusType = "SUCCESS";
        }
        var errorMessage = "Invalid " + this.props.label;

        result['elementId'] = elementId;
        result['value'] = value;
        result['statusType'] = statusType;
        result['type']='MyTextArea'


        this.setState ({
            error: error,
            errorMessage: errorMessage,
            value: this.props.value,
        });
        this.props.handleInitialValidation && this.props.handleInitialValidation(result);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    isValidValue = (mandatory, value, regex) => {
        var error = null;
        if(mandatory===true){
            if(value){
                if(value==="")
                    error = true;
                else{
                    error = !regex.test(value);
                }
            }
            else{
                error = true;
            }
        }
        else{
            if(value===""){
                error = false;
            }
            else{
                error = !regex.test(value);
            }
        }
        return error;
    };

    componentWillMount() {
        if(this.props.containerClass){
            this.setState({
                containerClass: this.state.containerClass + " " + this.props.containerClass
            })
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        var containerClass = this.props.containerClass ? this.props.containerClass + " "+ this.state.defaultContainerClass : this.state.containerClass + " "+ this.state.defaultContainerClass
        var error;
        if (this.state.error && this.props.clickedSubmit) {
            error = <div className = "errorContainer"> Invalid {this.props.label}</div>
        }
        return (
            <div className={`commonFormComponents form-group form-md-line-input`} style={this.props.style}>
                {this.props.label?<div><h3>{this.props.label}</h3></div>:null}
                <textarea type="text"  disabled={this.props.disabled} placeholder={this.props.placeholder}
                          onChange={this.handleOnChange} cols={this.props.cols} rows={this.props.rows} value={this.state.value}/>
                {error}
            </div>
        );
    }
}

export default MyTextArea;