import React,{Component} from 'react';
import {connect} from "react-redux";
import Iframe from 'react-iframe'
import {ReactDOM} from 'react-dom'
import {setConfig} from '../../actions/config'

class Battery extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '800px'
        }
    }

    componentWillMount() {
        //this.props.setConfig('collapsed', true)
    }

    render() {
        return(
            <Iframe style={{maxWidth:640, width:'80%', height:this.state.iFrameHeight, overflow:'visible'}}
                    ref="iframe"
                    url="http://got.hike.in:9999/"
                    width="80%"
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
export default connect(mapStateToProps, mapDispatchToProps)(Battery)
