import React,{Component} from 'react';
import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#ffda22', '#ff4df4', '#f57797', '#16c49c', '#2AF599', '#FFDA22', '#FF4DF4', '#FFD034', '#16C49C', '#EBAFFF', '#F57797', '#DDFF23'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


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
            const sx = cx + (outerRadius + 5) * cos;
            const sy = cy + (outerRadius + 5) * sin;
            const mx = cx + (outerRadius + 5) * cos;
            const my = cy + (outerRadius + 10) * sin;
            const ex = mx + (cos >= 0 ? 1 : -1) * 10;
            const ey = my;
            const textAnchor = cos >= 0 ? 'start' : 'end';

            return (
                <g>
                    <text x={cx} y={cy} dy={5} textAnchor="middle" fill={fill}>{payload.name}</text>
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
                        innerRadius={outerRadius + 2}
                        outerRadius={outerRadius + 5}
                        fill="#ff6d00"
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
                <ResponsiveContainer aspect={4.0/2.0}>
                    <div>
                        <PieChart width={500} height={350}>
                            <Pie
                                dataKey="value"
                                activeIndex={this.state.activeIndex}
                                activeShape={renderActiveShape}
                                data={newArr}
                                cx={250}
                                cy={200}
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
                </ResponsiveContainer>
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