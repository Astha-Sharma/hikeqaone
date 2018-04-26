import React,{Component} from 'react';
import {AreaChart, Area,Brush, ReferenceLine,CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, LineChart, Line} from 'recharts'
let colors = ["#9384f5", "#f58a68", "#32f5b1"]

class MqttGraphs extends Component{

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
            <ResponsiveContainer width='100%' aspect={this.props.aspect_width/this.props.aspect_height}>
                <LineChart data={this.props.data}>
                    <ReferenceLine y={185} label="Max" stroke="red"/>
                    <CartesianGrid strokeDasharray="3 3" fill={'white'}/>
                    <XAxis dataKey={this.props.xAxisDataKey} padding={{left: 30, right: 30}}
                           tickFormatter = {this.props.func}
                    />
                    <YAxis domain={['datamin','datamax']} allowDecimals={false} tickCount={10}/>
                    <Tooltip/>
                    <Legend onClick={this.handleMouseEnter.bind(this)}/>
                    {this.props.yAxisDataKey.map(i =>
                        <Line type={i.type} strokeWidth={2} dataKey={i.data} strokeOpacity={opacity[i.data]} stroke={i.stroke} fillOpacity={opacity[i.data]} fill={"url(#".concat(i.data, ")")} activeDot={{r: 8}}/>
                    )}
                </LineChart>
            </ResponsiveContainer>
        )
    }
}
export default MqttGraphs





