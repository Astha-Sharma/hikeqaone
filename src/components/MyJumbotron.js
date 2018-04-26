import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {setValidationResult} from './utils/';


class MyJumbotron extends Component {

    static defaultProps = {
        value: "",
        valueLabel: "",
        label:"",
        type: ""
    };

    componentDidMount() {

    }

    render() {
        return (
            <div className="jumbotron">
                <div className={this.props.type} role="button" tabindex="0">
                    <div>
                        <span className="count">{this.props.value}</span>
                        <span classname="units">{this.props.valueLabel}</span>
                    </div>
                    <div className="box-kpi">{this.props.label}</div>
                </div>
            </div>
        )
    }
}

export default MyJumbotron