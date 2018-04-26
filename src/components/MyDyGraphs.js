/**
 * @author manu.chadha
 */

import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css'


class MyDyGraph extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Dygraph(this.refs.chart, this.props.data, this.props.options);
    }

    render() {
        return <div ref="chart"></div>;
    }
}
export default MyDyGraph;