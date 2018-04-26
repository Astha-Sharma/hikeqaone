import React, {Component} from 'react';
import '../css/elements/process.css';


export default class ProcessFlow extends Component {

    render() {
        let {flowData} = this.props, {flowStatus} = this.props, rowData = [];
        flowData = flowData || [];
        let itemWidth = 100 / flowData.length + "%";
        for (let i in flowData) {
            let value = flowData[i];
            let style = {
                'width' : itemWidth
            };
            let backgroundStyle = i <= flowStatus ? {background : flowData[i].bgColor} : {};
            let flowClassName = i <= flowStatus ? "label label-sm " + "req_" + i : 'label label-sm label-default';
            let checkedClassName = i <= flowStatus ? "label-ticked " + "req_" + i : 'label-ticked';
            if (value) {
                rowData.push(<li style={style} key={i}>
                        <span className={checkedClassName} style={backgroundStyle} >
                          <i className="fa fa-check-circle"></i>
                        </span>
                    <span style={backgroundStyle} className={flowClassName}>{value.title}</span>
                    <span className="details">{value.detail}</span>
                </li>);
            }
        }
        return (<ol className="timeline">{rowData}</ol>);
    }
}
