import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import history from './history'
import {setConfig} from './actions/config'
//global css
import './css/bootstrap/bootstrap.css'
import './css/main.css'

//structural elements
import LeftSidebar1 from './elements/LeftSidebar1'
import Navbar1 from './elements/Navbar1'
import Jumbotron from './elements/Jumbotron1'

import Routes from './Routes'

class App extends Component {



	render() {
		let {layout, background, navbar, logo, leftSidebar, topNavigation, collapsed} = this.props.config
		let isEmptyView = layout === 'empty-view-1' ? true : false
		return (
			<ConnectedRouter history={history}>
				<div
					data-layout={layout}
					data-background={background}
					data-navbar={navbar}
					data-logo={logo}
					data-left-sidebar={leftSidebar}
					data-top-navigation={topNavigation}
					data-collapsed={collapsed}
				>
					<Navbar1 />
					<div className={isEmptyView ? "" : "container-fluid"}>
						<div className={isEmptyView ? "" : "row"}>
							<LeftSidebar1 />
							<div className="col main">
								<Routes />
							</div>
						</div>
					</div>
				</div>
			</ConnectedRouter>
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
export default connect(mapStateToProps, mapDispatchToProps)(App)
