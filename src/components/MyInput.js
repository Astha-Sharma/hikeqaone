import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {setValidationResult} from './utils/';
import Tooltip from 'rc-tooltip';
import _ from 'underscore';

/*  Working example:
 <MyInput 
          onChange={this.doAction} 
          label="Enter Users" 
          elementid = 'input' 
          value="" 
          mandatory={false} 
          regex="" 
          readOnly={false}
          className="containerClass" 
          placeholder="type..."
          icon="glyphicon glyphicon-asterisk"/>
*/

class MyInput extends Component {
 static propTypes = {
     /**
      * The type which is 'MyInput'
      */
     type: PropTypes.oneOf(['MyInput']),
     /**
      * the label of the input box
      */
     label: PropTypes.string,
     /**
      * the font awesome icon of the input box
      */
     icon: PropTypes.string,
     /**
       * value which specifies whether the component should be shown or not
       */
     show: PropTypes.bool,
     /**
      * the unique key of the input box. It is assumed that each form component will have a unique elementId.
      */
     elementid: PropTypes.string,
     /**
      * the default value that the input will have
      */
     value: PropTypes.string,
     /**
      * true if value is required in the input box, false otherwise
      */
     mandatory: PropTypes.bool,
     /**
      * the regular expression passes as a string that the entered value in the input box must satisty.
      */
     regex:PropTypes.string,
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
      * The validation result that of the form. It is of the form {statusType:"SUCCESS":statusMessage:""} in case of success and {statusType:"ERROR":statusMessage:"Some error occured"} in case of failure.
      */
     validationResult: PropTypes.object,
     /**
      * true if the form button has been clicked, which tells the inputbox to render the error if true. If this is false, error would not be rendered. This is to ensure that the form tells that the components have not been filled up properly only when the submit button(or any other button) is clicked. By default, it is false.
      */
     clickedSubmit: PropTypes.bool,
     /**
      * Shows if the input component is readOnly
      */
     readOnly:PropTypes.bool,
     /**
      * Flag to enable/disable aurofocus
      */
     autofocus: PropTypes.bool,
     /**
      * The function to handle custom validations. It is of the form function(props, value). It takes is as parameters the props and value of the component and returns an object of the form {statusType:"SUCCESS",statusMessage:""} in case of success and {statusType:"ERROR",statusMessage:"Some error occured"} in case of error.
      */
     customValidator: PropTypes.func,
     info : PropTypes.array,
 };

 static defaultProps = {
     value: "",
     placeholder:"",
     regex: "",
     icon: null,
     clickedSubmit: false,
     show: true,
     type: "MyInput",
     validationResult: true,
     info: []
 };

 state = {
     path: this.props.path?this.props.path+'.'+this.props.elementid:this.props.elementid
 };

 handleOnChange = (event) => {
     var obj ={value:event.target.value,path: this.state.path}
     setValidationResult.bind(this)(this.props, obj, this.props.onChange);
 };

 componentDidMount() {
     var obj ={value:this.props.value, path: this.state.path}
     setValidationResult.bind(this)( this.props, obj, this.props.handleInitialValidation);
 }

 componentWillReceiveProps(nextProps) {
     var oldValue = this.props.value;
     var newValue = nextProps.value;
     var checkValue = oldValue===newValue && this.props.mandatory === nextProps.mandatory && this.props.regex===nextProps.regex;
     if (!checkValue) {
         setValidationResult.bind(this)(nextProps, {value: nextProps.value}, this.props.onChange)
     }
 }

 render() {
     const {icon, show, className, label, info} = this.props
     var ren =[];
     const hasIcon = icon ? 'has-icon' : ''
     if (!show) {
        return null;
     }

     _.each(info,(value)=>{
         ren.push(<div>{value}<br/></div>)
     });

     return (
         <div className={`commonFormComponents form-group form-md-line-input ${hasIcon} ${className}`} style={this.props.style}>
             {label ? <div>{label}</div> : null}
             {icon ? (<i className={`fa fa-${icon}`} aria-hidden="true"></i>) : null}
             <input {...this.props} type="text" className= {"inputBox form-control"} disabled={this.props.disabled} value={this.state.value || ''}
                    onChange={this.handleOnChange} ref={this.props.elementid} />
             &nbsp; 	&nbsp;
             {info && info != "" ?
                 <Tooltip placements="top" overlay={<div><p>
                     {ren}
                 </p></div>}>
                     <i href='#' className={'fa fa-info-circle'} style={{color: 'orange', fontSize:'17px'}}/>
                 </Tooltip> : null
             }
             <div className = "errorContainer">
                 {this.props.clickedSubmit && this.state.validationResult && this.state.validationResult.statusType==="ERROR"}
             </div>
         </div>
     );
 }
}

export default MyInput;
