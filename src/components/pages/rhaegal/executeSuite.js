import React,{Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import Tile from '../../Tile';
import MyForm from '../../MyForm'
import {getSuiteDetails, getHardwareAvailability,stopCurrentTest} from '../../../actions/rhaegal/executeSuite.js'
import ExecuteSuiteConstants from '../../../constants/rhaegal/executeSuiteConstants';
import {updateTestSuite, deleteTestSuite} from "../../../actions/rhaegal/createSuite";
import common from "../../../utils/common";
import Steps, { Step } from 'rc-steps';
import MyPortlet from '../../MyPortlet';
import MyFormDialog from '../../MyFormDialog';
import { ToastContainer, toast } from 'react-toastify';
import PageTitle from '../../PageTitle';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

class ExecuteSuite extends Component{

    constructor(props){
        super(props);

        var formDataExec = {
            threads: {
                "label": "Threads *",
                "type": "MyInput",
                "value": "1",
                "placeholder":"No of users",
                "mandatory": true,
                "multiSelect": false
            },
            duration: {
                "label": "Duration* (sec)",
                "type": "MyInput",
                "placeholder":"Duration of your test",
                "value": "-1",
                "mandatory": true,
                "multiSelect": false
            },
            rampup: {
                "label": "Ramp Up (sec) ",
                "type": "MyInput",
                "placeholder":"Ramp up in seconds",
                "value": "1",
                "mandatory": false,
                "multiSelect": false
            },
            iteration: {
                "label": "Iteration ",
                "type": "MyInput",
                "value": "-1",
                "placeholder":"Excepted peak per min",
                "mandatory": false,
                "multiSelect": false
            },
            throughput: {
                "label": "Throughput ",
                "type": "MyInput",
                "value": "-1",
                "placeholder":"Excepted peak per min",
                "mandatory": false,
                "multiSelect": false
            },
            commandLineParam: {
                "label": "Command Line Param ",
                "type": "MyInput",
                "value": "",
                "placeholder":"-DKey=Value  -JKey=Value",
                "mandatory": false,
                "multiSelect": false,
                "info": ["-D[prop_name]= [value]" +
                " defines a java system property value.",
                "-J[prop_name]=[value] " +
                " defines a local JMeter property." ,
                "-G[prop_name]=[value]" +
                " defines a JMeter property to be sent to all remote servers." ,
                "-G[propertyfile]" +
                " defines a file containing JMeter properties to be sent to all remote servers." ,
                "-L[category]=[priority] overrides a logging setting, setting a particular category to the given priority level." ,
                "The -L flag can also be used without the category name to set the root logging level."]
            },
            submit: {
                "label": "Execute Test" ,
                "type": "MyButton",
                "theme": "green",
                "buttonType": "submit",
                "disabled": false,
                "className": "cceButton pull-left"
            },
            stoptest: {
                "label": "Stop Test" ,
                "type": "MyButton",
                "theme": "red",
                "buttonType": "submit",
                "disabled": true,
                "className": "cceButton pull-right"
            }
        };

        var formDataEdit = {
            suiteName: {
                "label": "Name *",
                "type": "MyInput",
                "value": "",
                "mandatory": true,
                "multiSelect": false,
                "disabled": true
            },
            nameSpaces: {
                "label": "Namespaces *",
                "type": "MyInput",
                "value": "",
                "mandatory": true,
                "multiSelect": false,
                "disabled": true
            },
            components: {
                "label": "Components *",
                "type": "MyInput",
                "value": "",
                "mandatory": true,
                "multiSelect": false,
                "placeholder": "Select Existing/ Add New Component...",
                "disabled": true
            },
            uploadyourjmx: {
                "type": "MyFileInput",
                "theme": "green",
                "label": "Upload JMX",
                "multiSelect": false,
                "mandatory": true
            },
            csvtestdata: {
                "type": "MyFileInput",
                "theme": "green",
                "label": "Upload Test Data",
                "multiSelect": false,
                "mandatory": false
            },
            submit: {
                "label": "Create Test" ,
                "type": "MyButton",
                "theme": "btn-dark",
                "className": "cceButton pull-right",
                "buttonType": "submit",
                "disabled": false
            }
        };

        this.state= {
            status: null,
            suiteData: {},
            editBtnStatus: false,
            deleteBtnStatus: false,
            isNavigateToExecuteSuite: false,
            indents: null,
            tileData: null,
            closeModal: false,
            formConfigExec:{
                data:formDataExec,
                onClick: this.submitSuite,
                showLoading: false,
                flow: 'horizontal',
                processflowVisible: false
            },
            formConfigEdit:{
                data: formDataEdit,
                onClick: this.updateSuite,
                showLoading: false,
                flow: 'vertical'
            },
        };
        this.suiteResponse = null;
    }

    setFormUpdateConfigLoader(bool, formConfigInp){
        let formConfigEdit = formConfigInp? formConfigInp : this.state.formConfigEdit;
        formConfigEdit.showLoading = bool;
    }

    setFormConfigExecLoader(bool, formConfigInp){
        let formConfig = formConfigInp? formConfigInp : this.state.formConfigExec;
        formConfig.showLoading = bool;
        formConfig.data.submit.disabled = bool;
        formConfig.data.cancel.disabled = bool;
        this.setState({formConfigExec: formConfig});
    }


    createTagLabel =(data) =>{
        let testDataLabels = data.map((csv)=>{
            return {
                label: 'testData',
                value: csv
            }
        });
        return testDataLabels;
    }

    updateSuite = (e) => {
        if(e.elementId === "submit"){
            this.setFormUpdateConfigLoader(true);
            var newTestSuite = {
                suiteName: common.parseValueFormEventObj(e.data.suiteName),
                nameSpaces: common.parseValueFormEventObj(e.data.nameSpaces),
                createdBy : 'System',
                components: common.parseValueFormEventObj(e.data.components),
                jmxFile: e.data.uploadyourjmx.value && e.data.uploadyourjmx.value[0],
                csvFile: e.data.csvtestdata.value && e.data.csvtestdata.value[0]
            }
            var { dispatch } = this.props;
            dispatch(updateTestSuite(newTestSuite)).then(
                (result)=>{
                    let {suite} = this.props;
                    if (result.type === "UPDATE_SUITE_FULFILLED" && suite.suiteCreationStatus === "SUCCESS" ) {
                        this.setFormUpdateConfigLoader(false);
                        alert("Suite Updated Successfully");
                        dispatch(getSuiteDetails(newTestSuite.nameSpaces, newTestSuite.components, newTestSuite.suiteName)).then((result)=>{
                            let tileData = this.props.executeSuite.executeSuiteStore.suiteResponse.data;
                            var indents =  this.pushTileData(tileData)
                            this.setState({indents: indents, tileData: tileData});
                        });
                        this.setState({closeModal: true})
                    }else{
                        let status=JSON.parse(result.data.body.text);
                        let resp=JSON.parse(JSON.stringify(status));
                        alert("Error while Updating your suite.Pls contact admin! ===>"+JSON.stringify(resp.status.devErrorMessage) +" Please change the JMX File name and Try");
                        this.setFormUpdateConfigLoader(false);
                    }
                    this.setState({closeModal: false})
                }
            );
        }
    }

    submitSuite = (e) => {
        var { dispatch } = this.props;
        if(e.elementId === "submit"){
            let formConfig = this.state.formConfigExec;
            formConfig.data.submit.disabled = true;
            formConfig.data.stoptest.disabled = false;
            formConfig.processflowVisible = true
            this.setState({formConfigExec: formConfig, editBtnStatus: true, deleteBtnStatus: true});
            let suiteResponse = this.props.executeSuite.executeSuiteStore.suiteResponse.data;
            var payload = {
                "threads"    :  parseInt(this.state.formConfigExec.data.threads.value),
                "duration"   :  parseInt(this.state.formConfigExec.data.duration.value),
                "rampup"     :  parseInt(this.state.formConfigExec.data.rampup.value),
                "throughPut" :  parseInt(this.state.formConfigExec.data.throughput.value),
                "iteration"  :  parseInt(this.state.formConfigExec.data.iteration.value),
                "suiteName"  : suiteResponse.suiteName,
                "dataFiles"  : suiteResponse.dataFiles,
                "createdBy"  : "abhijit.p@swiggy.in"
            }

            Promise.all([getHardwareAvailability(payload, dispatch)]).then((result)=>{
                if(result[0].status.statusType === "SUCCESS"){
                    toast.info("Starting Load Test !");
                }else{
                    let formConfig = this.state.formConfigExec;
                    formConfig.data.submit.disabled = false;
                    formConfig.data.stoptest.disabled = true;
                    formConfig.processflowVisible = false;
                    this.setState({formConfigExec: formConfig, editBtnStatus: false, deleteBtnStatus: false});
                    toast.error(result[0].status.devErrorMessage, {autoClose:5000});
                }
            })

        }else if(e.elementId === "stoptest"){
            console.log("Stop Test ##### ", this.props.executeSuite.executeSuiteStore.executeResponse)
            if(typeof this.props.executeSuite.executeSuiteStore.executeResponse !== 'undefined' && typeof this.props.executeSuite.executeSuiteStore.executeResponse.data !== 'undefined'){
                let runid = this.props.executeSuite.executeSuiteStore.executeResponse.data.runId
                console.log("Stopping run id=--->>>>",runid);
                Promise.all([dispatch(stopCurrentTest(runid))]).then((result)=>{
                    if (result[0].type===ExecuteSuiteConstants.STOP_TEST_FULFILLED){
                        let data = JSON.parse(result[0].data.body.text);
                        if(data.status.statusType==="SUCCESS"){
                            toast.info("Test Stopped Successfully!", {
                                autoClose:2000,
                            });
                            let formConfig = this.state.formConfigExec;
                            formConfig.data.submit.disabled = false;
                            formConfig.data.stoptest.disabled = true;
                            formConfig.processflowVisible = false;
                            this.setState({formConfigExec: formConfig});
                        }else{
                            toast.error("Error While Stopping Test");
                        }
                    }else{
                        toast.error("Error While Stopping Test");
                    }
                });
            }else{
                let formConfig = this.state.formConfigExec;
                formConfig.data.submit.disabled = false;
                formConfig.data.stoptest.disabled = true;
                formConfig.processflowVisible = false;
                this.setState({formConfigExec: formConfig, editBtnStatus: false, deleteBtnStatus: false});
                toast.info("Test Stopped Successfully!", {
                    autoClose:2000,
                });
            }
        }
    }

    pushTileData(tileData){
        var indents = [];
        if(tileData!="" && tileData != undefined){
            let secondaryValue=this.createTagLabel(tileData.testData ? tileData.testData : []);
            secondaryValue.push({label: 'JMX', value: tileData.jmxFileName});
            secondaryValue.push({label: 'Created By', value: tileData.createdBy});
            indents.push(<Tile key="suitedetails" theme="#005180" title = 'Suites Details' primary={{label: 'Suite Name', value: tileData.suiteName}} secondary={secondaryValue} />);
        }
        return indents
    }

    componentDidMount(){
        var { dispatch } = this.props;
        let isFailed = false
        dispatch(getSuiteDetails(this.props.match.params.namespaceName, this.props.match.params.componentName, this.props.match.params.suiteName)).then((result)=>{
            if(result.type === ExecuteSuiteConstants.GET_SUITE_FULFILLED) {
                var suiteResponse = this.props.executeSuite.executeSuiteStore.suiteResponse
                if (suiteResponse.status.statusType === 'SUCCESS'){
                    var tileData = suiteResponse.data;
                    let indents = this.pushTileData(tileData)
                    this.setState({indents: indents, tileData: tileData});
                    this.handleUpdateSuite()
                }else{
                    isFailed = true
                    alert("Unable Find the Suite Details, Navigating to Execute Suite Page")
                }
            }else{
                isFailed = true
                alert("Unable Find the Suite Details, Navigating to Execute Suite Page")
            }
            //console.log("sasdadswewe2323232", isFailed)
            this.setState({isNavigateToExecuteSuite : isFailed})
        });
    }

    handleDeleteSuite=(e) =>{
        var tileData = this.state.tileData
        if(tileData!=""){
            var { dispatch } = this.props;
            dispatch(deleteTestSuite(tileData.namespace, tileData.component, tileData.suiteName)).then((result)=>{
                if (result.type === "DELETE_SUITE_FULFILLED") {
                    alert("Suite Deleted Successfully");
                    this.componentDidMount()
                }
            });
        }
    }

    handleUpdateSuite=() =>{
        var tileData = this.state.tileData
        if(tileData != "" && tileData != undefined){
            let formConfigEdit = this.state.formConfigEdit;
            formConfigEdit.data.suiteName.value = tileData.suiteName
            formConfigEdit.data.nameSpaces.value = tileData.namespace
            formConfigEdit.data.components.value = tileData.component
            this.setState({formConfigEdit: formConfigEdit});
        }
    }

    render(){
        return (
            <div>
                <PageTitle title="𝔈𝔵𝔢𝔠𝔲𝔦𝔱𝔢 𝔖𝔲𝔦𝔱𝔢" rightRender={null} />
                <ToastContainer style={{width: '500px', top: '30%'}} />
                <div>
                    {this.state.indents}
                    <div style={{'text-align': "center"}}>
                        <button className={"btn btn-sm green"} disabled={this.state.editBtnStatus} ref={'btn'}>
                            {this.state.editBtnStatus != true ?
                                <MyFormDialog isCloseModal={this.state.closeModal} icon="fa fa-edit" label='Edit Suite' formConfig={this.state.formConfigEdit} ></MyFormDialog> : 'Edit Suite'
                            }
                        </button>
                        {/*
                                    <button className={"btn btn-sm red"} onClick={this.handleDeleteSuite}
                                            disabled={this.state.deleteBtnStatus} ref={'btn'}>
                                        Delete Suite
                                    </button>
                                    */}
                    </div>
                    <br/>
                    <div><MyForm title="Test Configuration" {...this.state.formConfigExec} /></div>
                    {this.state.formConfigExec.processflowVisible ?
                        <MyPortlet title="Execution Flow">
                            <Steps size="small" labelPlacement="vertical" current={this.props.executeSuite.executeSuiteStore.flowCurrent} status={this.props.executeSuite.executeSuiteStore.flowStatus}  style={{color:'green', marginTop: 0 }}>
                                <Steps.Step  title="cнεcк нαя∂ωαяε αvαιℓαвιℓιтү" />
                                <Steps.Step  title="sтαятιηg ιηsтαηcεs"/>
                                <Steps.Step  title="prєpαríng чσur tєѕt"/>
                                <Steps.Step  title="sтαятιηg ℓσα∂"/>
                            </Steps>
                        </MyPortlet> : ''}
                </div>

                {this.props.executeSuite !== undefined && this.props.executeSuite.executeSuiteStore !== undefined &&
                this.props.executeSuite.executeSuiteStore.flowStatus !== undefined  &&
                this.props.executeSuite.executeSuiteStore.flowCurrent === 4?
                    <div>
                        {this.props.history.push("/rhaegal/summary/"+this.props.executeSuite.executeSuiteStore.executeResponse.data.runId)}
                    </div>
                    : ''}
                {this.state.isNavigateToExecuteSuite ?
                    <div>
                        {this.props.history.push("/rhaegal/execute")}
                    </div>
                    : ''}
            </div>
        );
    }


}

export default connect (state => {
    let executeSuite = state.ExecuteSuite;
    let suite = state.TestSuite;
    return {
        executeSuite: Immutable.Map.isMap(executeSuite) ? executeSuite.toJS() : executeSuite,
        suite: Immutable.Map.isMap(suite) ? suite.toJS() : suite
    }
})(ExecuteSuite)
