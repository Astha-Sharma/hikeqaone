import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../css/elements/left-sidebar-2.css'
import '../css/elements/collapsed-left-sidebar-2.css'

const LeftSidebar2 = ({navigation, config}) => {
	if(config.layout === 'collapsed-sidebar-1') {
		return (
		<div className="left-sidebar left-sidebar-2">
				{navigation.map((menu, i) =>
					<div key={i} className="section">
						<div className="section-title">{menu.title}</div>
						<ul className="list-unstyled">
							{menu.items.map((items, j) => 
							<li key={j}>
								<a className={'btn btn-default btn-flat btn-sidebar btn-sidebar-1 has-children'}>
									<i className={items.icon} />
									<span className="title">{items.title}</span>
								</a>
									<ul className="list-unstyled">
										{items.items.map((item, k) =>
											<li key={k}>
												<Link
													to={item.url}
													className="btn btn-default btn-flat btn-sidebar btn-sidebar-2">
													<i className={item.icon} />
													<span className="title">{item.title}</span>
												</Link>
											</li>
										)}
									</ul>
							</li>
							)}
						</ul>
					</div>
				)}
		</div>
		)
	} else {
		return (
			<div />
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigation: state.navigation,
    config: state.config
  }
}
export default connect(mapStateToProps)(LeftSidebar2)

