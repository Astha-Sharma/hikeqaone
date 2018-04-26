import React,{Component} from 'react';


class MyStaticResult extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        name: "",
        value: "",
        icon:"",
    };

    render () {
        return (
            <li className="config-row row">
                <div className="config-column col-xs-4">
                    <i className={this.props.icon} style={this.props.style} aria-hidden="true"></i>
                    <span className={'config-key '+this.props.headerStyle} title={this.props.name}>{this.props.name}</span>
                </div>
                <div className={'config-value col-xs-8 '+this.props.textStyle}>{this.props.data}</div>
            </li>
        );
    }
}

export default MyStaticResult