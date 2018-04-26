import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../css/elements/dropdown-grid.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class DropdownGrid extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
		this.gridItems = [
			{icon: 'sli-home', color: 'success', title: 'Home'},
			{icon: 'sli-user', color: 'danger', title: 'My account'},
			{icon: 'sli-bubbles', color: 'warning', title: 'Comments'},
			{icon: 'sli-wrench', color: 'secondary', title: 'Settings'},
			{icon: 'sli-social-twitter', color: 'twitter', title: 'Twitter'},
			{icon: 'sli-social-facebook', color: 'facebook', title: 'Facebook'},
			{icon: 'sli-social-instagram', color: 'instagram', title: 'Instagram'},
			{icon: 'sli-social-pinterest', color: 'pinterest', title: 'Pinterest'},
			{icon: 'sli-social-google', color: 'google-plus', title: 'Google'}
		]
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown-grid">
				<DropdownToggle color="default">
          <i className="sli-grid" />
        </DropdownToggle>
				<DropdownMenu className="animated fadeInUp">
					<div className="dropdown-inner">
          <DropdownItem header className="dropdown-title">Applications</DropdownItem>
					{this.gridItems.map((item, i) =>
						<Link key={i} to="/" className="grid-item">
							<i className={`${item.icon} color-${item.color}`} />
							<div className="title">{item.title}</div>
						</Link>
					)}
					</div>
        </DropdownMenu>
      </Dropdown>
		)
  }
}

export default DropdownGrid
