import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';


class MyHighCharts extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        plotoption: "",
        type: "",
        valueLabel: "spline",
        data:"",
        xaxisType:"datetime",
        xaxisTitle:"",
        yaxisTitle:"",
        title:"",
        subtitle:"",
    };


    render() {
        return(
            <div>
                    <HighchartsChart plotOptions={this.props.plotoption}>
                        <Chart type={this.props.type}/>

                        <Title>{this.props.title}</Title>

                        <Subtitle>{this.props.subtitle}</Subtitle>

                        <Legend layout="vertical" align="right" verticalAlign="middle" />

                        <XAxis type={this.props.xaxisType}>
                            <XAxis.Title>{this.props.xaxisTitle}</XAxis.Title>
                        </XAxis>

                        <YAxis id="number">
                            <YAxis.Title>{this.props.yaxisTitle}</YAxis.Title>
                                {this.props.data}
                        </YAxis>
                    </HighchartsChart>
            </div>
        )
    }
}



export default withHighcharts(MyHighCharts, Highcharts);





