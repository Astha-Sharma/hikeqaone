import React, { Component } from 'react';
import MyForm from '../../MyForm'
import {connect} from 'react-redux';
import {getAllNameSpaces ,getComponentsForNameSpace,createTestSuite } from '../../../actions/rhaegal/createSuite.js'
import AddSuiteConstants from '../../../constants/rhaegal/addSuiteConstants'
import PageTitle from '../../PageTitle';
import Immutable from 'immutable';
import common from '../../../utils/common';



class AddSuite extends Component {
    constructor(props){
        super(props)
        var formData = {
            suiteName: {
                "label": "Name *",
                "type": "MyInput",
                "value": "",
                "placeholder":"No Space Allowed",
                "mandatory": true,
                "multiSelect": false,
            },
            suiteDescription: {
                "label": "Description",
                "type": "MyInput",
                "placeholder":"One Liner About Your Test Suite",
                "value": "",
                "mandatory": true,
                "multiSelect": false
            },
            nameSpaces: {
                "label": "Namespaces *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "className":"metricCollectionSelect",
                "mandatory": true,
                "multiSelect": false,
                "placeholder": "Select Existing NameSpace..."
            },
            components: {
                "label": "Components *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "mandatory": true,
                "multi": false,
                "selectType": "Creatable",
                "placeholder": "Select Existing Component..."
            },
            uploadyourjmx: {
                "type": "MyFileInput",
                "theme": "green",
                "label": "Upload Your JMX",
                "multiSelect": false,
                "mandatory": true,
                "info": "Support till Jmeter Version 4.0. Please do not add any result Listener  " +
                "or throughput controller in JMX file "
            },
            csvtestdata: {
                "type": "MyFileInput",
                "theme": "green",
                "label": "Upload Data(.csv/.zip)",
                "multiSelect": false,
                "mandatory": false,
                "info": "upload multiple files in zip format and the files should not be in nested directory"
            },
            cancel: {
                "label": "Cancel" ,
                "type": "MyButton",
                "theme": "red",
                "className": "cceButton pull-left",
                "disabled": false
            },
            submit: {
                "label": "Create Test" ,
                "type": "MyButton",
                "theme": "green",
                "className": "cceButton pull-left",
                "buttonType": "submit",
                "disabled": false
            }
        };
        this.state={
            checkboxValue:true,
            radioValue:"",
            status:null,
            loadExecutePage : false,
            namespace : "",
            component : "",
            suiteName : "",
            formConfig:{
                data:formData,
                onChange: this.handleOnChange,
                onClick: this.submitSuite,
                showLoading: false,
                flow:"vertical"
            }
        }
    }
    componentDidMount(){
        var { dispatch } = this.props;
        //console.log("this.props=========>",this.props);
        this.setFormConfigLoader(true);
        Promise.all([dispatch(getAllNameSpaces())]).then((result)=>{
            let formConfig = this.state.formConfig;
            if (result[0].type === AddSuiteConstants.GET_NAMESPACE_FULFILLED ){
                let {nameSpacesLabels} = this.props.suite;
                formConfig.data.nameSpaces.options = nameSpacesLabels;
                this.setFormConfigLoader(false, formConfig);
            } else{
                alert("Rhaegal BackEnd Service is Down")
                this.setFormConfigLoader(true);
            }
        });
    }

    setFormConfigLoader(bool, formConfigInp){
        let formConfig = formConfigInp? formConfigInp : this.state.formConfig;
        formConfig.showLoading = bool;
        formConfig.data.submit.disabled = bool;
        formConfig.data.cancel.disabled = bool;
        this.setState({formConfig: formConfig});
    }

    closeModal=()=>{

    }

    handleOnChange=(x,y,z) =>{
        let {dispatch} = this.props;
        let {formConfig} = this.state;
        if (x.elementId === "nameSpaces"){
            let nameSpaceSelected = Object.values(y.data.nameSpaces.value)[0];
            if(nameSpaceSelected!==undefined){
                dispatch(getComponentsForNameSpace(nameSpaceSelected)
                ).then(
                    (result)=>{
                        if (result.type===AddSuiteConstants.GET_COMPONENT_FULFILLED){
                            let {componentLabels} = this.props.suite;
                            formConfig.data.components.value="";
                            formConfig.data.components.options = componentLabels;
                            this.setFormConfigLoader(false, formConfig);
                        }else if (result.type===AddSuiteConstants.GET_COMPONENT_REJECT) {
                            //console.log("error while getting apis response...");
                        }

                    }
                );
            }
        }
        else{
            //  console.log("kuch mat kar...");
        }
    }
    submitSuite = (e) => {
        if (e.elementId ==="cancel"){
            this.closeModal();
        }else if(e.elementId === "submit"){
            this.setFormConfigLoader(true);
            if(common.parseValueFormEventObj(e.data.suiteName)!=""){
                var newTestSuite = {
                    suiteName: common.parseValueFormEventObj(e.data.suiteName),
                    description: common.parseValueFormEventObj(e.data.suiteDescription),
                    nameSpaces: common.parseValueFormEventObj(e.data.nameSpaces),
                    createdBy : 'System',
                    components: common.parseValueFormEventObj(e.data.components),
                    jmxFile: e.data.uploadyourjmx.value && e.data.uploadyourjmx.value[0],
                    csvFile: e.data.csvtestdata.value && e.data.csvtestdata.value[0]
                }
                var { dispatch } = this.props;
                dispatch(createTestSuite(newTestSuite)).then((result)=>{
                        let {suite} = this.props;
                        if (result.type==="CREATE_SUITE_FULFILLED" && suite.suiteCreationStatus==="SUCCESS" ) {
                            this.setFormConfigLoader(false);
                            alert("Suite Created Successfully");
                            this.setState({loadExecutePage : true, namespace: newTestSuite.nameSpaces, component: newTestSuite.components, suiteName: newTestSuite.suiteName})
                        }else{
                            let status=JSON.parse(result.data.body.text);
                            let resp=JSON.parse(JSON.stringify(status));
                            alert("Error while creating your suite.Pls contact admin! ===>"+JSON.stringify(resp.status.errorMessage));
                            this.setFormConfigLoader(false);
                            //console.log("Error while Creating your suite.Pls contact admin!===>",resp.status.errorMessage);
                        }
                    }
                );
            }else{
                this.setFormConfigLoader(false);
            }}
    }

    render() {
        return (
            <div className="App">
                <PageTitle title="ℭ𝔯𝔢𝔞𝔱𝔢 𝔜𝔬𝔲𝔯 𝔙𝔢𝔯𝔱𝔦𝔠𝔞𝔩 𝔏𝔬𝔞𝔡 𝔗𝔢𝔰𝔱 " rightRender={null} />
                <MyForm title="Customize Your Suite" {...this.state.formConfig}/>
                {this.state.loadExecutePage ?
                    <div>
                        {this.props.history.push("/rhaegal/execute/namespace/"+this.state.namespace+"/component/"+this.state.component+"/suite/"+this.state.suiteName)}
                    </div> : null
                }
            </div>
        );
    }
}

export default connect(state => {
    let suite = state.TestSuite;
    return {
        suite: Immutable.Map.isMap(suite) ? suite.toJS() : suite
    }
})(AddSuite);