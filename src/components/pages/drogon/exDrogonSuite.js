import React,{Component} from 'react';
import {connect} from 'react-redux';
import MyForm from '../../MyForm';
import {getAllComponents,getSuitesForComponent,getSuitesDetails,getHardwareAvailability,stopLoadTest} from '../../../actions/drogon/exDrogonSuite'
import ExDrogonSuiteConstants from '../../../constants/drogon/exDrogonSuiteConstants';
import Immutable from 'immutable';
import common from '../../../utils/common';
import PageTitle from '../../PageTitle';
import JsonDialog from "./JsonDialog";
import Steps, { Step } from 'rc-steps';
import MyPortlet from '../../MyPortlet';
import { ToastContainer, toast } from 'react-toastify';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import ReactLoading from 'react-loading';
const Icon = ({ type }) => <i className={`rcicon rcicon-${type}`} />;

class ExDrogonSuite extends Component{
    constructor(props){
        super(props);

        var formData = {
            components: {
                "label": "Component *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "className":"metricCollectionSelect",
                "mandatory": true,
                "multiSelect": false,
                "disabled": false
            },
            suites: {
                "label": "Suites *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "className":"metricCollectionSelect",
                "mandatory": true,
                "multiSelect": false,
                "disabled": false
            },
            submit: {
                "label": "Fetch Details" ,
                "type": "MyButton",
                "theme": "green",
                "className": "cceButton pull-left",
                "buttonType": "submit",
                "disabled": false
            }
        };
        var formConfigExecData = {
            goroutines: {
                "label": "GoRoutines *",
                "type": "MyInput",
                "value": "1",
                "placeholder":"No of users",
                "mandatory": true,
                "multiSelect": false
            },
            duration: {
                "label": "Duration * (sec)",
                "type": "MyInput",
                "placeholder":"Duration of your test",
                "value": "20",
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
            submit: {
                "label": "Dracarys" ,
                "type": "MyButton",
                "theme": "green",
                "buttonType": "submit",
                "disabled": false,
                "className": "cceButton pull-left"
            },
            stoptest: {
                "label": "Hodor" ,
                "type": "MyButton",
                "theme": "red",
                "buttonType": "submit",
                "disabled": true,
                "className": "cceButton pull-right"
            }
        };


        this.state= {
            status: null,
            editBtnStatus:true,
            suiteName:"",
            formConfig:{
                data: formData,
                onChange: this.handleOnChange,
                onClick: this.customizeSuite,
                showLoading: false,
                conversionConfig:"{}",
                apiConfig:"{}",
                flow: 'vertical',
                isExecuteSuiteTileEnabled:false,
                isSelectSuiteTileEnabled:true,
            },
            formConfigExecutionData:{
                data:formConfigExecData,
                onClick: this.submitSuite,
                showLoading: false,
                flow: 'horizontal',
                processflowVisible:false,
            },
            processFlow:{
                current:0,
                status:"process",

            }

        };
        this.suiteResponse = null;
    }

    setFormConfigLoader(bool, formConfigInp){
        let formConfig = formConfigInp? formConfigInp : this.state.formConfig;
        formConfig.showLoading = bool;
        this.setState({formConfig: formConfig});
    }

    handleOnChange=(x,y,z) =>{
        console.log("got Drogon ->changing form value....",x,y,z)
        let {dispatch} = this.props;
        let {formConfig} = this.state;
        if (x.elementId === "components"){
            let componentSelected = Object.values(y.data.components.value)[0];
            if(componentSelected !== undefined){
                dispatch(getSuitesForComponent(componentSelected)
                ).then(
                    (result)=>{
                        if (result.type === ExDrogonSuiteConstants.GET_SUITE_FULFILLED){
                            let {suitesLabels} = this.props.drogonSuite;
                            formConfig.data.suites.options = suitesLabels;
                            this.setFormConfigLoader(false, formConfig);
                        }else if (result.type === ExDrogonSuiteConstants.GET_SUITE_REJECT) {
                            console.log("Error While Getting Response From Apis...");
                        }
                    }
                );
            }
        }
    }

    customizeSuite = (e) => {
        if(e.elementId === "submit"){
            this.setFormConfigLoader(true);
            if(common.parseValueFormEventObj(e.data.suites)!=""){
                var newTestSuite = {
                    componentsName: common.parseValueFormEventObj(e.data.components),
                    suites: common.parseValueFormEventObj(e.data.suites)
                }
                var { dispatch } = this.props;
                this.setState({editBtnStatus: false,suiteName:common.parseLabelFormEventObj(e.data.suites)});
                dispatch(getSuitesDetails(newTestSuite.componentsName,newTestSuite.suites)).then(
                    (result)=>{
                        let {drogonSuite} = this.props;
                        let {formConfig} = this.state;
                        formConfig.apiConfig=JSON.parse(drogonSuite.suiteDetails.data.apiConfig);
                        formConfig.conversionConfig=JSON.parse(drogonSuite.suiteDetails.data.conversionConfig);
                        formConfig.isExecuteSuiteTileEnabled=true
                        this.setFormConfigLoader(false, formConfig);
                    }
                );
            }}
    }

    submitSuite = (e) => {
        var { dispatch } = this.props;
        if(e.elementId === "submit"){
            let formConfig = this.state.formConfig;
            let excutionFormConfig = this.state.formConfigExecutionData;
            excutionFormConfig.data.submit.disabled = true;
            excutionFormConfig.data.stoptest.disabled = false;
            excutionFormConfig.processflowVisible=true;
            formConfig.isSelectSuiteTileEnabled=false;
            formConfig.isExecuteSuiteTileEnabled=true;
            this.setState({formConfigExecutionData: excutionFormConfig, formConfig:formConfig});
            console.log(this.props,"Executing your test...!!!!====",e)
            var payload = {
                "goroutines": parseInt(this.state.formConfigExecutionData.data.goroutines.value),
                "duration" : parseInt(this.state.formConfigExecutionData.data.duration.value),
                "rampup" : parseInt(this.state.formConfigExecutionData.data.rampup.value),
                "suiteName" : this.state.suiteName,
                "apiConfig" : this.state.formConfig.apiConfig,
                "conversionConfig":this.state.formConfig.conversionConfig,
                "createdBy" : 'system'
            }
            //console.log("payload====",payload)
            Promise.all([getHardwareAvailability(payload, dispatch)]).then((result)=>{
               console.log("aaya result===========",result);
                toast.success("Load Test Started !", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose:2000,
                });
            })
        }else if(e.elementId === "stoptest"){
            console.log("#####  Stop Test ##### ", this.props.drogonSuite.executeSuiteResponse)
            if(this.props.drogonSuite.executeSuiteResponse !== undefined && this.props.drogonSuite.executeSuiteResponse.data.runId !== undefined){
                let runid = this.props.drogonSuite.executeSuiteResponse.data.runId
                console.log("##### Stopping Run Id #####====>",runid);
                Promise.all([dispatch(stopLoadTest(runid))]).then((result)=>{
                    if (result[0].type===ExDrogonSuiteConstants.STOP_DROGON_TEST_FULFILLED){
                        let data = JSON.parse(result[0].data.body.text);
                        if(data.status.statusType==="SUCCESS"){
                            toast.success("Test Stopped Successfully!", {
                                position: toast.POSITION.BOTTOM_CENTER,
                                autoClose:2000,
                            });
                            let excutionFormConfig = this.state.formConfigExecutionData;
                            excutionFormConfig.data.submit.disabled = false;
                            excutionFormConfig.data.stoptest.disabled = true;
                            excutionFormConfig.processflowVisible=false;
                            let formConfig = this.state.formConfig;
                            formConfig.data.suites.value="";
                            formConfig.data.components.value="";
                            formConfig.isExecuteSuiteTileEnabled=false;
                            formConfig.isSelectSuiteTileEnabled=true;
                            this.setState({formConfigExecutionData: excutionFormConfig,formConfig:formConfig,editBtnStatus:true});
                        }else{
                            toast.error("Error While Stopping Test!", {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                        }
                    }else{
                        toast.error("Error While Stopping Test!", {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                });
            }
        }
    }


    componentDidMount(){
        var { dispatch } = this.props;
        this.setFormConfigLoader(true);
        Promise.all([dispatch(getAllComponents())]).then((result)=>{
            let formConfig = this.state.formConfig;
            if (result[0].type === ExDrogonSuiteConstants.GET_COMPONENT_FULFILLED ){
                let {componentLabels} = this.props.drogonSuite;
                formConfig.data.components.options = componentLabels;
                this.setFormConfigLoader(false, formConfig);
            } else{
                this.setFormConfigLoader(false);
            }
        });
    }

    updateApiConfigJson(edit){
        let {formConfig} = this.state;
        formConfig.apiConfig=edit.updated_src;
        this.setFormConfigLoader(false, formConfig);
    }
    updateConversionConfigJson(edit){
       let {formConfig} = this.state;
       formConfig.conversionConfig=edit.updated_src;
       this.setFormConfigLoader(false, formConfig);
    }


    render() {
        // console.log("render=================>",this.state.formConfig.isSelectSuiteTileEnabled,this.state.formConfig.isExecuteSuiteTileEnabled);
           console.log("this.props.drogonSuite.======",this.props.drogonSuite)
            return (
                <div>
                    <PageTitle
                        title="▌│▌│█║▌║▌ 𝒟𝓇𝑜𝑔𝑜𝓃 -𝒯𝒽𝑒 𝒽𝑜𝓇𝒾𝓏𝑜𝓃𝓉𝒶𝓁 𝐿𝑜𝒶𝒹 𝒯𝑒𝓈𝓉 𝒮𝓎𝓈𝓉𝑒𝓂 ▌║▌║█│▌│▌"
                        rightRender={null}/>
                    <br/>
                    <ToastContainer/>
                    {this.state.formConfig.isSelectSuiteTileEnabled == true ?
                        <div>
                            <MyForm title="Customise Your Suite" {...this.state.formConfig}/>
                            <div style={{'text-align': "center"}}>
                                <button className={"btn btn-sm green"}
                                        disabled={this.state.editBtnStatus} ref={'btn'}>
                                    <JsonDialog onupdate={this.updateApiConfigJson.bind(this)} label="Api Config"
                                                contentValue={this.state.formConfig.apiConfig}
                                                contentKey="View/Edit Api Config">Api Config</JsonDialog>
                                </button>
                                <button className={"btn btn-sm green"}
                                        disabled={this.state.editBtnStatus} ref={'btn'}>
                                    <JsonDialog onupdate={this.updateConversionConfigJson.bind(this)}
                                                label="Conversion Config"
                                                contentValue={this.state.formConfig.conversionConfig}
                                                contentKey="View/Edit Conversion Config">Conversion Config</JsonDialog>
                                </button>
                            </div>
                            <br/><br/>
                        </div>
                        : ''}
                    {this.state.formConfig.isExecuteSuiteTileEnabled == true ?
                        <div>
                            <MyForm title="Execute Your Suite" {...this.state.formConfigExecutionData}/>
                        </div>
                        : ''}
                    {this.props.drogonSuite.loading ==true ?
                        <div style={{width: '10%' , margin: '0 auto'}}>
                            <ReactLoading type="spinningBubbles" color="#005180" height='66' width='37'/>
                        </div>
                        : ''}
                    {this.state.formConfigExecutionData.processflowVisible == true ?
                        <MyPortlet title="Running Flow">
                            <Steps labelPlacement="vertical" current={this.props.drogonSuite.flowCurrent}
                                   status={this.props.drogonSuite.flowStatus} style={{bgcolor: 'green', marginTop: 0}}>
                                <Steps.Step title="ᴀssᴇᴍʙʟɪɴɢ ʜᴀʀᴅᴡᴀʀᴇ"/>
                                <Steps.Step title="sᴛᴀʀᴛɪɴɢ ɪɴsᴛᴀɴᴄᴇs"/>
                                <Steps.Step title="ᴘʀᴇᴘᴀɪʀɪɴɢ ʏᴏᴜʀ ᴛᴇsᴛ"/>
                                <Steps.Step title="ʟᴏᴀᴅ sᴛᴀʀᴛᴇᴅ"/>
                            </Steps>
                        </MyPortlet>
                        : ''}
                </div>

            );
        }


}

export default connect (state => {
    let drogonSuite = state.ExDrogonSuite;
    return {
        drogonSuite: Immutable.Map.isMap(drogonSuite) ? drogonSuite.toJS() : drogonSuite
    }
})(ExDrogonSuite)

