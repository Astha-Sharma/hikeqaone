import React from 'react';
import axios from "axios";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList} from 'recharts'
import { getResults, getResponseDist, getResults24Hours } from "../actions/mqtt";
import mqttConstants from "../constants/mqttConstants";

class MyTable extends React.Component
{
    constructor(props) {
        super(props);
        this .state={

        }
    }

    render()
    {
        var respDistribution = this.props.data
        var options;
        if(typeof respDistribution != 'undefined'){
            options = respDistribution.map((datas,key) => {
                return(
                    <tr>
                        <td>{datas.range}</td>
                        <td>{datas.count}</td>
                    </tr>);
            });
        }


        return(
                <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                    <div className="table-responsive">
                        <table className="table table-sm table-bordered table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Response Time Range(ms)</th>
                                <th>Count</th>
                            </tr>
                            </thead>
                            <tbody style={{overflowY: 'auto', height: '100%'}}>
                            {options}
                            </tbody>
                        </table>
                    </div>
                </ResponsiveContainer>

        )
    }
}
export default MyTable;
