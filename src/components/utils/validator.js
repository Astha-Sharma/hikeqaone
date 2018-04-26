class Validator {
    constructor(){
        this.validate = this.validate.bind(this);
    };

    validateMandatory(props, value){
        let answer = true;
        if(value===null || value===undefined)
            answer = false;
        if(props.type === 'MyInput' && value==="")
            answer = false;
        return answer;
    };

    validateRegex(props, value){
        let answer = true;
        let regex = new RegExp(props.regex);
        return regex.test(value);
    };

    validate(props, value){
        let error = props.errorMessage?props.errorMessage:"Invalid "+props.label;
        if(props.regex)
            if(this.validateRegex(props, value) === false)
                return {statusType: "ERROR", statusMessage:error};
        if(props.mandatory){
            if(this.validateMandatory(props, value) === false)
                return {statusType: "ERROR", statusMessage:error};
        }
        if(props.customValidator){
            return props.customValidator(props, value);
        }
        return {statusType: "SUCCESS", statusMessage:''};
    };
}

export default new Validator();