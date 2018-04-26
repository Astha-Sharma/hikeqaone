import React from 'react'
import {connect} from 'react-redux'
import TopNavigationDropdown from './TopNavigationDropdown'
import '../css/elements/top-navigation-1.css'

const TopNavigation1 = ({config, navigation}) => {
	if(config.layout !== 'top-navigation-1') {
		return (
			<div />
		)
	}
	return (
		<nav className="top-navigation top-navigation-1">
			<ul className="nav nav-inline">
				{navigation.map((menu, i) => 
					<TopNavigationDropdown key={i} title={menu.title} items={menu.items} />
				)}
			</ul>
		</nav>
	)
}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.config,
		navigation: state.navigation[0].items
  }
}
export default connect(mapStateToProps)(TopNavigation1)
