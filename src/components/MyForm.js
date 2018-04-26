import React,{Component} from 'react';
import MyCheckBox from './MyCheckBox'
import MyButton from './MyButton'
import MyInput from './MyInput'
import MyRadio from './MyRadio'
import MyPortlet1 from './MyPortlet1'
import MyFileInput from './MyFileInput'
import MyDatePicker from './MyDatePicker'
import MyReactSelect from './MyReactSelect'
import MyCustomComponent from './MyCustomComponent'
import {buildQuery, getValue} from './utils/';
import '../css/elements/form.css';
//import '../css/main.css';
var _ = require('underscore');

var Components = {
    'MyCheckBox': MyCheckBox,
    'MyButton': MyButton,
    'MyInput': MyInput,
    'MyRadio': MyRadio,
    'MyFileInput':MyFileInput,
    'MyDatePicker':MyDatePicker,
    'MyCustomComponent':MyCustomComponent,
    'MyReactSelect':MyReactSelect,
    'MyForm': MyForm
};
class MyForm extends Component {

    constructor(props){
        super(props)
        this.state={
        clickedSubmit: false,
        path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
        }
    }
    static defaultProps = {
        data: [],
        flow: 'horizontal',
        headers:{},
        params:{},
        showBox:true,
        timeout: 15000,
        tileData : null
    };

    ignoreKey = (key) => {
        let ingoreArr = ['MyButton'];
        return ingoreArr.indexOf(key) >= 0;
    };

    getFormJSON = () => {
        var dataJson = this.props.data;
        return dataJson;
    };

    getCombinedFormData = () => {
        let combinedFormData = _.extend({}, this.props.data);

        for(let key in combinedFormData){
            if(this.ignoreKey(key)){
                delete combinedFormData[key];
            }
        }
        for(let key in this.props.params){
            combinedFormData[key] = {};
            combinedFormData[key].value = this.props.params[key];
        }
        return combinedFormData;
    };

    setBodyJson = (request, combinedFormData) => {
        let sendObj={};
        for(let key in combinedFormData){
            sendObj[key] = getValue(combinedFormData[key]);
        }
        request.send(sendObj);
        return request;
    };

    setMultipartParams = (request, combinedFormData) => {
        for(let key in combinedFormData){
            let val = getValue(combinedFormData[key]);
            if(combinedFormData[key].type==='MyFileInput'){
                for(let i=0;i<val.length;i++){
                    let file = val[i];
                    request.attach('file', file, file.name);
                }
            }
            else
                request.field(key, val);
        }
        return request;
    };

    setRequestProperties = (request) => {
        this.props.headers && Object.keys(this.props.headers).map(key=>{
            request.set(key, this.props.headers[key]);
        });
        return request;
    };

    getRequest = (url) => {

    };

    isEmptyJSON = (obj) => {
        return Object.keys(obj).length === 0;
    };

    getFormValidationResult = (formJSON) => {
        return({
            statusType:this.checkFormSuccess(formJSON)?"SUCCESS":"ERROR",
            statusMessage:""
        })
    };

    handleChange = (result) => {
        let formJSON = this.state.formJSON;
        formJSON[result.elementId] = result;
        let validationResult = this.getFormValidationResult(formJSON);
        let newProps = {};
        _.extend(newProps, this.props, {data:formJSON}, {validationResult:validationResult });
        this.props.onChange && this.props.onChange(result, newProps, this.props.elementId);
    };

    handleFormChange = (result, newProps, elementId) => {
        let formJSON = this.state.formJSON;
        formJSON[newProps.elementId] = newProps;
        let validationResult = this.getFormValidationResult(formJSON);
        let newPropsForm = {};
        // _.extend(newPropsForm,{validationResult:validationResult}, {data:formJSON}, this.props);
        // formJSON[elementId].data = formJSONcomp;
        _.extend( newPropsForm, this.props, {data:formJSON}, {validationResult:validationResult});
        this.props.onChange && this.props.onChange(result, newPropsForm, this.props.elementId);
    };

    checkFormSuccess = (formJSON) => {
        var isSuccessfulForm = true;

        for (var key in formJSON) {
            let metadata = formJSON[key];
            if (metadata.validationResult && metadata.validationResult.statusType === "ERROR") {
                isSuccessfulForm = false;
                break;
            }
        }
        return isSuccessfulForm;
    };

    handleButtonClick = (elementId, event, path) => {
        this.state.formJSON[elementId]['buttonType']==="submit" && this.setState({
            clickedSubmit: true
        });

        var isSuccessfulForm = this.props.validationResult && this.props.validationResult.statusType==="SUCCESS"?true:false;

        var response = {};
        response['elementId'] = elementId;
        response['event'] = event;
        response['data'] = this.state.formJSON;
        response['path'] = path;
        response['statusType'] = isSuccessfulForm === true ? "SUCCESS" : "ERROR";

        this.props.onClick && this.props.onClick(response);

        let buttonType = this.state.formJSON[elementId]["buttonType"];

        if(isSuccessfulForm && buttonType && buttonType.toLowerCase()==='submit'){
            this.state.formJSON[elementId]['onSubmit'] && this.state.formJSON[elementId]['onSubmit'](response);
            let url = this.props.actionUrl || "/";
            let request = this.getRequest(url);
            console.log('request started');
            request && request.end((err, res)=>{
                this.props.onRequest && this.props.onRequest(err, res);
            })
        }
    };

    componentWillMount() {
        var formJSON = this.getFormJSON();
        this.setState({
            formJSON: formJSON
        });
    }

    componentWillReceiveProps(nextProps) {
        var clickedSubmit = nextProps.clickedSubmit? nextProps.clickedSubmit: this.state.clickedSubmit;
        this.setState({
            clickedSubmit: clickedSubmit,
            formJSON: nextProps.data
        });
    }

    render() {
        var arr = Object.keys(this.state.formJSON).map((item, index)=> {
            var type = this.state.formJSON[item]["type"];
            var Comp = Components[type];
            if(type==='MyForm')
                Comp=MyForm;
            if (Comp === undefined) {
                return null;
            }
            if (type === 'MyButton') {
                return (<Comp path={this.state.path} elementId={item} disabled={this.props.disabled} {...this.state.formJSON[item]} key={item}
                              onClick={this.handleButtonClick}/> );
            }
            else if(type === 'MyForm') {
                return (<Comp path={this.state.path} elementId={item}  disabled={this.props.disabled} {...this.state.formJSON[item]} key={item} onChange={this.handleFormChange}
                              clickedSubmit={this.state.clickedSubmit}/> );
            }
            else {
                return (<Comp path={this.state.path} elementId={item} disabled={this.props.disabled} {...this.state.formJSON[item]} key={item}
                              onChange={this.handleChange}
                              handleInitialValidation={this.handleChange} clickedSubmit={this.state.clickedSubmit}
                              /> );
            }
        });
        var flowClass = this.props.flow === 'horizontal' ? 'myFormHorizontal' : this.props.flow === 'vertical' ? 'myFormVertical' : null;
        return (
            <MyPortlet1 {...this.props} className={'my-form '+this.props.className}>
                <div className={flowClass}>{arr}</div>
                {this.props.tileData != null ?
                    this.props.tileData
                    :null
                }
            </MyPortlet1>
        );
    }
}

export default MyForm;
