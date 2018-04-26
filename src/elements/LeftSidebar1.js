import React, {Component} from 'react'
import {connect} from 'react-redux'
import SidebarHeading from './SidebarHeading'
import Menu from './Menu'
import '../css/elements/left-sidebar-1.css'
import '../css/elements/collapsed-left-sidebar-1.css'
import Immutable from 'immutable';
import {getLeftNav} from '../actions/LeftNav.js';
import _ from 'underscore';
import LeftNavConstants from '../constants/leftNavConstants';


class LeftSidebar1 extends Component{

    componentDidMount(){

    }

    render(){
	    let {navigation} = this.props;
        return (
			<div>
				<div className="left-sidebar-placeholder" />
				<div className="left-sidebar left-sidebar-1">
					<div className="wrapper">
						<div className="content">
							<SidebarHeading />
                            {navigation.map((menu, i) =>
								<div key={i} className="section">
									<div className="section-title">{menu.title}</div>
									<ul className="list-unstyled">
                                        {menu.items.map((items, i) => <Menu key={i} items={items} />)}
									</ul>
								</div>
                            )}
						</div>
					</div>
				</div>
			</div>
        )
    }
}


export default connect(state => {

    let navigation=state.navigation;

    return {
        navigation:Immutable.Map.isMap(navigation) ? navigation.toJS() : navigation,
    }
})(LeftSidebar1);

