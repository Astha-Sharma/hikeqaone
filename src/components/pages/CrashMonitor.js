import React,{Component} from 'react';
import {connect} from "react-redux";
import moment from 'moment'
import '../../css/ui-elements/tabs.css'
import Widget from '../../elements/Widget'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import { getAndroidTrends, getAndroidTrendsTop, getIosTrends, getAllAndroidVersion, getAndroidCrashSummaryByVersion, getMicroAppsCrashDetails} from "../../actions/crashmonitor";
import MultipleTimeSeriesChart from "../MultipleTimeSeriesChart";
import crashConstants from "../../constants/crashconstants";
import MySimpleBarChart from "../MySimpleBarChart";
import MyReactSelect from "../MyReactSelect";
import MySimplePieChart from "../MySimplePieChart";
import MyCrashMonitorTable from '../MyCrashMonitorTable';
import MicroAppsCrashesTable from '../MicroAppsCrashesTable'

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
            allandroidVersion :[],
            crashDetails : [],
            issueTypes : [],
            areaWiseSplit :[],
            microAppsCrashes : [],
            microAppsSplit :[],
            envValue : "",
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
            ],
            showing : false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }

        if(tab === 0){
            this.getAndroidTrends()
            this.getAndroidTrendsTop()
        }

         if( tab === 1 ){
             this.getIosTrends()
         }

         if (tab === 2) {
             this.getAllAndroidVersion()
         }

         if(tab === 3) {
             getMicroAppsCrashDetails()
         }
    }

    componentDidMount() {
        //this.foo = setInterval(() => this.getAndroidTrends(), 50000);
        //this.foo = setInterval(() => this.getAndroidTrendsTop(), 50000)
        //this.foo = setInterval(() => this.getIosTrends(), 5000)
        //this.foo = setInterval(() => this.getAllAndroidVersion(), 50000)
        this.getIosTrends()
        this.getAndroidTrends()
        this.getAndroidTrendsTop()
        this.getAllAndroidVersion()
        this.getMicroAppsCrashDetails()
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

    getAllAndroidVersion() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getAllAndroidVersion())]).then((result)=>{
            if (result[0].type === crashConstants.GET_ANDROIDVERSION_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    allandroidVersion : data.version,
                    //envValue : data.version[0]
                })
            }
        });
    }

    getMicroAppsCrashDetails() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getMicroAppsCrashDetails())]).then((result)=>{
            if (result[0].type === crashConstants.GET_MICROAPPS_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    microAppsCrashes : data.crashDetails,
                    microAppsSplit : data.areaWiseSplit,

                })
            }
        });
    }

    componentWillUnmount(){
        clearInterval(this.foo)
    }

    onEnvSelect = (e) => {
        this.state.showing = true
        if(e.value!=null) {
            let newEnv = e.value.value;
            if(newEnv!=null) {
                this.setState({envValue: e.value.value});
            }else{
                var { dispatch } = this.props;
                Promise.all([dispatch(getAndroidCrashSummaryByVersion(this.state.envValue))]).then((result)=>{
                    if (result[0].type === crashConstants.GET_ANDROID_CRASH_SUMMARY_BY_VERSION_FULFILLED ){
                        var res = JSON.parse(result[0].data.body.text);
                        this.setState({
                            crashDetails : res.crashDetails,
                            issueTypes : res.issueTypes,
                            areaWiseSplit: res.areaWiseSplit
                        })
                    }
                });
            }
        }
    }

    /*
    componentDidMount(){
        //getAllAndroidVersion()
    }
    */

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
                                    }else if(nav.text==="Android Crashes by version" && this.state.activeTab===index) {
                                        return(
                                            <TabPane tabId ={`${index}`}>
                                                <div className="row">
                                                    <div className="col-12 col-xl-6">
                                                        <MyReactSelect className="dropdown-default dropdown" label="Select Version" value={this.state.envValue} options={ this.state.allandroidVersion } placeholder="Select Version" onChange={this.onEnvSelect} />
                                                    </div>
                                                </div>
                                                {this.state.showing ?
                                                    <div className="row">
                                                        <div className="col-12 col-xl-6">
                                                            <h6 style={{'text-align': "center"}}>Issue status summary</h6>
                                                            <MySimplePieChart data={this.state.issueTypes} displayTotalIssue="true" cx={250} cy={150} w={500} h={300}/>
                                                        </div>
                                                        <div className="col-12 col-xl-6">
                                                            <h6 style={{'text-align': "center"}}>Top Crashes-AreaWise Split</h6>
                                                            <MySimplePieChart data={this.state.areaWiseSplit} displayTotalIssue="false" cx={250} cy={150} w={500} h={300}/>
                                                        </div>
                                                    </div> : <div></div>
                                                }
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h6 style={{'text-align': "center"}}>Top Crashes on this version</h6>
                                                        <MyCrashMonitorTable data={this.state.crashDetails}/>
                                                    </div>
                                                </div>
                                            </TabPane>
                                        )
                                    }else if(nav.text==="MicroApp Crashes" && this.state.activeTab===index) {
                                        return(
                                            <TabPane tabId ={`${index}`}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h6 style={{'text-align': "center"}}>Top Crashes-Microapp Split</h6>
                                                        <MySimplePieChart data={this.state.microAppsSplit} displayTotalIssue="false" cx={500} cy={150} w={1000} h={300}/>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12">
                                                        <h6 style={{'text-align': "center"}}>Top Microapp Crashes</h6>
                                                        <MicroAppsCrashesTable data={this.state.microAppsCrashes}/>
                                                    </div>
                                                </div>
                                            </TabPane>
                                        )
                                    }
                                    }
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