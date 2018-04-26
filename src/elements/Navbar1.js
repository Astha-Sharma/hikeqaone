import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setConfig} from '../actions/config'
import Logo from './Logo'
import '../css/elements/navbar-1.css'
class Navbar1 extends Component {
  constructor() {
    super()
    this.toggleLayout = this.toggleLayout.bind(this)
    this.toggleRightSidebar = this.toggleRightSidebar.bind(this)
  }
  toggleLayout() {
    this.props.setConfig('collapsed', !this.props.config.collapsed)
  }
  toggleRightSidebar() {
    this.props.setConfig('rightSidebar', !this.props.config.rightSidebar)
  }
  render() {
	if(this.props.config.layout === 'empty-view-1') {
		return (
			<div />
		)
	}
    return (
      <nav className="navbar navbar-1 d-flex justify-content-around align-items-center flex-nowrap">
        <Logo />
        <ul className="nav nav-inline hidden-sm-down">
          <li className="nav-item">
            <a className="nav-link toggle-layout" onClick={this.toggleLayout}>
              <i className="sli-menu" />
            </a>
          </li>
        </ul>
        <ul className="nav nav-inline hidden-md-down">
        </ul>
        <div className="separator" />
        <ul className="nav nav-inline hidden-md-down">

        </ul>
      </nav>
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
export default connect(mapStateToProps, mapDispatchToProps)(Navbar1)
