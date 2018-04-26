import React,{Component} from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Cell} from 'recharts'

class MySimpleBarChart extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        xAxisDataKey: "",
        yAxisDataKey: "",
        aspect_width: "",
        aspect_height: "",
    };

    render () {
        return (
            <ResponsiveContainer width='100%' aspect={this.props.aspect_width/this.props.aspect_height}>
                <BarChart data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey={this.props.xAxisDataKey} angle={-45} tick={{fontSize: 10}} textAnchor='end'/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <ReferenceLine y={0} stroke='#000'/>
                    <Bar dataKey={this.props.yAxisDataKey} fill="#388ed1" barSize ={20}>
                        {
                            this.props.data.map((entry, index) => (
                                <Cell key={this.props.yAxisDataKey} fill={ entry.delta < 0 ? "#d32f2f" : "#388ed1" }/>
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default MySimpleBarChart





