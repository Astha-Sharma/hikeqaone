import Uri from 'jsuri';
import validator from './validator.js';
var _ = require('underscore');

export function getValue(obj){
    let value = null;
    if(!obj)
        return "";
    if(obj.type==='MyReactSelect'){
        if(Array.isArray(obj.value)){
            value = obj.value.map(item=>{
                return item.value.trim();
            })
        }
        else if(obj.value!=null && typeof obj.value=='object'){
            if (typeof obj.value.value === "number"){
                value = obj.value.value;
            }else{
                value = obj.value.value.trim();
            }
        }else if(obj.value!=null && typeof obj.value=='string'){
            value = obj.value.trim();
        }
        else if(obj.value!=null && typeof obj.value=='number'){
            value = obj.value;
        }
    }
    else{
        value = obj.value;
    }
    if(!value){
        value="";
    }
    if(typeof value==='string')
        value=value.trim();
    return value;
}

function getIndCompQuery(key, operator, item){
    if(operator==='.eq:'){
        return key+operator+item;
    }
    else if(operator==='.like:'){
        return key+operator+'%25%25'+item+'%25%25';
    }
}

function getCompQuery(key, obj){
    let query=""
    let valueComp = getValue(obj);
    let first = true;
    let operator = obj.operator?obj.operator:'.eq:';
    if(valueComp===null || valueComp===undefined || valueComp==='' || valueComp===[])
        return "";
    if(Array.isArray(valueComp)){
        valueComp.map(item=>{
           if(first===true){
               query+=getIndCompQuery(key, operator, item);
               first= false;
           }
            else{
               query+='___'+getIndCompQuery(key, operator, item);
           }
        });
    }
    else{
        query+=getIndCompQuery(key, operator, valueComp);
    }
    return query;
};

export function setValidationResult(props, obj, callback){
    let newProps = {};
    _.extend(newProps, props, obj);
    let validationResult = validator.validate(newProps, obj.value);
    newProps.validationResult = validationResult;
    this.setState({
        ...obj,
        validationResult: validationResult
    })
    callback && callback(newProps);
};

export function buildQuery(data){
    var url = new Uri();
    var first = true;
    for(let key in data){
        if(data[key].type==='MyButton')
            continue;
        let value = data[key];
        let compValue = getValue(value);
        if(Array.isArray(compValue)){
            compValue.map(item=>{
                url.addQueryParam(key, item);
            });
        }
        else{
            url.addQueryParam(key, compValue);
        }
    }
    console.log('in build query '+url.toString());
    return url.toString();
};

export function getSearchQuery(data){
    let query = "";
    let first = true;
    for(let key in data){
        if(data[key].type==='MyButton')
            continue;
        let indQuery = getCompQuery(key, data[key]);
        if(indQuery==="")
            continue;
        if(first===true){
            query+=indQuery;
            first = false;
        }
        else{
            query+='___'+indQuery;
        }
    }
    return query;
};
