import React,{Component} from 'react';
import MySimplePieChart from "./MySimplePieChart";
import MySimpleTable from "./MySimpleTable";
import MySimpleBarChart from "./MySimpleBarChart";
import MyStaticResult from "./MyStaticResult";
import MyCard from "./MyCard";
import MultipleTimeSeriesChart from "./MultipleTimeSeriesChart";
import '../css/summary-report/summary.css';
import moment from 'moment'

const getDataPieChart = function(resdata) {
    let pieLabels = resdata.map((data) => {
        return {
            name: data.responseCode,
            value: data.count
        }
    });
    return pieLabels;
}

class MyRunDetails extends Component{

    constructor(props) {
        super(props);
        var formData = {
            submit: {
                "label": "Save As PDF" ,
                "type": "MyButton",
                "theme": "red",
                "className": "cceButton pull-left",
                "buttonType": "submit",
                "disabled": false
            }

        };

        this.state = {
            pieData: {},

            runDetails: {},
            trend_stroke : [],
            trend_strokeTps : [],

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

            columnsRC: [{
                display: 'ResponseCode',
                name: 'responseCode',
                sub: '2xx, 4xx',
                key: true
            }, {
                display: 'Count',
                name: 'count',
                key: false,
            }, {
                display: 'Fraction',
                name: 'fraction',
                sub: '(%)',
                key: false,
            }],

            columnsRT: [{
                display: 'ResponseTime',
                name: 'responseTime',
                key: true,
                sub: '(ms)',
            }, {
                display: 'Count',
                name: 'count',
            }, {
                display: 'Fraction',
                name: 'fraction',
                sub: '(%)',
            }, {
                display: 'Rolling Fraction',
                name: 'rollingFraction',
                sub: '(%)',
            }],

            columnsRTPer: [{
                display: 'Percentile',
                name: 'percent',
                key: true,
            }, {
                display: 'Value',
                name: 'value',
                sub: '(ms)',
                key: false,
            }],

            pdf: {
                margin:       1,
                filename:     'myfile.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { dpi: 192, letterRendering: true },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            },

            formConfig:{
                data:formData,
                onClick: this.submitRun,
                showLoading: false,
                flow:"vertical"
            }
        };

    }

    setFormConfigLoader(bool, formConfigInp){
        let formConfig = formConfigInp? formConfigInp : this.state.formConfig;
        formConfig.showLoading = bool;
        formConfig.data.submit.disabled = bool;
        this.setState({formConfig: formConfig});
    }

/*    submitRun = (e) => {
        this.setFormConfigLoader(true);
        //this.setState({runHistoryDetails: getElementAsPDF()});
        getElementAsPDF('abc', this.state.pdf)
        this.setFormConfigLoader(false);
    }*/

    render() {
        let code=null;
        var resData = [];
        var throughPutData = []
        this.state.runDetails = this.props.data
        if(this.state.runDetails.runHistory !== undefined){
            let stats = this.state.runDetails.runStats
            if(stats != null){
                var arrColour = ['#8884d8','#ffc658', '#82ca9d']
                stats.map((stat,index) =>{
                    resData.push({data: "responseTime."+stat.labelName, stroke: arrColour[index], type: 'monotone'})
                    throughPutData.push({data: "throughPut."+stat.labelName, stroke: arrColour[index], type: 'monotone'})
                })
            }

            code = (
                <div>
                    <div id="history">
                        <div>
                            <h1 style={{'text-align':"center"}}> Summary Report </h1>
                            <br/>
                        </div>
                        <div>
                            <ul className="top-stats row">
                                <MyCard data={this.state.runDetails.runStat.activeUsers} unit="VU" unitCss="box-units" desc="Max Active Users"  descCss="box-kpi"  dataCss="box-count" divCss="box users" />
                                <MyCard data={this.state.runDetails.runStat.samples} unit="" unitCss="box-units" desc="Samples"  descCss="box-kpi"  dataCss="box-count" divCss="box users" />
                                <MyCard data={this.state.runDetails.runStat.avgThroughput} unit=" Hits/s" unitCss="box-units" desc="Avg. Throughput"  descCss="box-kpi"  dataCss="box-count" divCss="box hits" />
                                <MyCard data={this.state.runDetails.runStat.errorsRate} unit=" %" unitCss="box-units" desc="Errors"  descCss="box-kpi"  dataCss="box-count" divCss="box errors" />
                                <MyCard data={this.state.runDetails.runStat.avgResponseTime} unit=" ms" unitCss="box-units" desc="Avg. Response Time"  descCss="box-kpi"  dataCss="box-count" divCss="box users" />
                                <MyCard data={this.state.runDetails.runStat.percent90} unit=" ms" unitCss="box-units" desc="90% Response Time"  descCss="box-kpi"  dataCss="box-count" divCss="box avg-response-time" />
                            </ul>
                        </div>

                        <div className="col-xs-12">
                            <div className="overview-details">
                                <div className="row">
                                    <div className="col-md-6">
                                        <MyStaticResult icon="fa fa-clock-o" style={{"color":"red"}} name="Duration" data={this.state.runDetails.runHistory.duration}/>
                                        <MyStaticResult icon="fa fa-play" style={{"color":"blue"}} name="Started" data={epochConverter(this.state.runDetails.runHistory.startedOn)}/>
                                        <MyStaticResult icon="fa fa-stop" style={{"color":"red"}} name="Ended" data={epochConverter(this.state.runDetails.runHistory.endedOn)}/>
                                    </div>
                                    <div className="col-md-6">
                                        <MyStaticResult icon="fa fa-cog" style={{"color":"red"}} name="Test Type" data="JMeter"/>
                                        <MyStaticResult icon="fa fa-tachometer" style={{"color":"blue"}} name="Status" data={this.state.runDetails.runHistory.status}/>
                                        <MyStaticResult icon="fa fa-code-fork" style={{"color":"green"}} name="Response Codes" data={this.state.runDetails.runStat.responseCodes.join(", ")}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <br/>
                        </div>
                        <div className="col-xs-12">
                            <MySimpleTable data={this.state.runDetails.runStats} columns={this.state.columns}/>
                        </div>

                        <div>
                            <br/>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-md-6 well well-sm">
                                <h5 style={{'text-align':"center"}}>Response Time</h5>
                                <MultipleTimeSeriesChart data={this.state.runDetails.responseStat} xAxisDataKey="time"
                                                         yAxisDataKey={resData} func={formatXAxis} aspect_width={8.0} aspect_height={4.0}/>
                            </div>

                            <div className= "col-md-6  well well-sm">
                                <h5 style={{'text-align':"center"}}>ThroughPut</h5>
                                <MultipleTimeSeriesChart data={this.state.runDetails.opsDistribution} xAxisDataKey="time"
                                                   yAxisDataKey={throughPutData} func={formatXAxis} aspect_width={8.0} aspect_height={4.0}/>
                            </div>
                        </div>
                        <div>
                            <br/>
                            <br/>
                        </div>
                        <div className="row">
                            <div className="col-md-6 well well-sm">
                                <h5 style={{'text-align':"center"}}>Response Times Distribution</h5>
                                <MySimpleBarChart data={this.state.runDetails.rtDistribution} xAxisDataKey="responseTime" yAxisDataKey="count" />
                            </div>
                            <div className="col-md-6 well well-sm">
                                <h5 style={{'text-align':"center"}}>Response Times Distribution</h5>
                                <MySimpleTable data={this.state.runDetails.rtDistribution} columns={this.state.columnsRT}/>
                            </div>
                        </div>
                        <div><br/><br/></div>
                        <div className="row">
                            <div className="col-md-6 well well-sm">
                                <h5 style={{'text-align': "center"}}>Response Code Distribution</h5>
                                <MySimplePieChart data={getDataPieChart(this.state.runDetails.rcDistribution)}/>
                                <MySimpleTable data={this.state.runDetails.rcDistribution} columns={this.state.columnsRC}/>
                            </div>
                            <div className="col-md-6 well well-sm">
                                <h5 style={{'text-align':"center"}}>Response Times Percentile Distribution</h5>
                                <MySimpleTable data={this.state.runDetails.rtPercentileDistribution} columns={this.state.columnsRTPer}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            code = (
            <div>
                <h1></h1>
            </div>
            )
        }
        return (
            <div>
                {code}
            </div>
        )
    }
}

function formatXAxis(tickItem) {
    return moment(tickItem).format('HH:mm:ss')
}

function epochConverter(time) {
    var myDate = new Date( time * 1000);
    return myDate.toGMTString()
}

export default MyRunDetails
