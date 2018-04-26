import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import PageTitle from '../PageTitle';
import Immutable from "immutable";
import {connect} from "react-redux";
import { Link } from 'react-router'
import {getSuite} from '../../actions/shadowtower';
import shadowtowerConstants from '../../constants/shadowtowerConstants'
import '../../css/shadowTower/shadowtower.css';

class TestSuites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suitedata: [],
            rundata: [],
            testsdata: [],
            runId:"",
            suites: 1,
            run: -1,
            tests: -1,
            invalid: false,
            suitename: "",
            reloadtime: 10000
        }
    }


    componentDidMount() {
            this.loadSuites()
            this.foo = setInterval(() => this.loadSuites(), this.state.reloadtime);
    }

    componentWillUnmount(){
        clearInterval(this.foo)
    }

    loadSuites() {
        var { dispatch } = this.props;
        Promise.all([dispatch(getSuite())]).then((result)=>{
            if (result[0].type === shadowtowerConstants.GET_SHADOWTOWERSUITES_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    suitedata: data
                })
            }
        });
    }

    progressBar(cell, row, rowIndex) {
        if(row.Progress == 0) {
            return (<div>
                <p>
                    Completed &nbsp;
                    <i className="fa fa-check" style={{"font-size":"15px", "color":"green"}}></i>
                </p>
            </div>)
        }
        else if(row.Progress == -1){
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
                    <p>Terminated &nbsp;&nbsp;
                        <i className="fa fa-close" style={{"color":"#FF6347"}}></i>
                    </p>
                </div>
            )
        }
    }

    ref(cell, row, rowIndex) {
        return (
            <div>
                <a onClick={() => {this.rowclick(row.id)}} href="" style={{'text-decoration':'underline'}}>{row.Testsuitename}</a>
            </div>
        )
    }

    rowclick(id, cell, row, rowIndex) {
        this.props.history.push("/api/shadowtower/getruns/"+id+"/runs")
    }

    render() {
        if (this.state.suites > 0) {
            return (
                <div>
                    <PageTitle title="We have data of followings" rightRender={null} />
                    <BootstrapTable data={this.state.suitedata} tableHeaderClass='table-header-class' hover condensed striped>
                    <TableHeaderColumn dataField='id' isKey={true} hidden> ID </TableHeaderColumn>
                    <TableHeaderColumn dataField='Team' filter={ { type: 'TextFilter', delay: 500 } }> Team </TableHeaderColumn>
                    <TableHeaderColumn dataField='Core' filter={ { type: 'TextFilter', delay: 500 } }> Core </TableHeaderColumn>
                    <TableHeaderColumn dataField='Testsuitename' filter={ { type: 'TextFilter', delay: 500 }}  dataFormat={this.ref.bind(this)}> Name </TableHeaderColumn>
                    <TableHeaderColumn dataField='Progress' dataFormat={this.progressBar.bind(this)}> Progress </TableHeaderColumn>
                    <TableHeaderColumn dataField='Type'> Type </TableHeaderColumn>
                    {/*<TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} hidden> Details </TableHeaderColumn>*/}
                </BootstrapTable>
                </div>
            );
        }
    }
}
export default connect (state => {
    let suites = state.ShadowTower
    return {
        suites: Immutable.Map.isMap(suites) ? suites.toJS() : suites
    }
})(TestSuites)
