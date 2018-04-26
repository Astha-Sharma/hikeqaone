import React,{Component} from 'react';
import {connect} from "react-redux";
import Iframe from 'react-iframe'
import {ReactDOM} from 'react-dom'
import {setConfig} from '../../actions/config'

class Stark extends Component
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
                    url="http://got.hike.in:3000/dashboard/db/stark?orgId=1&var-appVersion=5.9.0.11Apr2018.2226&var-appVersion=5.8.0.11Apr2018.2348&var-description=Explore&from=1523289465252&to=1523473775112"
                    width="98%"
                    height={this.state.iFrameHeight}
                    allowFullScreen
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
export default connect(mapStateToProps, mapDispatchToProps)(Stark)
