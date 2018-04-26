import React from 'react'
import {connect} from 'react-redux'
import {setConfig} from '../actions/config'
import Dashboard from '../dashboards/Dashboard'

class DefaultSidebar1 extends React.Component {
	componentWillMount() {
			this.props.setConfig('layout', 'default-sidebar-1')
	}
	render() {
		return (
			<Dashboard />
		)
	}	
}

const mapStateToProps = (state, ownProps) => {
  return {
	}
}
const mapDispatchToProps = dispatch => {
  return {
    setConfig: (key, value) => dispatch(setConfig(key, value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultSidebar1)
