import React from 'react';
import Table from './DefaultTable'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Tooltip from 'rc-tooltip';

class MyCrashMonitorTable extends React.Component {

    constructor() {
        super()
        this.onSearch = this.onSearch.bind(this)
        this.onChangeItemsPerPage = this.onChangeItemsPerPage.bind(this)
        this.state = {
            search: '',
            itemsPerPage: 10
        }

        this.columns = [
            'title',
            'subtitle',
            'area',
            'issueType',
            'impactLevel',
            'occurances',
            'usersAffected',
            'infocusRatio',
            'jiraId',
            'status',
            'fixVersion',
            'assignee',
            'stackTrace',
            'firstBuild',
            'lastBuild'
        ]

        this.columnNames = [
            'Title',
            'Sub Title',
            'Area',
            'Issue Type',
            'Impact Level',
            'Occurances',
            'Users Affected',
            'Infocus Ratio',
            'Jira Id',
            'Status',
            'Fix Version',
            'Assignee',
            'Stack Trace',
            'First Build',
            'Last Build'
        ]
    }

    onSearch(e) {
        e.preventDefault()
        this.setState({
            search: e.target.value
        })
        return false
    }

    onChangeItemsPerPage(e) {
        e.preventDefault()
        this.setState({
            itemsPerPage: e.target.value
        })
        return false
    }

    customTitle(cell, row, rowIndex, colIndex) {
        return `${row.name} for ${cell}`;
    }

    colFormatter = (cell, row) => {
        let url = "https://hikeapp.atlassian.net/browse/" + `${row.jiraId}`
        return (
            <a style={{ color: '#0f8fd8' }} target="_blank" href={url}>{cell}</a>
        )
    }

    addBadge = (cell, row) => {
        if (`${cell}` === 'FATAL') {
            return (
                <span className="badge badge-danger badge-sm">{cell}</span>
            )
        } else {
            return (
                <span className="badge badge-info badge-sm">{cell}</span>
            )
        }
    }
    
    render() {
        return (
        <BootstrapTable data={ this.props.data } striped hover condensed search>
            <TableHeaderColumn headerAlign='center' width='250' columnTitle={ this.customTitle } dataField='title' isKey>{this.columnNames[0]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' width='350' columnTitle={ true } dataField='subtitle'>{this.columnNames[1]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' width='200' columnTitle={ true } dataField='area'>{this.columnNames[2]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='issueType' dataFormat={ this.addBadge }>{this.columnNames[3]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='impactLevel' dataSort={ true }>{this.columnNames[4]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='occurances' dataSort={ true }>{this.columnNames[5]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='usersAffected' dataSort={ true }>{this.columnNames[6]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='infocusRatio' dataSort={ true }>{this.columnNames[7]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='jiraId' dataFormat={ this.colFormatter }>{this.columnNames[8]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='status'>{this.columnNames[9]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='200' columnTitle={ true } dataField='fixVersion'>{this.columnNames[10]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='assignee'>{this.columnNames[11]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' width='350' columnTitle={ this.customTitle } dataField='stackTrace'>{this.columnNames[12]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='250' columnTitle={ true } dataField='firstBuild'>{this.columnNames[13]}</TableHeaderColumn>
            <TableHeaderColumn headerAlign='center' dataAlign='center' width='250' columnTitle={ true } dataField='lastBuild'>{this.columnNames[14]}</TableHeaderColumn>
        </BootstrapTable>
            // <Table
            //     items={this.props.data}
            //     columns={this.columns}
            //     columnNames={this.columnNames}
            //     itemsPerPage={this.state.itemsPerPage}
            //     search={this.state.search}
            //     onSearch={this.onSearch}
            //     onChangeItemsPerPage={this.onChangeItemsPerPage}
            //     width={1000}
            // />
        )
    }
}
export default MyCrashMonitorTable
