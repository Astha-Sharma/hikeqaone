import React,{Component} from 'react';
import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts'

const COLORS = [
    '#B2DFEE',
    '#00688B',
    '#009ACD',
    '#0099CC',
    '#00B2EE',
    '#00BFFF',
    '#BFEFFF',
    '#33A1C9',
    '#507786',
    '#87CEEB',
    '#7EB6FF',
    '#0BB5FF',
    '#3299CC',
    '#6996AD'
];
const RADIAN = Math.PI / 180;

class MySimplePieChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RADIAN: {},
            renderCustomizedLabel: {},
            activeIndex: 0,
        };
        this.onPieEnter = this.onPieEnter.bind(this);
    }
    static defaultProps = {
        data: [{}]
    }

    getInitialState() {
        return {
            activeIndex: 0,
        };
    }

    onPieEnter(data1, index) {
        this.setState({
            activeIndex: index,
        });
    }

    render() {
        const renderActiveShape = (props) => {
            const RADIAN = Math.PI / 180;
            const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
                fill, payload, percent, value } = props;
            const sin = Math.sin(-RADIAN * midAngle);
            const cos = Math.cos(-RADIAN * midAngle);
            const sx = cx + (outerRadius + 10) * cos;
            const sy = cy + (outerRadius + 10) * sin;
            const mx = cx + (outerRadius + 30) * cos;
            const my = cy + (outerRadius + 30) * sin;
            const ex = mx + (cos >= 0 ? 1 : -1) * 22;
            const ey = my;
            const textAnchor = cos >= 0 ? 'start' : 'end';

            return (
                <g>
                    <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                    />
                    <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 6}
                        outerRadius={outerRadius + 10}
                        fill="#33A1C9"
                    />
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} : ${value}`}</text>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                        {`(${(percent * 100).toFixed(2)}%)`}
                    </text>
                </g>
            );
        };

        let code = null
        let newArr = this.props.data.filter(val => {
            return val.name != "TOTAL ISSUES";
        });

        if(this.props.data != undefined){
            let totalIssues;
            this.props.data.map(arr => {
                if(arr.name == "TOTAL ISSUES"){
                    totalIssues = arr.value
                }
            })
            code = (
                    <div>
                        <PieChart width={ this.props.w } height={ this.props.h }>
                            <Pie
                                dataKey="value"
                                activeIndex={this.state.activeIndex}
                                activeShape={renderActiveShape}
                                data={newArr}
                                cx={this.props.cx}
                                cy={this.props.cy}
                                innerRadius={80}
                                outerRadius={100}
                                fill="#388ed1"
                                onMouseEnter={this.onPieEnter}
                            >
                            {
                                this.props.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                            }
                            </Pie>
                        </PieChart>
                        { this.props.displayTotalIssue === "true" ? <h6 style={{'text-align': "center"}}>Total Issues : {totalIssues}</h6> : <h6></h6> }
                    </div>
            )
        }else{
            code = (
                <div></div>
            )
        }
        return (
            <div>
            {code}
            </div>
        );

    }
}

export default MySimplePieChart