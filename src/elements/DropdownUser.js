import React, {Component} from 'react'
import '../css/elements/dropdown-user.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownUser extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
		this.items = [{
				"icon": "sli-envelope",
				"iconColor": "default",
				"name": "Inbox",
				"badge": true,
				"badgeText": "New",
				"badgeClass": "badge badge-pill badge-raised badge-danger badge-sm"
		}, {
				"icon": "sli-star",
				"iconColor": "default",
				"name": "Messages",
				"badge": true,
				"badgeText": "5",
				"badgeClass": "badge badge-info badge-rounded badge-sm"
		}, {
				"icon": "sli-settings",
				"iconColor": "default",
				"name": "Profile",
				"badge": false,
				"badgeText": false,
				"badgeClass": false
		}, {
			"icon": "sli-clock",
			"iconColor": "default",
			"name": "Lock screen",
				"badge": false,
				"badgeText": false,
				"badgeClass": false
		}, {
			"icon": "sli-power",
			"iconColor": "default",
			"name": "Logout",
				"badge": false,
				"badgeText": false,
				"badgeClass": false
		}]
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  render() {
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown-user">
          <DropdownToggle color="default">
          <span className="badge badge-sm badge-rounded badge-warning">1</span>
          <img src="/assets/faces/m7.png" className="rounded-circle" alt="avatar" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-right animated fadeInUp">
						<DropdownItem header className="dropdown-title">My account</DropdownItem>
            {this.items.map((item, i) =>
              <DropdownItem key={i}>
                <i className={item.icon} />
                <span className="title">{item.name}</span>
                <div className="separator" />
                {item.badge &&
                  <span className={item.badgeClass}>
                    {item.badgeText}
                  </span>}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
    )
  }
}
export default DropdownUser
