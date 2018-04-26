import React,{Component} from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line} from 'recharts'

class MultipleTimeSeriesLineChart extends Component{

    constructor(props) {
        super(props);
        this.state = {
            format : 'HH:mm:ss'
        };
    }

    static defaultProps = {
        type: "",
        xAxisDataKey: "",
        stroke: [],
        yAxisDataKey: [],
        aspect_width: "",
        aspect_height: "",
    };

    render() {
        return(
            <ResponsiveContainer width='100%' aspect={this.props.aspect_width/this.props.aspect_height}>
                <LineChart data={this.props.data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.props.xAxisDataKey} padding={{left: 30, right: 30}}
                           tickFormatter = {this.props.func}
                    />
                    <Tooltip/>
                    <Legend verticalAlign="bottom" height={36}/>
                    <YAxis domain={['datamin','datamax']} allowDecimals={false} tickCount={10}/>
                    {this.props.yAxisDataKey.map(i =>
                        <Line type={i.type} strokeWidth={1} dataKey={i.latency} stroke={i.stroke} />
                    )}
                </LineChart>
            </ResponsiveContainer>
        )
    }
}
export default MultipleTimeSeriesLineChart





