import React,{Component} from 'react';
import MyForm from '../../MyForm'
import AddSuiteConstants from '../../../constants/rhaegal/addSuiteConstants';
import SummaryConstants from '../../../constants/rhaegal/summaryConstants';
import {getAllNameSpaces, getComponentsForNameSpace, getSuitesDetails} from '../../../actions/rhaegal/createSuite'
import {getRunningInstances} from '../../../actions/rhaegal/summary'
import { ToastContainer, toast } from 'react-toastify';
import PageTitle from '../../PageTitle';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../css/shadowTower/shadowtower.css';
import {stopCurrentTest} from '../../../actions/rhaegal/executeSuite.js'
import ExecuteSuiteConstants from '../../../constants/rhaegal/executeSuiteConstants';
import { HashLoader} from 'react-spinners';

class SuiteSelection extends Component{
    constructor(props){
        super(props);

        var formData = {
            nameSpaces: {
                "label": "Namespaces *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "className":"metricCollectionSelect",
                "mandatory": true,
                "multiSelect": false,
                "disabled": false
            },
            components: {
                "label": "Components *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "mandatory": true,
                "multi": false,
                "selectType": "Creatable",
                "placeholder": "Select Existing/ Add New Component...",
                "disabled": false
            },
            suites: {
                "label": "Suites *",
                "type": "MyReactSelect",
                "value": "",
                "options": [],
                "mandatory": true,
                "multi": false,
                "selectType": "Creatable",
                "placeholder": "Select Suite..",
                "disabled": false
            }
        };
        this.state= {
            isLoadingRun: false,
            loading: false,
            runData : [],
            nameSpace : "",
            component : "",
            suiteName : "",
            formConfig:{
                data: formData,
                onChange: this.handleOnChange,
                showLoading: false,
                flow: 'horizontal'
            },
        };
    }

    setFormConfigLoader(bool, formConfigInp){
        let formConfig = formConfigInp? formConfigInp : this.state.formConfig;
        formConfig.showLoading = bool;
        this.setState({formConfig: formConfig});
    }
    handleOnChange=(x,y,z) =>{
        console.log("changing form value....",x,y,z)
        let {dispatch} = this.props;
        let {formConfig} = this.state;
        if (x.elementId === "nameSpaces"){
            if(y.data.nameSpaces.value === undefined || y.data.nameSpaces.value === null){
                this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
                return
            }
            let nameSpaceSelected = Object.values(y.data.nameSpaces.value)[0];
            if(nameSpaceSelected !== undefined){
                dispatch(getComponentsForNameSpace(nameSpaceSelected)
                ).then(
                    (result)=>{
                        if (result.type === AddSuiteConstants.GET_COMPONENT_FULFILLED){
                            let {componentLabels} = this.props.suite;
                            formConfig.data.components.value="";
                            formConfig.data.suites.value = "";
                            formConfig.data.components.options = componentLabels;
                            this.setFormConfigLoader(false, formConfig);
                        }else if (result.type === AddSuiteConstants.GET_COMPONENT_REJECT) {
                            toast.error("error while getting apis response...");
                        }
                        this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
                    }
                );
            }else{
                this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
                return
            }
        }
        else if (x.elementId === "components"){
            if(y.data.components.value === undefined || y.data.components.value === null){
                this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
                return
            }
            let nameSpaces = Object.values(y.data.nameSpaces.value)[0]
            let components = Object.values(y.data.components.value)[0];
            if(components !== undefined){
                dispatch(getSuitesDetails(nameSpaces, components)).then((result)=>{
                        if (result.type === AddSuiteConstants.GET_SUITES_FULFILLED){
                            let {suiteLabels} = this.props.suite;
                            formConfig.data.suites.value = "";
                            formConfig.data.suites.options = suiteLabels;
                            this.setFormConfigLoader(false, formConfig);
                        }else if (result.type === AddSuiteConstants.GET_SUITES_REJECT) {
                            toast.error("Error while getting API's response...");
                        }
                    }
                );
                this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
            }else{
                this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
                return
            }
        }
        else if (x.elementId === "suites"){
            let nameSpaces = Object.values(y.data.nameSpaces.value)[0]
            let components = Object.values(y.data.components.value)[0];
            if(y.data.suites.value === undefined || y.data.suites.value === null){
                this.setState({editBtnStatus: true, deleteBtnStatus: true, isLoadSuiteDetails: false});
                return
            }
            let suites = Object.values(y.data.suites.value)[0];
            if(suites !== undefined){
                this.setState({isLoadExecPage: true, nameSpace: nameSpaces, component:components, suiteName: suites})
            }
        }
    }

    componentDidMount(){
        var { dispatch } = this.props;
        console.log("Inside componentDidMount  Props ## ", this.props)
        this.setFormConfigLoader(true);
        Promise.all([dispatch(getAllNameSpaces())]).then((result)=>{
            let formConfig = this.state.formConfig;
            if (result[0].type === AddSuiteConstants.GET_NAMESPACE_FULFILLED ){
                let {nameSpacesLabels} = this.props.suite;
                formConfig.data.nameSpaces.options = nameSpacesLabels;
                this.setFormConfigLoader(false, formConfig);
            } else{
                this.setFormConfigLoader(false);
            }
        });

        Promise.all([dispatch(getRunningInstances())]).then((result)=>{
            if (result[0].type === SummaryConstants.GET_RUNS_FULFILLED){
                var data = JSON.parse(result[0].data.body.text);
                this.setState({isLoadingRun: true, runData: data.data})
            } else{
                this.setState({isLoadingRun: false})
            }
        });
    }

    ref(cell, row, rowIndex) {
        return (
            <div>
                <a onClick={() => {this.rowclick(row.runId)}} href="" style={{'text-decoration':'underline', color:'blue'}}>{row.runId}</a>
            </div>
        )
    }

    rowclick(id, cell, row, rowIndex) {
        this.props.history.push("/rhaegal/summary/"+id)
    }


    onClickStop = (cell, row, rowIndex) => {
        let runid = row.runId
        console.log("Stopping run id=--->>>>",runid);
        this.setState({loading: true})
        var { dispatch } = this.props;
        Promise.all([dispatch(stopCurrentTest(runid))]).then((result)=>{
            if (result[0].type === ExecuteSuiteConstants.STOP_TEST_FULFILLED){
                let data = JSON.parse(result[0].data.body.text);
                if(data.status.statusType  === "SUCCESS"){
                    alert("Test Stopped Successfully");
                }else{
                    alert("Error While Stopping Test");
                    return
                }
            }else{
                alert("Error While Stopping Test");
                return
            }
            this.setState({loading: false})
            this.componentDidMount();
        });
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div className='row'>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger btn-circle btn-xs"
                        onClick={() =>
                            this.onClickStop(cell, row, rowIndex)}>
                    <i className="fa fa-stop"></i>
                </button>
            </div>
        )
    }

    render(){
        console.log("Inside Render Props ## ", this.props)
        return (
            <div>
                <ToastContainer style={{width: '500px', top: '30%'}} />
                {this.state.loading ?
                    <div style={{left:'50%', top: '250px', position: 'relative'}} >
                        <div>
                            <h5 style={{color: '#005180'}}> Stopping Test ...</h5>
                            <HashLoader color={'#36D7B7'} loading={this.state.loading} size={100}/>
                        </div>
                    </div>:null
                }
                {!this.state.loading ?
                <div>
                    <PageTitle title="𝔰𝔢𝔩𝔢𝔠𝔱 𝔖𝔲𝔦𝔱𝔢 𝔣𝔬𝔯 𝔈𝔵𝔢𝔠𝔲𝔱𝔦𝔬𝔫" rightRender={null} />
                    <div>
                        <MyForm title="Select Suite to Execute " {...this.state.formConfig}/>
                        {this.state.isLoadExecPage ?
                            <div>
                                {this.props.history.push("/rhaegal/execute/namespace/"+this.state.nameSpace+"/component/"+this.state.component+"/suite/"+this.state.suiteName)}
                            </div> : null
                        }
                    </div>
                    <br/>
                    <br/>
                    { this.state.isLoadingRun ?
                        <div className="col-xs-12">
                            <h3 style={{textAlign: 'center', color: 'teal'}}> ▁ ▂ ▄ ▅ ▆ ▇ █  ℭ𝔲𝔯𝔯𝔢𝔫𝔱 ℜ𝔲𝔫𝔫𝔦𝔫𝔤 𝔗𝔢𝔰𝔱𝔰 █ ▇ ▆ ▅ ▄ ▂ ▁</h3>
                            <br/>
                            <BootstrapTable data={this.state.runData} trClassName='table-row-class' tableHeaderClass='table-header-class' hover condensed stripped>
                                <TableHeaderColumn  width='200' dataField='runId' isKey dataFormat={this.ref.bind(this)}>Run ID</TableHeaderColumn>
                                <TableHeaderColumn  dataField='suiteName' >SuiteName</TableHeaderColumn>
                                <TableHeaderColumn  dataField='jmxFileName'>JMX File Name</TableHeaderColumn>
                                <TableHeaderColumn  dataField='threads' >Threads</TableHeaderColumn>
                                <TableHeaderColumn  dataField='rampup' >RampUp</TableHeaderColumn>
                                <TableHeaderColumn  dataField='slaves' >Engines</TableHeaderColumn>
                                <TableHeaderColumn  dataField='iterations' >Iterations</TableHeaderColumn>
                                <TableHeaderColumn  dataField='duration' >Duration</TableHeaderColumn>
                                <TableHeaderColumn  dataField='throughPut'>ThroughPut</TableHeaderColumn>
                                <TableHeaderColumn  dataField='serverIP' >ServerIP</TableHeaderColumn>
                                <TableHeaderColumn  width='160' dataField='startedOn' dataFormat={epochConverter.bind(this)}>Start Time</TableHeaderColumn>
                                <TableHeaderColumn  width='90' dataField='button' dataFormat={this.cellButton.bind(this)}>Stop Test</TableHeaderColumn>
                            </BootstrapTable>
                        </div> :null
                    }
                </div>: null}
            </div>
        );
    }
}

function epochConverter(time) {
    var myDate = new Date( time * 1000);
    return myDate.toLocaleDateString() +" "+ myDate.toLocaleTimeString()
}

export default connect (state => {
    let suite = state.TestSuite;
    return {
        suite: Immutable.Map.isMap(suite) ? suite.toJS() : suite
    }
})(SuiteSelection)
