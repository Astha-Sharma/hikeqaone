import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {startCase} from 'lodash'
import '../css/elements/jumbotron-1.css'

const Jumbotron1 = ({location, config}) => {
	let pathname = location.pathname
  let parts =
    pathname && pathname.split('/').filter(str => str.trim().length > 0)
  let controller = parts && parts[0]
    ? startCase(parts[0]).replace(/Ui /g, 'UI ')
    : 'Welcome'
  let view = parts && parts[1] ? startCase(parts[1]) : ''
  let show = pathname === '/' ? false : true
  if (!show ||config.layout === 'top-navigation-1' || config.layout === 'empty-view-1' || parts[0] === 'layouts' || parts[0] === 'dashboards') {
    return <div className="hidden" />
	}
  return (
    <div className="jumbotron jumbotron-1">
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col">
            <h4>{view}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    config: state.config
  }
}
export default withRouter(connect(mapStateToProps)(Jumbotron1))
