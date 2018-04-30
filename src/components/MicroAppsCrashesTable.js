import React from 'react';
import Table from './DefaultTable'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Tooltip from 'rc-tooltip';

class MicroAppsCrashesTable extends React.Component {

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
            'impactLevel',
            'occurances',
            'usersAffected',
            'externalId',
            'jiraId',
            'status',
            'stackTrace',
            'firstBuild',
            'lastBuild'
        ]

        this.columnNames = [
            'Title',
            'Sub Title',
            'Impact Level',
            'Occurances',
            'Users Affected',
            'Fabrik Link',
            'Jira Id',
            'Status',
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

    fabricLink = (cell, row) => {
        let url = "https://www.fabric.io/hike-android/android/apps/com.bsb.hike/issues/" + `${row.jiraId}`
        return (
            <a style={{ color: '#0f8fd8' }} target="_blank" href={url}>{"Click Here"}</a>
        )
    }

    render() {
        return (
            <BootstrapTable data={ this.props.data } striped hover condensed search>
                <TableHeaderColumn headerAlign='center' width='250' columnTitle={ this.customTitle } dataField='title' isKey>{this.columnNames[0]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' width='350' columnTitle={ true } dataField='subtitle'>{this.columnNames[1]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='impactLevel' dataSort={ true }>{this.columnNames[2]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='occurances' dataSort={ true }>{this.columnNames[3]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='usersAffected' dataSort={ true }>{this.columnNames[4]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='150' dataField='externalId' dataFormat={ this.fabricLink }>{this.columnNames[5]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='jiraId' dataFormat={ this.colFormatter }>{this.columnNames[6]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='100' dataField='status'>{this.columnNames[7]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' width='350' columnTitle={ this.customTitle } dataField='stackTrace'>{this.columnNames[8]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='250' columnTitle={ true } dataField='firstBuild'>{this.columnNames[9]}</TableHeaderColumn>
                <TableHeaderColumn headerAlign='center' dataAlign='center' width='250' columnTitle={ true } dataField='lastBuild'>{this.columnNames[10]}</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}
export default MicroAppsCrashesTable
