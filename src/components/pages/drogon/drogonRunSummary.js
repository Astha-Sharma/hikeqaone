import React,{Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import PageTitle from '../../PageTitle';
import {getRunningDetails,getRunningSummary} from '../../../actions/drogon/depictSummary'
import DepictSummaryConstants from '../../../constants/drogon/depictSummaryConstants';
import MyPortlet from '../../MyPortlet';
import MyDyGraph from '../../MyDyGraphs';
import MyStaticResult from '../../MyStaticResult';
import drogon from './drogon.css';
import MyCard from '../../MyCard';
import Widget from '../../../elements/Widget';
var commonHelper= require('../../utils/commonHelper');





class DrogonRunSummary extends Component{
    constructor(props) {
        super(props);
        this.state={
            depictRunningSummaryResponseTime:{
                data:"{}",
                options:{
                    strokeWidth:1,
                    //title:"Avg Response Time",
                    ylabel:"ms",
                    xlabel:"Duration",
                    labels:"{}",
                    drawPoints:true,
                    legend:"always",
                     width:1120,
                     height:200,
                    showRoller:true,
                    gridLineWidth: '0.1',
                    labelsDiv:"responseTimelabel",
                    highlightSeriesOpts: { strokeWidth: 2,highlightCircleSize:4, },

                }
            },
            depictRunningSummaryThroughPut:{
                data:"{}",
                options:{
                    strokeWidth:1,
                   // title:"ThroughPut (RPM)",
                    ylabel:"per min",
                    xlabel:"Duration",
                    labels:"{}",
                    drawPoints:true,
                    legend:"always",
                     width:1120,
                     height:200,
                    showRoller:true,
                    gridLineWidth: '0.1',
                    labelsDiv:"throughtPutlabel",
                    highlightSeriesOpts: { strokeWidth: 2,highlightCircleSize:4, }

                }
            },
            depictRunningDetailsResponse:{
                data:"{}"
            },
            runId:'',

        }
    }

    myformator(data) {
        if (data.x == null) return '';  // no selection
        return data.xHTML + data.series.map(v => v.labelHTML + ': ' + v.yHTML).join(' ');
    }

    formulateData(details,maincol,subcol){
        let respData=details;
        let result={
            gydata:[],
            gylabels:[]
        }
        let counter=0;
        result.gylabels.push("Time")
        respData.map((mainValue, _)=>{
            let subData=[];
            let parseTime=mainValue[maincol];
            subData.push(new Date(parseTime));
            let parseMainValue=mainValue[subcol];
            for (var key in parseMainValue) {
                if(counter===0){
                    result.gylabels.push(key);
                    ;                         }
                subData.push(parseMainValue[key]);
            };
            counter=counter+1;
            result.gydata.push(subData);
        });
      return result;
    }

    componentDidMount() {
        this.setState({runId : this.props.match.params.runId})
        let {dispatch} = this.props
        Promise.all([dispatch(getRunningDetails("drogon_master_u958y4swnq46bk63s0ws"))]).then((result) => {
            if (result[0].type === DepictSummaryConstants.GET_DROGON_RUNNING_DETAILS_FULFILLED) {
                let details = JSON.parse(result[0].data.body.text);
                if (details.status.statusType === 'SUCCESS') {
                    let depictRunningDetailsResponse=this.state.depictRunningDetailsResponse;
                    depictRunningDetailsResponse.data=details.data;
                    this.setState({depictRunningDetailsResponse: depictRunningDetailsResponse});
                }
            }
        });
        Promise.all([dispatch(getRunningSummary("drogon_master_u958y4swnq46bk63s0ws"))]).then((result) => {
            if (result[0].type === DepictSummaryConstants.GET_DROGON_RUNNING_SUMMARY_FULFILLED) {
                let details = JSON.parse(result[0].data.body.text);
                if (details.status.statusType === 'SUCCESS') {
                    let resultResponseTime=this.formulateData(details.data.overallResponseStats,'time','responseTime');
                    let depictRunningSummaryResponseTime=this.state.depictRunningSummaryResponseTime
                    depictRunningSummaryResponseTime.data=resultResponseTime.gydata;
                    depictRunningSummaryResponseTime.options.labels=resultResponseTime.gylabels;
                    let resultThroughtPut=this.formulateData(details.data.overallThroughputStats,'time','throughPut');
                    let depictRunningSummaryThroughPut=this.state.depictRunningSummaryThroughPut
                    depictRunningSummaryThroughPut.data=resultThroughtPut.gydata;
                    depictRunningSummaryThroughPut.options.labels=resultThroughtPut.gylabels;
                    this.setState({depictRunningSummaryResponseTime: depictRunningSummaryResponseTime,depictRunningSummaryThroughPut:depictRunningSummaryThroughPut});
                }
            }
        });
    }

    render() {
        return (
            <div>
                <PageTitle title="▁ ▂ ▄ ▅ ▅ ▆ ▇ ▇ █ 𝓓𝓻𝓸𝓰𝓸𝓷 𝓡𝓾𝓷𝓷𝓲𝓷𝓰 𝓢𝓾𝓶𝓶𝓪𝓻𝔂 █ ▇ ▇ ▆ ▅ ▅ ▄ ▂ ▁"/>
                <div>
                    <ul className="top-stats row">
                        <MyCard data="200" unit="" unitCss="box-units" desc="Total Go Routines"  descCss="drogonbox-kpi"  dataCss="drogonbox-count" divCss="drogonbox users" />
                        <MyCard data="200" unit="" unitCss="box-units" desc="Total Active Users"  descCss="drogonbox-kpi"  dataCss="drogonbox-count" divCss="drogonbox users" />
                        <MyCard data="40" unit="" unitCss="box-units" desc="Total Plan Attempted"  descCss="drogonbox-kpi"  dataCss="drogonbox-count" divCss="drogonbox users" />
                        <MyCard data="560" unit="" unitCss="box-units" desc="Total Plan Completed"  descCss="drogonbox-kpi"  dataCss="drogonbox-count" divCss="drogonbox users" />
                        <MyCard data="60" unit="" unitCss="box-units" desc="Total Plan Failed"  descCss="drogonbox-kpi"  dataCss="drogonbox-count" divCss="drogonbox users" />
                        <MyCard data="60" unit="" unitCss="box-units" desc="Order Per Min"  descCss="drogonbox-kpi"  dataCss="drogonbox-count" divCss="drogonbox errors" />
                    </ul>
                </div>
                <div className="col-xs-12">
                    <div className="runningDetails">
                        <div className="row">
                            <div className="col-md-6">
                                <MyStaticResult  headerStyle="staticText" textStyle="staticText" icon="fa fa-clock-o" style={{"color":"lightgreen"}} name="Duration" data={this.state.depictRunningDetailsResponse.data.duration}/>
                                <MyStaticResult  headerStyle="staticText" textStyle="staticText" icon="fa fa-play" style={{"color":"lightgreen"}} name="Started" data={commonHelper.epochConverter(this.state.depictRunningDetailsResponse.data.startedOn)}/>
                            </div>
                            <div className="col-md-6">
                                <MyStaticResult  headerStyle="staticText" textStyle="staticText" icon="fa fa-stop" style={{"color":"lightgreen"}} name="Ended" data={commonHelper.epochConverter(this.state.depictRunningDetailsResponse.data.endedOn)}/>
                                <MyStaticResult  headerStyle="staticText" textStyle="staticText" icon="fa fa-tachometer" style={{"color":"lightgreen"}} name="Status" data={this.state.depictRunningDetailsResponse.data.status}/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
                {this.state.depictRunningSummaryResponseTime.options.labels !=="{}" ?
                    <div>
                    <div className="row">
                        <MyPortlet title="Avg Response Time">
                            <div className="col-xs-12">
                                      <MyDyGraph data={this.state.depictRunningSummaryResponseTime.data} options={this.state.depictRunningSummaryResponseTime.options}/>
                                      <div id="responseTimelabel"></div>
                            </div></MyPortlet>
                    </div>

                    <div className="row">
                    <MyPortlet title="ThroughPut (RPM)">
                    <div className="col-xs-12">
                        <MyDyGraph data={this.state.depictRunningSummaryThroughPut.data} options={this.state.depictRunningSummaryThroughPut.options}/>
                        <div id="throughtPutlabel"></div>
                    </div>
                    </MyPortlet>
                    </div>
                    </div>
                    : ''}
                </div>
        )


    }

}

export default connect (state => {
    let drogonRunSummary = state.DrogonRunSummary;
    return {
        drogonRunSummary: Immutable.Map.isMap(drogonRunSummary) ? drogonRunSummary.toJS() : drogonRunSummary
    }
})(DrogonRunSummary)


