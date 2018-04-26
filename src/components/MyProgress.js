import React,{Component} from 'react';
import PropTypes from 'prop-types';
import '../css/elements/progress.css'

class MyProgress extends Component {
    static propTypes = {
        // An optional string prop named "show". Helps in easily wiring isLoading flag. By default it is true.
        show: PropTypes.bool,
        // Type shows the text next to loading icon
        type: PropTypes.oneOf(['loading', 'please-wait']),
        //Text to be shown before loading icon.
        text: PropTypes.string,
        //Boolean flag to make the body translucent
        block: PropTypes.bool
    };

    static defaultProps = {
        show: true,
        type: '',
        text: '',
        block:false
    };

    render() {
        if (this.props.show !== false) {
            return (
                <div className="progress-container">
                    <div className={this.props.block ? "trans-block":null}/>
                    <div className={"progress " + this.props.className}>
                        {this.props.block && <div></div>}
                        <div className={"ajax-loader "+this.props.type}>{this.props.text}</div>
                        {this.props.children}
                    </div>
                </div>
            )
        }
        return null
    }
}

export default MyProgress;
