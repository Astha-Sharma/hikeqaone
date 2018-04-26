import React,{Component} from 'react';
import { getResults, getResponseDist, getResults24Hours, getCardData} from "../../actions/mqtt";
import mqttConstants from "../../constants/mqttConstants";
import Immutable from "immutable";
import {connect} from "react-redux";
import MultipleTimeSeriesChart from "../MultipleTimeSeriesChart";
import '../../css/shadowTower/shadowtower.css';
import moment from 'moment'
import MyCard from '../MyCard';
import MyTable from '../MyTable';

class Mqtt extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            rundata: [],
            respdata: [],
            respdata24hours: [],
            runId: "",
            runs: 1,
            tests: -1,
            isflag:true,
            trend_strokeC : [
                {
                    data: "latency",
                    stroke:  "#0f8fd8",
                    type: 'monotone'
                }
            ],
            trend_strokeP : [
                {
                    data: "latency",
                    stroke:  "#d32f2f",
                    type: 'monotone'
                }
            ],
            trend_strokeMS : [
                {
                    data: "latency",
                    stroke:  "#ffa000",
                    type: 'monotone'
                }
            ],
            connectS:{
                data:"{}"
            },
            pubackS : {
                data:"{}"
            },
            messageS : {
                data:"{}"
            },
            connect24hours:{
                data:"{}",

            },
            puback24hours:{
                data:"{}",

            },
            msgsent24hours:{
                data:"{}",

            },
            connectlastweek:{
                data:"{}",

            },
            pubacklastweek:{
                data:"{}",

            },
            msgsentlastweek:{
                data:"{}",

            }
        }
    }

    componentDidMount() {
        this.getResults()
        this.getLastDayStats()
        this.getResponseDistribution()
        this.getCardData()
        this.foo = setInterval(() => this.getResults(), 300000);
        this.foo = setInterval( () => this.getLastDayStats(), 600000)
        this.foo = setInterval( () => this.getResponseDistribution(), 600000)
        this.foo = setInterval( () => this.getCardData(), 600000)
    };

    componentWillUnmount(){
        clearInterval(this.foo)
    }

    getResults() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getResults())]).then((result)=>{
            if (result[0].type === mqttConstants.GET_MQTTRESULT_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    rundata: data
                })
                this.setState({
                    connectS : data.connectstats
                })
                this.setState({
                    pubackS : data.pubackstats
                })
                this.setState({
                    messageS : data.messagesentstats
                })
            }
        });


    }


    getResponseDistribution(){
        var { dispatch } = this.props;
        Promise.all([dispatch(getResponseDist())]).then((result)=>{
            if (result[0].type === mqttConstants.GET_MQTTRESP_FULFILLED ) {
                var dataResp = JSON.parse(result[0].data.body.text);
                this.setState({
                    respdata: dataResp
                })
            }
        });
    }

    getLastDayStats()
    {
        var { dispatch } = this.props;
        Promise.all([dispatch(getResults24Hours())]).then((result) => {
            if (result[0].type === mqttConstants.GET_MQTTRESP24H_FULFILLED) {
                var lastDay = JSON.parse(result[0].data.body.text);
                this.setState({
                    respdata24hours: lastDay
                })
            }
        });
    }

    getCardData()
    {
        var { dispatch } = this.props;
        Promise.all([dispatch(getCardData())]).then((result) => {
            if (result[0].type === mqttConstants.GET_CARDDATA_FULFILLED) {
                var cardData = JSON.parse(result[0].data.body.text);
                this.setState({
                    connect24hours: cardData.connect24hours,
                    puback24hours: cardData.puback24hours,
                    msgsent24hours: cardData.msgsent24hours,
                    connectlastweek: cardData.connectlastweek,
                    pubacklastweek: cardData.pubacklastweek,
                    msgsentlastweek: cardData.msgsentlastweek,
                })
            }
        });
    }

    render() {
        var rev_data = this.state.rundata;
        var lastDayData = this.state.respdata24hours
        var cs = this.state.connectS
        var ps = this.state.pubackS
        var ms = this.state.messageS
        var respDistribution = this.state.respdata
        return (
            <div >
                <div className="widget">
                    <h6 style={{'text-align': "center"}}>MQTT Connect Latency</h6>
                    <ul className="top-stats row">
                        <MyCard data={this.state.connect24hours.P99th} unit="ms" unitCss="box-units" desc="99th %(24 Hours)"
                            descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.connect24hours.uptime} unit="%" unitCss="box-units" desc="Uptime(24 Hours)"
                            descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.connect24hours.failure} unit="" unitCss="box-units" desc="Failures(24 Hours)" descCss="drogonbox-kpi"
                            dataCss="drogonbox-count" divCss="drogonbox errors" tooltip={this.state.connect24hours.outagetime}/>
                        <MyCard data={this.state.connectlastweek.P99th} unit="ms" unitCss="box-units" desc="99th %(Last Week)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.connectlastweek.uptime} unit="%" unitCss="box-units" desc="Uptime(Last Week)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.connectlastweek.failure} unit="" unitCss="box-units" desc="Failures(Last Week)" descCss="drogonbox-kpi"
                                dataCss="drogonbox-count" divCss="drogonbox errors" tooltip={this.state.connectlastweek.outagetime}/>
                    </ul>

                    <div className="row">
                        <div className="col">
                            <h6 style={{'text-align': "center"}}>MQTT Connect Latency(last 24 hours)</h6>
                            <MultipleTimeSeriesChart data={lastDayData.connect} xAxisDataKey="time"
                                                     yAxisDataKey={this.state.trend_strokeC} func={formatXAxis}
                                                     aspect_width={9.0} aspect_height={2.0} yaxisunit=" ms"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col">
                                    <h6 style={{'text-align': "center"}}>MQTT Connect latency(last hours)</h6>
                                    <MultipleTimeSeriesChart data={rev_data.connect} xAxisDataKey="time"
                                                             yAxisDataKey={this.state.trend_strokeC}
                                                             func={formatXAxis} aspect_width={4.0}
                                                             aspect_height={2.0} yaxisunit=" ms"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col">
                                    <h6 style={{'text-align': "center"}}>Response Times Distribution of Last
                                        Week</h6>
                                    <MyTable data={respDistribution.connectlastweek} xAxisDataKey="range"
                                             yAxisDataKey="count"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="widget">
                    <h6 style={{'text-align': "center"}}>MQTT PubAck Latency</h6>
                    <ul className="top-stats row">
                        <MyCard data={this.state.puback24hours.P99th} unit="ms" unitCss="box-units" desc="99th %(24 Hours)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.puback24hours.uptime} unit="%" unitCss="box-units" desc="Uptime(24 Hours)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.puback24hours.failure} unit="" unitCss="box-units" desc="Failures(24 Hours)" descCss="drogonbox-kpi"
                                dataCss="drogonbox-count" divCss="drogonbox errors" tooltip={this.state.puback24hours.outagetime}/>
                        <MyCard data={this.state.pubacklastweek.P99th} unit="ms" unitCss="box-units" desc="99th %(Last Week)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.pubacklastweek.uptime} unit="%" unitCss="box-units" desc="Uptime(Last Week)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.pubacklastweek.failure} unit="" unitCss="box-units" desc="Failures(Last Week)" descCss="drogonbox-kpi"
                                dataCss="drogonbox-count" divCss="drogonbox errors" tooltip={this.state.pubacklastweek.outagetime}/>
                    </ul>
                    <div className="row">
                        <div className="col">
                            <h6 style={{'text-align': "center"}}>MQTT PubAck Latency(last 24 hours)</h6>
                            <MultipleTimeSeriesChart data={lastDayData.puback} xAxisDataKey="time"
                                                     yAxisDataKey={this.state.trend_strokeP} func={formatXAxis}
                                                     aspect_width={9.0} aspect_height={2.0} yaxisunit=" ms"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col">
                                    <h6 style={{'text-align': "center"}}>MQTT PubAck Latency(last hour)</h6>
                                    <MultipleTimeSeriesChart data={rev_data.puback} xAxisDataKey="time"
                                                             yAxisDataKey={this.state.trend_strokeP}
                                                             func={formatXAxis} aspect_width={4.0}
                                                             aspect_height={2.0} yaxisunit=" ms"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col">
                                    <h6 style={{'text-align': "center"}}>Response Times Distribution of Last
                                        Week</h6>
                                    <MyTable data={respDistribution.pubacklastweek} xAxisDataKey="range"
                                             yAxisDataKey="count"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="widget">
                    <h6 style={{'text-align': "center"}}>MQTT MessageSent Latency</h6>
                    <ul className="top-stats row list-inline text-center">
                        <MyCard data={this.state.msgsent24hours.P99th} unit="ms" unitCss="box-units" desc="99th %(24 Hours)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.msgsent24hours.uptime} unit="%" unitCss="box-units" desc="Uptime(24 Hours)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.msgsent24hours.failure} unit="" unitCss="box-units" desc="Failures(24 Hours)" descCss="drogonbox-kpi"
                                dataCss="drogonbox-count" divCss="drogonbox errors" tooltip={this.state.msgsent24hours.outagetime}/>
                        <MyCard data={this.state.msgsentlastweek.P99th} unit="ms" unitCss="box-units" desc="99th %(Last Week)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.msgsentlastweek.uptime} unit="%" unitCss="box-units" desc="Uptime(Last Week)"
                                descCss="drogonbox-kpi" dataCss="drogonbox-count" divCss="drogonbox users"/>
                        <MyCard data={this.state.msgsentlastweek.failure} unit="" unitCss="box-units" desc="Failures(Last Week)" descCss="drogonbox-kpi"
                                dataCss="drogonbox-count" divCss="drogonbox errors" tooltip={this.state.msgsentlastweek.outagetime}/>
                    </ul>

                    <div className="row">
                        <div className="col">
                            <h6 style={{'text-align': "center"}}>MQTT MessageSent Latency(last 24 hours)</h6>
                            <MultipleTimeSeriesChart data={lastDayData.messagesent} xAxisDataKey="time"
                                                     yAxisDataKey={this.state.trend_strokeMS} func={formatXAxis}
                                                     aspect_width={9.0} aspect_height={2.0} yaxisunit=" ms"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col">
                                    <h6 style={{'text-align': "center"}}>MQTT Message Sent Latency(last hour)</h6>
                                    <MultipleTimeSeriesChart data={rev_data.messagesent} xAxisDataKey="time"
                                                             yAxisDataKey={this.state.trend_strokeMS}
                                                             func={formatXAxis} aspect_width={4.0}
                                                             aspect_height={2.0} yaxisunit=" ms"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-12 col-lg-6">
                            <div className="row">
                                <div className="col">
                                    <h6 style={{'text-align': "center"}}>Response Times Distribution of Last
                                        Week</h6>
                                    <MyTable data={respDistribution.messagelastweek} xAxisDataKey="range"
                                             yAxisDataKey="count"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        }
}

function formatXAxis(tickItem) {
    return moment(tickItem).format('HH:mm:ss A')
}

function formatXAxisDate(tickItem) {
    return moment(tickItem).format('DD:MM:YYYY')
}

export default connect (state => {
    let runs = state.Mqtt
    return {
        suites: Immutable.Map.isMap(runs) ? runs.toJS() : runs
    }
})(Mqtt)