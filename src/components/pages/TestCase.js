import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PageTitle from '../PageTitle';
import {getTests} from "../../actions/shadowtower";
import shadowtowerConstants from "../../constants/shadowtowerConstants";
import {connect} from "react-redux";
import Immutable from "immutable";
import {ButtonToolbar, Button, OverlayTrigger, Tooltip, Popover} from 'react-bootstrap';
import TestCaseDialog from "./TestCaseDialog";
import '../../css/elements/process.css';
import '../../css/shadowTower/shadowtower.css';

class TestCase extends React.Component
{
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            testsdata: [],
            runId: "",
            hover: false
        }
    }

    ref(cell, row, rowIndex) {
        return (
            <Button bsStyle="primary" bsSize="large" onClick={() => this.showModal()}>
                Launch demo modal
            </Button>
        )
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    showModal() {
        this.setState({
            istest: false
        });
    }

    componentDidMount() {
        this.state.runId = this.props.match.params.runId
        var { dispatch } = this.props;
        Promise.all([dispatch(getTests(this.state.runId))]).then((result)=>{
            if (result[0].type === shadowtowerConstants.GET_SHADOWTOWERTESTS_FULFILLED ) {
                var data = JSON.parse(result[0].data.body.text);
                this.setState({
                    testsdata: data
                })
            }
        });
    };

    testCaseName(cell,row,rowIndex) {
        var p
        var error, errormessage, testparams, desc
        if (row.Result == 1){
            if(row.Testparams)testparams = row.Testparams
            else testparams = "--"
            if(row.Description)desc = row.Description
            else desc = "--"
            return (<div>
                <TestCaseDialog label={row.Testcase_id} mainHeader="Details: "
                                header1="Test Params: " contentValue1={testparams}
                                header2="Description: " contentValue2={desc}>Check</TestCaseDialog>
            </div>)
        }
        else {
            if(row.Error)error = row.Error
            else error = "--"
            if(row.Errormessage)errormessage = row.Errormessage
            else errormessage = "--"
            if(row.Testparams)testparams = row.Testparams
            else testparams = "--"
            if(row.Description)desc = row.Description
            else desc = "--"
            return (
                <div>
                    <TestCaseDialog label={row.Testcase_id} mainHeader="Details" header1="Error: " contentValue1={error}
                                    header2="Error Message: " contentValue2={errormessage}
                                    header3="Test Params: " contentValue3={testparams}
                                    header4="Description: " contentValue4={desc}>Check</TestCaseDialog>
                </div>
            )
        }
    }

    result(cell,row, rowIndex) {
        if(row.Result == 1)
            return (
                //<Button bsStyle="success" bsSize="xsmall">Success</Button>
                <div><i className="fa fa-check-circle" style={{"font-size":"24px", "color":"green"}}></i></div>
            )
        else  if(row.Result == 2)
            return (
                //<Button bsStyle="danger">Failed</Button>
                <div><i className="fa fa-close" style={{"font-size":"24px", "color":"red"}}></i></div>
            )

        else  if(row.Result == 3)
                return (<div><i className="fa fa-exclamation-triangle" style={{"font-size":"24px", "color":"orange"}}></i></div>)

    }

    errorcheck(cell,row,rowIndex) {
        var p, error
        if(row.Error)error = row.Error
        else error = "--"
        if(row.Error)
           return(
               <div>
                   <TestCaseDialog label={row.Error}  header1="Error: " contentValue1={error}
                                   >Check</TestCaseDialog>
               </div>
           )
        else
            p = "--"
        return(p)
    }

    errorMessagecheck(cell,row,rowIndex) {
        var p, errormessage
        if(row.Errormessage)errormessage = row.Errormessage
        else errormessage = "--"
        if(row.Errormessage)
            return (
                <div>
                    <TestCaseDialog label={row.Errormessage}
                                    header1="Error Message: " contentValue1={errormessage}>Check</TestCaseDialog>
                </div>
            )
        else
            p = "--"
        return(p)
    }

    description(cell,row,rowIndex) {
        var p, desc
        if(row.Description)desc = row.Description
        else desc = "--"
        if(row.Description)
            return (
                <div>
                    <TestCaseDialog label={row.Description}
                                    header1="Error Message: " contentValue1={desc}>Check</TestCaseDialog>
                </div>
            )
        else
            return("--")
    }

    comments(cell,row,rowIndex) {
        var p
        if(row.Comments)
            p = row.Comments
        else
            p = "--"
        return(p)
    }

    sort() {
        return (
            <div>
                Result &nbsp;
            <i className="fa fa-caret-down" style={{"font-size":"15px", "color":"black"}}></i>
                <i className="fa fa-caret-up" style={{"font-size":"15px", "color":"black"}}></i>
            </div>)
    }

    params(cell,row,rowIndex) {
        var p, parameter
        if(row.Testparams)parameter = row.Testparams
        else parameter = "--"
        if(row.Testparams)
            return (
                <div>
                    <TestCaseDialog label={row.Testparams}
                                    header1="Test Params: " contentValue1={parameter}>Check</TestCaseDialog>
                </div>
            )
        else
            return("--")
    }

    render() {
            return (
                <div>
                    <PageTitle title="Test Cases" rightRender={null} />
                    <BootstrapTable data={this.state.testsdata} tableHeaderClass='table-header-class' hover condensed striped search pagination >
                        <TableHeaderColumn width='200' dataField='Testcase_id' dataFormat={this.testCaseName.bind(this)}> Test Case Name </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='id' isKey hidden> ID </TableHeaderColumn>
                        <TableHeaderColumn width='350' dataField='Description' dataFormat={this.description.bind(this)}> Description </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Testparams' dataFormat={this.params.bind(this)}> Test Params </TableHeaderColumn>
                        <TableHeaderColumn width='100' dataField='Result' dataFormat={this.result.bind(this)} dataSort={ true }> {this.sort()} </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Error' dataFormat={this.errorcheck.bind(this)}> Error </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Errormessage' dataFormat={this.errorMessagecheck.bind(this)}> Error Message </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Env' hidden> Environment </TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='Starttime'> Start Time </TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='Endtime'> End Time </TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='Created_on' hidden> Created On </TableHeaderColumn>
                        <TableHeaderColumn width='150' dataField='Comments' dataFormat={this.comments.bind(this)}> Comments </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            );
        }
}
export default connect (state => {
    let tests = state.ShadowTower
    return {
        tests: Immutable.Map.isMap(tests) ? tests.toJS() : tests
    }
})(TestCase)