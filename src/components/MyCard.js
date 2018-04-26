import React,{Component} from 'react';
import Tooltip from 'rc-tooltip';

class MyCard extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        data: "",
        unit: "",
        desc: "",
        descCss:"",
        dataCss: "",
        divCss: "",
        tooltip: []
    };

    render () {
        var toolTipArray = this.props.tooltip
        var options
        var text
        if(typeof toolTipArray != 'undefined' && toolTipArray.length > 0){
            options = toolTipArray.map((datas,key) => {
                return(
                    <li>{datas}</li>
                    );
            });
            text = <ul>{options}</ul>
        }

        if (typeof this.props.data != 'undefined') {
            return (
                <li tabIndex="0" className="boxed-column col-md-2">
                    <div className={this.props.divCss} role="button" tabIndex="0">
                            <div>
                                { this.props.tooltip.length > 0 ? <Tooltip placement="left" overlay={text} transitionName="alert-anim" arrowContent={<div className="rc-tooltip-arrow-inner"></div>}><span className={this.props.dataCss}>{this.props.data}</span></Tooltip> : <span className={this.props.dataCss}>{this.props.data}</span> }
                                <span className={this.props.unitCss}>{this.props.unit}</span>
                            </div>
                        <div className={this.props.descCss}>{this.props.desc}</div>
                    </div>
                </li>
            );
        }
    }
}

export default MyCard