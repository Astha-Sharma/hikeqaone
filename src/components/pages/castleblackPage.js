import React, {Component} from 'react'
import '../../css/ui-elements/tabs.css'
import Widget from '../../elements/Widget'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import {connect} from 'react-redux';
import {getAggSummary} from '../../actions/castleblack.js';
import CastleBlackConstants from '../../constants/castleBlackConstants'
import Immutable from 'immutable';
import ReactGuage from '../reactguage';
import MyReactSelect from "../MyReactSelect";


class CastleBlackPage extends Component  {

    constructor(props){
        super(props);
        this.state ={
            navData: [{text: 'Summary',value:"Overall Status", active: true, id:'summary'},{text: 'ApiDetails',value:"🌜⚽〽️🎐🎵🌀   💲⚽⚽🎵", active: false, id:'details'}],
            activeTab: 0,
            summary:{
                lastonehour:0.00,
                lastoneday:0.00,
                lastoneweek:0.00,
                lastonemonth:0.00,
            },
            envValue:"stage1"

        }
        this.toggle = this.toggle.bind(this)
        this.onEnvSelect = this.onEnvSelect.bind(this)
   }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }

    onEnvSelect = (e) => {
        if(e.value!=null) {
            let newEnv = e.value.value;
            if(newEnv!=null) {
            this.setState({envValue: e.value.value});
            }else{
                var { dispatch } = this.props;
                Promise.all([dispatch(getAggSummary(this.state.envValue))]).then((result)=>{
                    if (result[0].type===CastleBlackConstants.GET__SUMMARY_FULFILLED ){
                        var res = JSON.parse(result[0].data.body.text);
                        let resp=this.state.summary
                        resp.lastonehour=res.data.hourStats.percentage
                        resp.lastoneday=res.data.dayStats.percentage
                        resp.lastoneweek=res.data.weekStats.percentage
                        resp.lastonemonth=res.data.monthStats.percentage
                        this.setState({'summary':resp})
                    } else{
                        console.log("error===",result)
                    }
                });
            }
        }
    }


    componentDidMount(){
        console.log("********componentDidMount******",this.state.envValue)
        var { dispatch } = this.props;
        Promise.all([dispatch(getAggSummary(this.state.envValue))]).then((result)=>{
             if (result[0].type===CastleBlackConstants.GET__SUMMARY_FULFILLED ){
                 var res = JSON.parse(result[0].data.body.text);
                 let resp=this.state.summary
                 resp.lastonehour=res.data.hourStats.percentage
                 resp.lastoneday=res.data.dayStats.percentage
                 resp.lastoneweek=res.data.weekStats.percentage
                 resp.lastonemonth=res.data.monthStats.percentage
                 this.setState({'summary':resp})
            } else{
                 console.log("error===",result)
            }
        });
    }

    render(){
        console.log("render=======",this.state.envValue)
        return(
        <div>
            <div className="row">
                <div className="col-12 col-xl-12">
                    <Widget
                        title ="Shadow Tower"
                        description="">
                        <Nav tabs className={`nav-tabs nav-tabs-rounded nav-tabs-success`}>
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
                                {if(nav.text==="Summary" && this.state.activeTab===index){
                                    return(
                                        <div className="table-responsive">
                                            <TabPane tabId ={`${index}`}>
                                             <div style={{float: 'right'}}>
                                                <MyReactSelect label="Select Environment" value={this.state.envValue} options={['stage1','stage2','stage3']} placeholder="Select Environment" onChange={this.onEnvSelect} />
                                             </div>
                                                <table className="table table-bordered table-condensed ">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th style={{'font-size':'14px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}>Name</th>
                                                    <th style={{'font-size':'14px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}>Summary</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <td style={{'font-size':'14px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}> Last One Hour</td>
                                                        <td><ReactGuage value={this.state.summary.lastonehour}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{'font-size':'14px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}> Last One Day</td>
                                                        <td><ReactGuage value={this.state.summary.lastoneday}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{'font-size':'14px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}> Last One Week</td>
                                                        <td><ReactGuage value={this.state.summary.lastoneweek}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{'font-size':'14px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}> Last One Month</td>
                                                        <td><ReactGuage value={this.state.summary.lastonemonth}/></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </TabPane>
                                        </div>
                                    )
                                }else if(nav.text==="ApiDetails" && this.state.activeTab===index){
                                    return(
                                        <div>
                                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                        <p style={{'font-size':'34px', 'font-weight':'bold', 'text-align': 'center','vertical-align': 'middle'}}>
                                            {nav.value}
                                        </p>
                                            <br/><br/><br/>  <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                        </div>
                                    )
                                }}
                            })}
                        </TabContent>
                    </Widget>
                </div>
            </div>
        </div>
    )}
}
export default connect(state => {
    let castleblack = state.CastleBlack;
    return {
        castleblack: Immutable.Map.isMap(castleblack) ? castleblack.toJS() : castleblack
    }
})(CastleBlackPage);