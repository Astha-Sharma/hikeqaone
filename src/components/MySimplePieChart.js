import React,{Component} from 'react';
import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts'

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
                        outerRadius={outerRadius + 13}
                        fill="#ff6d00"
                    />
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`RC ${value}`}</text>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                        {`(Rate ${(percent * 100).toFixed(2)}%)`}
                    </text>
                </g>
            );
        };

        let code = null
        if(this.props.data != undefined){
            code = (
                <PieChart width={600} height={400}>
                    <Pie
                        dataKey="value"
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={this.props.data}
                        cx={300}
                        cy={200}
                        innerRadius={100}
                        outerRadius={150}
                        fill="#388ed1"
                        onMouseEnter={this.onPieEnter}
                    />
                </PieChart>
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