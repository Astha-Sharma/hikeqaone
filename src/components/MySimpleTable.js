import React,{Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../css/summary-report/summary.css';

class MySimpleTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <BootstrapTable data={this.props.data} trClassName='table-row-class' tableHeaderClass='table-header-class' condensed>
                {this.props.columns.map(head=>{
                    {console.log("sasasasasasa ", head.display, "    ",  head.name)}
                    return(
                        <TableHeaderColumn  dataField={head.name} isKey={head.key} thStyle={{textAlign: 'center'}} tdStyle={{textAlign: 'center'}}>{head.display} <sub>{head.sub}</sub></TableHeaderColumn>
                    )
                })}
            </BootstrapTable>)
    }
}

export default MySimpleTable





