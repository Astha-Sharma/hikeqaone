import React, {Component} from 'react';
import validator from './utils/validator.js';
import {setValidationResult} from './utils/';
import PropTypes from 'prop-types';
import '../css/elements/radio.css'


/*  <MyRadio
          onChange={(e) => this.doRadioAction(e)}
          label="Mera Radio"
          value={this.state.radioValue}
          elementId = 'radio'
          options={["one", "two", "three"]}
          className="radio-inline" />*/

class MyRadio extends Component {

    constructor(props){
        super(props);
        this.state={
        path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
        }
    }
    static propTypes = {
        /**
         * The type which is 'MyRadio'
         */
        type: PropTypes.oneOf(['MyRadio']),
        /**
         * the label of the radio button box.
         */
        label: PropTypes.string,
        /**
         * the unique key of the radio button box. It is assumed that each form component will have a unique elementId.
         */
        elementId: PropTypes.string,
        /**
         * the options css classnames that can be added to the radio button box container to change its style,
         */
        className: PropTypes.string,
        /**
         * send the updated value to the parent on every change. function(result)
         */
        onChange: PropTypes.func,
        /**
         * the set of possible values in the radio button box .
         */
        value: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(PropTypes.object)
        ]),
    };

    static defaultProps = {
        label: "",
        type:"MyRadio"
    };

    componentDidMount() {
        let value = this.props.value;
        var obj ={value:value,path: this.state.path};
        setValidationResult.bind(this)( this.props, obj, this.props.handleInitialValidation);
    }

    handleOnClick = (event) => {
        if(this.props.disabled)
            return;
        let value = event.currentTarget.getAttribute("value");
        var obj ={value:value,path: this.state.path};
                console.log("handleOnClick==",obj)
        setValidationResult.bind(this)( this.props, obj, this.props.onChange);
    };

    componentWillReceiveProps(nextProps) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var checkValue = oldValue===newValue;
        if (!checkValue) {
            setValidationResult.bind(this)(nextProps,{}, this.props.onChange)
        }
    }

    render() {
        let radioArray = this.props.options.map((item, index)=>{
            var temp={};
            var checked = false;
            if(typeof item =='object'){
                for(var key in item){
                    temp['value']=key;
                    temp['label']=item[key];
                    if(key == this.state.value)
                        checked=true;
                    break;
                }
            }
            else{
                temp['label']=item;
                temp['value']=item;
                if(item == this.state.value){
                        checked=true;
                    }
            }
            if(!this.state.value && index==0){
                checked = true;
            }
            // var checked = index===this.state.selectedIndex;
            return (
                <div className="md-radio" value={temp['value']} onClick={this.handleOnClick}>
                    <input type="radio" ref={this.props.elementId+index} disabled={this.props.disabled} elementId={this.props.elementId} value={temp['value']} checked={checked} className="md-radiobtn"/>
                    <label>
                        <span className="inc"></span>
                        <span className="check"></span>
                        <span className="box"></span>
                        <div>{temp['label']}</div>
                    </label>
                </div>
            );
        });
            return (
            <div className="radioContainer" style={this.props.style}>
                <div>{this.props.label}</div>
                <div className="md-radio-inline">
                    {radioArray}
                </div>
            </div>
        )

    }
}
export default MyRadio;
