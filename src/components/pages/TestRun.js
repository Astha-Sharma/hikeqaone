import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PageTitle from '../PageTitle';
import {getRuns} from "../../actions/shadowtower";
import shadowtowerConstants from "../../constants/shadowtowerConstants";
import Immutable from "immutable";
import {connect} from "react-redux";
import MultipleTimeSeriesChart from "../MultipleTimeSeriesChart";
import '../../css/shadowTower/shadowtower.css';
import moment from 'moment'

const options =  {
    page : 2,
    sizePerPageList :  [ {
        text: '5', value: 5
    }
        ],
    sizePerPage :  5,  // which size per page you want to locate as default
    pageStartIndex : 1, // where to start counting the pages
    paginationSize : 5,
    paginationShowsTotal : this.renderShowsTotal,  // Accept bool or function
    paginationPosition : 'top'
};

class TestResult extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            rundata: [],
            runId: "",
            runs: 1,
            tests: -1,
            isflag:true,
            trend_stroke : [
                {
                    data: "Total",
                    stroke:  "#8884d8",
                    type: 'monotone'
                },
                {
                    data: "Passed",
                    stroke: "#5fb976",
                    type: 'monotone'
                },
                {
                    data: "Failed",
                    stroke: "#f56b6b",
                    type: 'monotone'
                },
                {
                    data: "Skipped",
                    stroke: "#ffc658",
                    type: 'monotone'
                }
            ]
        }
    }

    componentDidMount() {
       this.loadRuns()
       this.foo = setInterval(() => this.loadRuns(), 10000);
    };

    componentWillUnmount(){
        clearInterval(this.foo)
    }

    loadRuns() {
        this.state.runId = this.props.match.params.runId
        var { dispatch } = this.props;
        Promise.all([dispatch(getRuns(this.state.runId))]).then((result)=>{
            if (result[0].type === shadowtowerConstants.GET_SHADOWTOWERRUNS_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    rundata: data
                })
            }
        });
    }

    ref(cell, row, rowIndex) {
        return (
            <a onClick={() => {this.rowclick(row.id)}} href="" style={{'text-decoration':'underline'}}>{row.Testsuitename}</a>
        )
    }

    rowclick(id, cell, row, rowIndex) {
        return (
            <div>
                {this.props.history.push("/api/shadowtower/gettests/"+id+"/runs")}
            </div>
        );
    }

    stringcheck(cell,row,rowIndex) {
        var p
        if(row.Percentage)
             p = row.Percentage
        else
            p = "--"
        return(p)
    }

    progressBar(cell, row, rowIndex) {
        if(row.Status == 'ended') {
            return (
                <div>
                    <p>
                    Completed &nbsp;
                        <i className="fa fa-check" style={{"font-size":"15px", "color":"green"}}></i>
                    </p>
                </div>
            )
        }
        else if(row.Status == 'running'){
            return (
                <div>
                    <p>In-Progress  &nbsp;&nbsp;
                        <i className="fa fa-circle-o-notch fa-spin" style={{"color":"blue"}}></i>
                    </p>
                </div>
            )
        }
        else {
            return (
            <div>
                <p>
                    Terminated &nbsp;
                    <i className="fa fa-close" style={{"font-size":"15px", "color":"#FF6347"}}></i>
                </p>
            </div>
            )
        }
    }

    render() {
        var rev_data = this.state.rundata;
        var newArr = [ ...rev_data ]
        if (this.state.runs > 0) {
            return (
                <div>

                <div>
                    <PageTitle title="Result for Suite" rightRender={null} />
                    <BootstrapTable tableHeaderClass='table-header-class' data={this.state.rundata} striped hover condensed pagination options = {options}>
                        <TableHeaderColumn width='150' dataField='id' hidden > ID </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Testsuitename' isKey dataFormat={this.ref.bind(this)}> Suite Name </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Status' dataFormat={this.progressBar.bind(this)}> Status </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Env' filter={ { type: 'TextFilter', delay: 500 }}> Environment </TableHeaderColumn>
                        <TableHeaderColumn width='75' dataField='Passed' columnClassName='td-column-pass tr-style'> Passed </TableHeaderColumn>
                        <TableHeaderColumn width='75' dataField='Failed' columnClassName='td-column-fail'> Failed </TableHeaderColumn>
                        <TableHeaderColumn width='90' dataField='Skipped' columnClassName='td-column-skip'> Skipped </TableHeaderColumn>
                        <TableHeaderColumn width='75' dataField='Total' columnClassName='td-column-total'> Total </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Percentage' dataFormat={this.stringcheck.bind(this)}> Pass Percentage </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Duration'> Duration </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Branch' columnClassName='td-branch'> Branch </TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='Created_on'> Start Time </TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='Last_modified_on'> End Time </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Manual' hidden> Manual </TableHeaderColumn>
                    </BootstrapTable>
                </div>
                    <br/><br/>
                    <div >
                        <h5 style={{'text-align':"center"}}>Test Result Trend</h5>
                        <MultipleTimeSeriesChart data={newArr.reverse()} xAxisDataKey="Created_on"
                                                 yAxisDataKey={this.state.trend_stroke} func={formatXAxis} aspect_width={9.0} aspect_height={2.0}/>
                    </div>
                    <br/><br/>
                </div>
            );
        }
    }
}

function formatXAxis(tickItem) {
    return moment(tickItem).format('YYYY-MM-DD')
}

export default connect (state => {
    let runs = state.ShadowTower
    return {
        suites: Immutable.Map.isMap(runs) ? runs.toJS() : runs
    }
})(TestResult)