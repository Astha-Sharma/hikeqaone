import React,{Component} from 'react';
import {connect} from "react-redux";
import Iframe from 'react-iframe'
import {ReactDOM} from 'react-dom'
import {setConfig} from '../../actions/config'

class Watchmen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '1000px'
        }
    }
    componentWillMount() {
        this.props.setConfig('collapsed', true)
    }

    render() {
    return(
            <Iframe style={{maxWidth:640, width:'98%', height:this.state.iFrameHeight, overflow:'visible'}}
                    ref="iframe"
                    url="http://13.228.217.203:3001"
                    width="98%"
                    height={this.state.iFrameHeight}
                    />
    )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setConfig: (key, value) => dispatch(setConfig(key, value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Watchmen)
