import React,{Component} from 'react';
import {connect} from "react-redux";
import moment from 'moment'
import '../../css/ui-elements/tabs.css'
import Widget from '../../elements/Widget'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import { getAndroidTrends, getAndroidTrendsTop, getIosTrends } from "../../actions/crashmonitor";
import MultipleTimeSeriesChart from "../MultipleTimeSeriesChart";
import crashConstants from "../../constants/crashconstants";
import MySimpleBarChart from "../MySimpleBarChart";

class CrashMonitor extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            navData: [
                { text: 'Android',value:"", active: true, id:'android'},
                { text: 'IOS',value:"", active: false, id:'ios'},
                { text: 'Android Crashes by version',value:"", active: true, id:'androidversion'},
                { text: 'MicroApp Crashes',value:"", active: true, id:'microapps'},
                ],
            activeTab: 0,
            androidTrendDaily :[],
            androidTrendWeekly :[],
            androidTrendDailyTop :[],
            androidTrendWeeklyTop :[],
            iosTrendDaily :[],
            iosTrendWeekly :[],
            trend_strokeC : [
                {
                    data: "percentage",
                    stroke:  "#0f8fd8",
                    type: 'monotone'
                }
            ],
            trend_weekly : [
                {
                    data: "delta",
                    stroke:  "#0f8fd8",
                    type: 'monotone'
                }
            ]
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    componentDidMount() {
        this.foo = setInterval(() => this.getAndroidTrends(), 5000);
        this.foo = setInterval(() => this.getAndroidTrendsTop(), 5000)
        this.foo = setInterval(() => this.getIosTrends(), 5000)
    };

    getAndroidTrends() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getAndroidTrends())]).then((result)=>{
            if (result[0].type === crashConstants.GET_TRENDSANDROID_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    androidTrendDaily: data.dailytreand,
                    androidTrendWeekly: data.weeklytrend
                })
            }
        });
    }

    getAndroidTrendsTop() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getAndroidTrendsTop())]).then((result)=>{
            if (result[0].type === crashConstants.GET_TRENDSANDROIDTOP_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    androidTrendDailyTop: data.dailytreand,
                    androidTrendWeeklyTop: data.weeklytrend
                })
            }
        });
    }

    getIosTrends() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getIosTrends())]).then((result)=>{
            if (result[0].type === crashConstants.GET_TRENDSIOS_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    iosTrendDaily: data.dailytreand,
                    iosTrendWeekly: data.weeklytrend
                })
            }
        });
    }

    componentWillUnmount(){
        clearInterval(this.foo)
    }

    render() {
        var dailyTrends =  this.state.androidTrendDaily
        var WeeklyTrends =  this.state.androidTrendWeekly

        var dailyTrendsTop =  this.state.androidTrendDailyTop
        var WeeklyTrendsTop =  this.state.androidTrendWeeklyTop

        var dailyTrendsIos =  this.state.iosTrendDaily
        var WeeklyTrendsIos =  this.state.iosTrendWeekly
        return(
            <div>
                <div className="row">
                    <div className="col-12 col-xl-12">
                        <Widget title ="Crash Stats" description="">
                            <Nav tabs className="nav nav-tabs nav-pills nav-tabs-info nav-bar-fixed-top">
                                {this.state.navData.map((nav,index) =>{
                                    return(
                                        <NavItem>
                                            <NavLink
                                                className={this.state.activeTab === index ? 'active' : ''}
                                                onClick={() => this.toggle(index)}>
                                                {nav.text}
                                            </NavLink>
                                        </NavItem>
                                    )
                                })}
                            </Nav>
                            <TabContent activeTab={this.state.activeTab.toString()}>
                                {this.state.navData.map((nav,index) =>{
                                    {if(nav.text==="Android" && this.state.activeTab===index){
                                        return(
                                            <div className="table-responsive">
                                                <TabPane tabId ={`${index}`}>
                                                    <Widget title ="Crash Free Users Trend - All Builds" description="Crash Free Users (Shows daily CFU percentage
                                                                                                                    and it's comparison with the previous day)
                                                                                                                    Includes users on all builds">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6 style={{'text-align': "center"}}>Daily Trend</h6>
                                                            <MultipleTimeSeriesChart data={dailyTrends}
                                                                             xAxisDataKey="date"
                                                                             yAxisDataKey={this.state.trend_strokeC}
                                                                             aspect_width={5.0}
                                                                             aspect_height={2.0}
                                                                             yaxisunit=" %"/>
                                                        </div>
                                                        <div className="col">
                                                            <h6 style={{'text-align': "center"}}>Delta</h6>
                                                            <MySimpleBarChart data={dailyTrends}
                                                                      yAxisDataKey="delta"
                                                                      xAxisDataKey="date"
                                                                      aspect_width={5.0}
                                                                      aspect_height={2.0}/>
                                                        </div>
                                                    </div>
                                                    <div className="row"/>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6 style={{'text-align': "center"}}>Weekly Trend</h6>
                                                            <MultipleTimeSeriesChart data={WeeklyTrends}
                                                                                     xAxisDataKey="date"
                                                                                     yAxisDataKey={this.state.trend_strokeC}
                                                                                     aspect_width={8.0}
                                                                                     aspect_height={2.0}
                                                                                     yaxisunit=" %"/>
                                                        </div>
                                                    </div>
                                                    </Widget>

                                                    <Widget title ="Crash Free Users Trend - Top 5 Builds" description="Crash Free Users (Shows daily CFU percentage
                                                                                                                    and it's comparison with the previous day)
                                                                                                                    Includes users on all builds">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6 style={{'text-align': "center"}}>Daily Trend</h6>
                                                            <MultipleTimeSeriesChart data={dailyTrendsTop}
                                                                                     xAxisDataKey="date"
                                                                                     yAxisDataKey={this.state.trend_strokeC}
                                                                                     aspect_width={5.0}
                                                                                     aspect_height={2.0}
                                                                                     yaxisunit=" %"/>
                                                        </div>
                                                        <div className="col">
                                                            <h6 style={{'text-align': "center"}}>Delta</h6>
                                                            <MySimpleBarChart data={dailyTrendsTop}
                                                                              yAxisDataKey="delta"
                                                                              xAxisDataKey="date"
                                                                              aspect_width={5.0}
                                                                              aspect_height={2.0}/>
                                                        </div>
                                                    </div>
                                                    <div className="row"/>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6 style={{'text-align': "center"}}>Weekly Trend</h6>
                                                            <MultipleTimeSeriesChart data={WeeklyTrendsTop}
                                                                              xAxisDataKey="date"
                                                                              yAxisDataKey={this.state.trend_strokeC}
                                                                              aspect_width={8.0}
                                                                              aspect_height={2.0}
                                                                              yaxisunit=" %"/>
                                                        </div>
                                                    </div>
                                                    </Widget>
                                                </TabPane>
                                            </div>
                                        )
                                    }else if(nav.text==="IOS" && this.state.activeTab===index){
                                        return(
                                            <div className="table-responsive">
                                                <TabPane tabId ={`${index}`}>
                                                    <Widget title ="Crash Free Users Trend - All Builds" description="Crash Free Users (Shows daily CFU percentage
                                                                                                                and it's comparison with the previous day)
                                                                                                                Includes users on all builds">
                                                        <div className="row">
                                                            <div className="col">
                                                                <h6 style={{'text-align': "center"}}>Daily Trend</h6>
                                                                <MultipleTimeSeriesChart data={dailyTrendsIos}
                                                                                         xAxisDataKey="date"
                                                                                         yAxisDataKey={this.state.trend_strokeC}
                                                                                         aspect_width={5.0}
                                                                                         aspect_height={2.0}
                                                                                         yaxisunit=" %"/>
                                                            </div>
                                                            <div className="col">
                                                                <h6 style={{'text-align': "center"}}>Delta</h6>
                                                                <MySimpleBarChart data={dailyTrendsIos}
                                                                                  yAxisDataKey="delta"
                                                                                  xAxisDataKey="date"
                                                                                  aspect_width={5.0}
                                                                                  aspect_height={2.0}/>
                                                            </div>
                                                        </div>
                                                        <div className="row"/>
                                                        <div className="row">
                                                            <div className="col">
                                                                <h6 style={{'text-align': "center"}}>Weekly Trend</h6>
                                                                <MultipleTimeSeriesChart data={WeeklyTrendsIos}
                                                                                  xAxisDataKey="date"
                                                                                  yAxisDataKey={this.state.trend_strokeC}
                                                                                  aspect_width={8.0}
                                                                                  aspect_height={2.0}
                                                                                  yaxisunit=" %"/>
                                                            </div>
                                                        </div>
                                                    </Widget>
                                                </TabPane>
                                            </div>
                                        )
                                    }}
                                })}
                            </TabContent>
                        </Widget>
                    </div>
                </div>
            </div>
        )
    }
}

function formatXAxis(tickItem) {
    return moment(tickItem).format('HH:mm:ss A')
}

function formatXAxisDate(tickItem) {
    return moment(tickItem).format('DD:MM:YYYY')
}

export default connect ()(CrashMonitor)