import React,{Component} from 'react';
import {AreaChart, Area,Brush, ReferenceLine, CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, LineChart, Line} from 'recharts'

class MultipleTimeSeriesChart extends Component{

    constructor(props) {
        super(props);
        this.state = {
            opacity: {},
        }
    }

    static defaultProps = {
        type: "",
        xAxisDataKey: "",
        stroke: [],
        yAxisDataKey: [],
        aspect_width: "",
        aspect_height: "",
    };

    handleMouseEnter(o) {
        console.log("handleMouseEnter ", o)
        let { dataKey } = o;
        let { opacity } = this.state;

        if(opacity[dataKey] > 0.0){
            this.setState({opacity: { ...opacity, [dataKey]: 0.0 },});
        }else{
            this.setState({
                opacity: { ...opacity, [dataKey]: 1 }, })
        }
    }

    componentDidMount(){
        let ops = {}
        {this.props.yAxisDataKey.map(i => {
                ops[i.data] = 1;
            }
        )}
        this.setState({opacity: ops})
    }

    render() {
        const { opacity } = this.state;
        return(
            <ResponsiveContainer width="100%" aspect={this.props.aspect_width/this.props.aspect_height}>
                <AreaChart data={this.props.data}>
                    <defs>
                        {this.props.yAxisDataKey.map(i =>
                            <linearGradient id={i.data} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={i.stroke} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={i.stroke} stopOpacity={0.1}/>
                            </linearGradient>
                        )}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={this.props.xAxisDataKey} padding={{left: 10, right: 10}} tickFormatter = {this.props.func} angle={-45} tick={{fontSize: 10}} textAnchor='end'/>
                    <YAxis domain={['datamin','datamax']} allowDecimals={true} tickCount={10} unit={this.props.yaxisunit}/>
                    <Tooltip/>
                    <Legend onClick={this.handleMouseEnter.bind(this)}/>
                    {this.props.yAxisDataKey.map(i =>
                        <Area type={i.type} strokeWidth={1} dataKey={i.data} strokeOpacity={opacity[i.data]} stroke={i.stroke} fill={i.stroke} fillOpacity={0.2} activeDot={{r: 8}} unit=" %"/>
                    )}
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}
export default MultipleTimeSeriesChart





