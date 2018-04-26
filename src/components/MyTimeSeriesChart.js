import React,{Component} from 'react';
import {AreaChart, Area,Brush, CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, LineChart, Line} from 'recharts'
import moment from 'moment'

class MyTimeSeriesChart extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        type: "",
        xAxisDataKey: "",
        yAxisDataKey: "",
        stroke: "",

    };


    render() {
        return(
                <ResponsiveContainer width='100%' aspect={4.0/2.0}>
                    <AreaChart data={this.props.data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={this.props.xAxisDataKey} padding={{left: 30, right: 30}}
                               tickFormatter = {formatXAxis}
                               />
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Area type='monotone' strokeWidth={1} dataKey={this.props.yAxisDataKey} stroke={this.props.stroke} fill={this.props.fill} activeDot={{r: 8}}/>
                    </AreaChart>
                </ResponsiveContainer>
        )
    }
}


function formatXAxis(tickItem) {
    return moment(tickItem).format('HH:mm:ss')
}
export default MyTimeSeriesChart





