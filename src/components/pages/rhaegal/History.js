import React, {Component, PropTypes} from 'react';
import {getAllRuns } from '../../../actions/rhaegal/history'
import '../../../css/summary-report/summary.css';
import {connect} from 'react-redux';
import MyForm from '../../MyForm';
import Immutable from 'immutable';
import historyConstants from "../../../constants/rhaegal/historyConstants";
import AddSuiteConstants from '../../../constants/rhaegal/addSuiteConstants';
import {getAllNameSpaces, getComponentsForNameSpace, getSuitesDetails} from '../../../actions/rhaegal/createSuite'
import { ToastContainer, toast } from 'react-toastify';
import PageTitle from '../../PageTitle';

class History extends Component {
    constructor(props) {
        super(props);
        var formData = {
            nameSpaces: {
                "label": "Namespaces *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "className":"metricCollectionSelect",
                "mandatory": true,
                "multiSelect": false
            },
            components: {
                "label": "Components *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "mandatory": true,
                "multi": false,
                "selectType": "Creatable",
                "placeholder": "Select Existing/ Add New Component..."
            },
            suites: {
                "label": "Suites *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "mandatory": true,
                "multi": false,
                "selectType": "Creatable",
                "placeholder": "Select Suite.."
            },
            runs: {
                "label": "Runs List",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "mandatory": true,
                "multi": false,
                "selectType": "Creatable",
                "placeholder": "Select a Particular Run"
            },
            submit: {
                "label": "Get Run Details" ,
                "type": "MyButton",
                "theme": "green",
                "className": "cceButton pull-left",
                "buttonType": "submit",
                "disabled": false
            },
        };

        this.state = {
            runId : "",
            suiteId:"",
            runHistoryDetails: {},
            nameSpace:"",
            components: "",
            suites:"",
            formConfig:{
                data:formData,
                onChange: this.handleOnChange,
                onClick: this.submitRun,
                showLoading: false,
                flow:"horizontal"
            },
            suiteResponse: {}
        }

    }

    componentDidMount(){
        var { dispatch } = this.props;
/*
        console.log("this.props  aya ###=========>", this.props);
        if(this.props.suite.suiteLabels !== undefined && this.props.suite.suiteLabels.length > 0){
            console.log("this.props  Value   sasasasa ###=========>", this.props.suite.suitesLabels.value);
            let formConfig = this.state.formConfig;
            formConfig.data.nameSpaces.options = this.props.suite.nameSpacesLabels;
            formConfig.data.components.options = this.props.suite.componentLabels;
            formConfig.data.suites.options = this.props.suite.suitesLabels;
            this.setFormConfigLoader(false, formConfig);
            return
        }
*/
        this.setFormConfigLoader(true);
        Promise.all([dispatch(getAllNameSpaces())]).then((result)=>{
            let formConfig = this.state.formConfig;
            if (result[0].type === AddSuiteConstants.GET_NAMESPACE_FULFILLED ){
                let {nameSpacesLabels} = this.props.suite;
                formConfig.data.nameSpaces.options = nameSpacesLabels;
                this.setFormConfigLoader(false, formConfig);
            } else{
                this.setFormConfigLoader(false);
                toast.info("Unable to Fetch NameSpaces .., Please check Service is running fine")
            }
        });
    }

    setFormConfigLoader(bool, formConfigInp){
        let formConfig = formConfigInp? formConfigInp : this.state.formConfig;
        formConfig.showLoading = bool;
        formConfig.data.submit.disabled = bool;
        this.setState({formConfig: formConfig});
    }

    handleOnChange=(x,y,z) =>{
        console.log("changing form value....",x,y,z)
        let {dispatch} = this.props;
        let {formConfig} = this.state;
        if (x.elementId === "nameSpaces"){
            let nameSpaceSelected = Object.values(y.data.nameSpaces.value)[0];
            if(nameSpaceSelected!==undefined){
                dispatch(getComponentsForNameSpace(nameSpaceSelected)
                ).then(
                    (result)=>{
                        if (result.type === AddSuiteConstants.GET_COMPONENT_FULFILLED){
                            let {componentLabels} = this.props.suite;
                            formConfig.data.components.value="";
                            formConfig.data.components.options = componentLabels;
                            this.setFormConfigLoader(false, formConfig);
                        }else if (result.type === AddSuiteConstants.GET_COMPONENT_REJECT) {
                            toast.warn("error while getting apis response...");
                            this.setFormConfigLoader(false, formConfig);
                        }
                    }
                );
            }
        }
        else if (x.elementId === "components"){
            let nameSpaces = Object.values(y.data.nameSpaces.value)[0]
            let components = Object.values(y.data.components.value)[0];
            if(components!==undefined){
                dispatch(getSuitesDetails(nameSpaces, components)
                ).then(
                    (result)=>{
                        if (result.type === AddSuiteConstants.GET_SUITES_FULFILLED){
                            let {suiteLabels} = this.props.suite;
                            formConfig.data.suites.options = suiteLabels;
                            this.setFormConfigLoader(false, formConfig);
                        }else if (result.type === AddSuiteConstants.GET_SUITES_REJECT) {
                            toast.warn("error while getting apis response...");
                            this.setFormConfigLoader(false, formConfig);
                        }
                    }
                );
            }
        }
        else if (x.elementId === "suites"){
            let suites = Object.values(y.data.suites.value)[1];
            if(suites!==undefined){
                dispatch(getAllRuns(suites)).then((result)=>{
                    if (result.type === historyConstants.GET_RUN_RESULTS_FULFILLED) {
                        let {runListLabels} = this.props.runHistory;
                        formConfig.data.runs.options = runListLabels;
                        this.setFormConfigLoader(false, formConfig);
                    }else {
                        this.setFormConfigLoader(false);
                    }
                });
            }
        }

    }

    submitRun = (e) => {
        this.setFormConfigLoader(true);
        this.state.runId = e.data.runs.value.value
        this.props.history.push("history/"+this.state.runId)
    }

    render() {
        console.log("this.props render aya ###=========>", this.props);
        return (
            <div>
                <PageTitle title="яεsυℓт нιsσтяү" rightRender={null} />

                <ToastContainer style={{width: '500px', top: '20%'}} autoClose={5000}/>
                <div>
                    <MyForm title="Get Run Details " {...this.state.formConfig}/>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    let suite = state.TestSuite;
    let runHistory = state.History;
    return {
        suite: Immutable.Map.isMap(suite) ? suite.toJS() : suite,
        runHistory: Immutable.Map.isMap(runHistory) ? runHistory.toJS() : runHistory
    }
})(History);
