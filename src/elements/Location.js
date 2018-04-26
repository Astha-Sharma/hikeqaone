import React from 'react'
import {connect} from 'react-redux'
import {setConfig} from '../actions/config'
import { withRouter } from 'react-router'

class Location extends React.Component {

	constructor() {
		super()
		this.emptyViewRoutes = [
			'/pages/error-page',
			'/pages/contact-us',
			'/pages/create-account',
			'/pages/login',
			'/pages/reset-password',
			'/pages/subscribe',
			'/pages/under-maintenance',
			'/pages/unlock-account'
		]
	}

	componentWillMount() {
		let url = this.props.location.pathname
		let layout = this.props.config.layout
		if(this.emptyViewRoutes.includes(url)) {
			this.props.setConfig('layout', 'empty-view-1')
		} else {
			this.props.setConfig('layout', 'default-sidebar-1')
		}
	}

	componentDidUpdate() {
		let url = this.props.location.pathname
		let layout = this.props.config.layout
		if(this.emptyViewRoutes.includes(url)) {
			this.props.setConfig('layout', 'empty-view-1')
		} else {
			this.props.setConfig('layout', 'default-sidebar-1')
		}
	}

  render() {
    return (
      <div />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Location))
