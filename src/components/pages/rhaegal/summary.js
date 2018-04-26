import React, {Component, PropTypes} from 'react';
import {getSummary, getRunHistory} from '../../../actions/rhaegal/summary'
import '../../../css/summary-report/summary.css';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import MyCard from '../../MyCard';
import MyStaticResult from '../../MyStaticResult';
import MyTextArea from '../../MyTextArea';
import io from 'socket.io-client'
import CreateBoxNav from '../../../components/createBoxNav.js'
import {stopCurrentTest} from '../../../actions/rhaegal/executeSuite.js'
import ExecuteSuiteConstants from '../../../constants/rhaegal/executeSuiteConstants';
import MultipleTimeSeriesChart from "../../MultipleTimeSeriesChart";
import MySimpleTable from "../../MySimpleTable";
import moment from 'moment'



class Summary extends Component {


    constructor(props) {
        super(props);
        this.state = {
            stats: null,
            details: undefined,
            summary: {},
            runId: "",
            boolSummaryStatus: true,
            isLoading: false,
            chartData: null,
            chartOpsData: null,
            columns: [{
                display: 'LabelName',
                name: 'labelName',
                key: true,
            }, {
                display: 'Samples',
                name: 'samples',
            }, {
                display: 'Avg. RT',
                name: 'avgResponseTime',
                sub: '(ms)'
            }, {
                display: '90% RT',
                name: 'percent90',
                sub: '(ms)'
            }, {
                display: '95% RT',
                name: 'percent95',
                sub: '(ms)',
            }, {
                display: '99% RT',
                name: 'percent99',
                sub: '(ms)',
            }, {
                display: 'Min. RT',
                name: 'minResponseTime',
                sub: '(ms)',
            }, {
                display: 'Med. RT',
                name: 'medResponseTime',
                sub: '(ms)',
            }, {
                display: 'Max. RT',
                name: 'maxResponseTime',
                sub: '(ms)',
            }, {
                display: 'Avg. TPS',
                name: 'avgThroughput',
                sub: '(req/sec)',
            }, {
                display: 'Error Count',
                name: 'errorsCount',
            }, {
                display: 'Error',
                name: 'errorsRate',
                sub: '(%)',
            }],

            trend_stroke : [],
            trend_strokeTps : [],
            stopBtnStatus : false,
            completeStatus : false,
            runningSummaryFormData:{
                label:"Console Running Summary",
                onChange: this.handleSummaryOnChange,
                rows:"15",
                disabled:true,
                show:false,
                value:"",
                cols: "170"
            },
            runningJMeterLogData:{
                label:"JMeter Log",
                onChange: this.handleSummaryOnChange,
                rows:"15",
                disabled:true,
                show:false,
                value:"",
                cols: "170"
            },
            nav: [{text: 'Logs', active: true, id:'log'}, {text: 'Summary', active: false, disabled: true, id:'summary'}]
        }

    }

    componentDidMount() {
        this.setState({runId : this.props.match.params.runId})
        let {dispatch} = this.props
        Promise.all([dispatch(getRunHistory(this.props.match.params.runId))]).then((result) => {
            if (result[0].type === 'GET_RUNHISTORY_FULFILLED') {
                let newDetails = JSON.parse(result[0].data.body.text);
                if (newDetails.status.statusType === 'SUCCESS') {
                    this.setState({details: newDetails.data});
                    let consoleData = {}
                    let consoleDataLog = {}
                    consoleData.ip = newDetails.data.serverIP
                    consoleDataLog.ip = newDetails.data.serverIP
                    consoleData.path = "/home/centos/jmeter/log/"+this.props.match.params.runId+"_console.out"
                    consoleDataLog.path = "/home/centos/jmeter-server.log"
                    this.socket.emit('getExecuteLogs',consoleData)
                    this.socket.emit('getJMeterLog',consoleDataLog)
                    let runningSummaryData = this.state.runningSummaryFormData;
                    let runningSummaryLogData = this.state.runningJMeterLogData;
                    this.socket.on('gotRunningLogs', (data) => {
                        runningSummaryData.value = runningSummaryData.value + '\n' + ' ' + data
                        runningSummaryData.show = true
                        this.setState({
                            runningSummaryFormData: runningSummaryData
                        });

                    });
                    this.socket.on('gotJMeterLogs', (data) => {
                        runningSummaryLogData.value = runningSummaryLogData.value + '\n' + ' ' + data
                        runningSummaryLogData.show = true
                        this.setState({
                            runningJMeterLogData: runningSummaryLogData
                        });

                    });

                }
            }
        });
        this.foo = setInterval(() => this.tick(), 10000);
    }

    tick(){
        console.log("=====================hello====================")
        this.loadSummary()
        this.loadRunDetails()
    }

    componentWillUnmount(){
        clearInterval(this.foo)
    }

    loadSummary() {
        let {dispatch} = this.props
        Promise.all([dispatch(getSummary(this.state.runId))]).then((result) => {
            if (result[0].type === "GET_SUMMARY_FULFILLED") {
                let newSummary = JSON.parse(result[0].data.body.text);
                if (newSummary.status.statusType === 'SUCCESS') {
                    var resData = [];
                    var throughPutData = []
                    let stats = newSummary.data.runStats
                    if(stats != null){
                        var arrColour = ['#8884d8','#ffc658', '#82ca9d']
                        stats.map((stat,index) =>{
                            resData.push({data: "responseTime."+stat.labelName, stroke: arrColour[index], type: 'monotone'})
                            throughPutData.push({data: "throughPut."+stat.labelName, stroke: arrColour[index], type: 'monotone'})
                        })
                    }

                    this.setState({ summary: newSummary.data.runStat,
                        stats: newSummary.data.runStats,
                        chartData: newSummary.data.responseStat,
                        chartOpsData: newSummary.data.opsDistribution,
                        trend_stroke : resData,
                        trend_strokeTps: throughPutData,
                    });
                }
            }
        })
    }

    loadRunDetails() {
        let {dispatch} = this.props
        Promise.all([dispatch(getRunHistory(this.state.runId))]).then((result) => {
            //console.log("result[0].type ", result[0].type)
            if (result[0].type === 'GET_RUNHISTORY_FULFILLED') {
                let newDetails = JSON.parse(result[0].data.body.text);
                if (newDetails.status.statusType === 'SUCCESS') {
                    let stopStatus = true
                    let done = false
                    if(newDetails.data.status === 'RUNNING'){
                        stopStatus = false
                    }else if(newDetails.data.status === 'DONE'){
                        console.log("Test Completed")
                        done = true
                    }
                    this.setState({details: newDetails.data, stopBtnStatus: stopStatus, completeStatus: done, isLoading: false});
                }
            }
        });
    }

    componentWillMount() {
        this.socket = io.connect('/');
    }

    handleSummaryOnChange=(x,y,z) =>{
        console.log("handleSummaryOnChange====changing form value....",x,y)
    }

    setActiveNav = (navItem) => {
        let {nav} = this.state;
        nav = nav.map(item => {
            if (item.id === navItem.id) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
        return nav;
    }

    getActiveNav = () => {
        let {nav} = this.state,
            navItem = nav.filter(item => item.active)[0]; // Only one can be active;
        return navItem.id;
    }

    navSelected = (item) => {
        if (item) {
            let nav = this.setActiveNav({id: item.id});
            this.setState({nav}, () => this.submitAction());
        }
    }
    submitAction(){
        console.log("");
    }

    stopTest = (e) => {
        let runid = this.props.match.params.runId
        //console.log("Stopping run id=--->>>>",runid);
        this.setState({isLoading: true});
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
        });
        this.setState({stopBtnStatus: true});
    }



    render() {
        let code=null;
        if(this.state.details !== undefined){
            code = (
                <div>
                    {this.state.isLoading ?
                        <div style={{'text-align': "center"}}>
                            <i className="fa fa-circle-o-notch fa-spin" style={{"font-size":"48px", "color":"red"}}></i>
                        </div> :null
                    }
                    <div style={{'text-align': "right"}}>
                        <button className={"btn btn-sm btn-danger"} onClick={this.stopTest}
                                disabled={this.state.stopBtnStatus} ref={'btn'}>Stop Test
                        </button>
                    </div>
                    <div>
                        <div className={"page-box "+this.props.className && this.props.className}>
                            {this.props.children}
                            <div className="boxless tabbable-reversed caption">
                                <CreateBoxNav nav={this.state.nav} onUpdateNav={this.navSelected} />
                            </div>
                            {this.getActiveNav() === 'summary' ?
                                <div>
                                    <div>
                                        <ul className="top-stats row">
                                            <MyCard data={this.state.summary.activeUsers} unit="VU" unitCss="box-units" desc="Current Active Users"  descCss="box-kpi"  dataCss="box-count" divCss="box users" />
                                            <MyCard data={this.state.summary.samples} unit="" unitCss="box-units" desc="Samples"  descCss="box-kpi"  dataCss="box-count" divCss="box users" />
                                            <MyCard data={this.state.summary.avgThroughput} unit=" Hits/s" unitCss="box-units" desc="Avg. Throughput"  descCss="box-kpi"  dataCss="box-count" divCss="box hits" />
                                            <MyCard data={this.state.summary.errorsRate} unit=" %" unitCss="box-units" desc="Errors"  descCss="box-kpi"  dataCss="box-count" divCss="box errors" />
                                            <MyCard data={this.state.summary.avgResponseTime} unit=" ms" unitCss="box-units" desc="Avg. Response Time"  descCss="box-kpi"  dataCss="box-count" divCss="box users" />
                                            <MyCard data={this.state.summary.percent90} unit=" ms" unitCss="box-units" desc="90% Response Time"  descCss="box-kpi"  dataCss="box-count" divCss="box avg-response-time" />
                                        </ul>
                                    </div>

                                    <div className="col-xs-12">
                                        <div className="overview-details">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <MyStaticResult icon="fa fa-clock-o" style={{"color":"red"}} name="Duration" data={this.state.details.duration}/>
                                                    <MyStaticResult icon="fa fa-play" style={{"color":"blue"}} name="Started" data={epochConverter(this.state.details.startedOn)}/>
                                                    <MyStaticResult icon="fa fa-stop" style={{"color":"red"}} name="Ended" data={epochConverter(this.state.details.endedOn)}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <MyStaticResult icon="fa fa-cog" style={{"color":"red"}} name="Test Type" data="JMeter"/>
                                                    <MyStaticResult icon="fa fa-tachometer" style={{"color":"blue"}} name="Status" data={this.state.details.status}/>
                                                    <MyStaticResult icon="fa fa-code-fork" style={{"color":"green"}} name="Response Codes" data="2xx"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <br/>
                                    </div>
                                    <div className="col-xs-12">
                                        <MySimpleTable data={this.state.stats} columns={this.state.columns}/>
                                    </div>

                                    <div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 style={{'text-align':"center"}}>Response Time</h5>
                                            <MultipleTimeSeriesChart data={this.state.chartData} xAxisDataKey="time"
                                                               yAxisDataKey={this.state.trend_stroke} func={formatXAxis} aspect_width={8.0} aspect_height={4.0}/>
                                        </div>

                                        <div className= "col-md-6">
                                            <h5 style={{'text-align':"center"}}>ThroughPut</h5>
                                            <MultipleTimeSeriesChart data={this.state.chartOpsData} xAxisDataKey="time"
                                                                     yAxisDataKey={this.state.trend_strokeTps} func={formatXAxis} aspect_width={8.0} aspect_height={4.0}/>
                                        </div>
                                    </div>
                                </div>:null}
                            {this.getActiveNav() === 'log' ?
                                <div>
                                    <MyTextArea {...this.state.runningSummaryFormData} style={{
                                        "font-weight": "500",
                                        "font-size": "small",
                                        "textAlign": "left",
                                        "width": "100%"
                                    }}/>
                                    <MyTextArea {...this.state.runningJMeterLogData} style={{
                                        "font-weight": "500",
                                        "font-size": "small",
                                        "textAlign": "left",
                                        "width": "100%"
                                    }}/>
                                </div>: null


                            }
                        </div>
                    </div>
                </div>
            )
        }else {
            code = (
                <div>
                    <br/>
                    <h2> Loading Run Details for Run Id ...{this.state.runId} </h2>
                    <br/>
                    <div style={{'text-align':"center"}}>
                        <i className="fa fa-spinner fa-spin" style={{'font-size':'48px', 'color':'red', 'text-align':"center"}}></i>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {code}
                {this.state.completeStatus ?
                    <div>
                        {this.props.history.push("/rhaegal/history/"+this.state.runId)}
                    </div>
                    : ''}
            </div>
        )
    }
}

function epochConverter(time) {
    var myDate = new Date( time * 1000);
    return myDate.toGMTString()
}

function formatXAxis(tickItem) {
    return moment(tickItem).format('HH:mm:ss')
}


export default connect(state => {
    let summary = state;
    return {
        summary: Immutable.Map.isMap(summary) ? summary.toJS() : summary
    }
})(Summary);

