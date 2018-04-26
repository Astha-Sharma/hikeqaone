import React, {Component} from 'react'
import '../css/elements/dropdown-messages.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownMessages extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
		this.notifications = [{
				"badge": "success",
				"type": "sale",
				"title": "Michael Smith upgraded to the $50 plan",
				"date": "4 minutes ago",
		}, {
				"badge": "danger",
				"type": "return",
				"title": "Lucas Johnson cancelled the $50 plan",
				"date": "34 minutes ago",
		}, {
				"badge": "warning",
				"type": "refund",
				"title": "Jane Smith is asking for a refund",
				"date": "2 hours ago",
		}, {
				"badge": "success",
				"type": "sale",
				"title": "George Lucas upgraded to the $25 plan",
				"date": "3 hours ago",
		}, {
				"badge": "primary",
				"type": "new",
				"title": "Andrew Peters is looking for a new plan",
				"date": "4 hours ago",
		}]
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  render() {
    return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown-messages">
        <DropdownToggle color="default">
          <i className="sli-bell" />
					<span className="badge badge-sm badge-rounded badge-danger">4</span>
        </DropdownToggle>
				<DropdownMenu className="animated fadeInUp"> 
					<div className="dropdown-inner">
          <DropdownItem header className="dropdown-title">5 pending notifications</DropdownItem>
					{this.notifications.map((notification, i) =>
          <div className="dropdown-item" key={i}>
            <p>
              <span className="date">{notification.date}</span>
            </p>
            <p>
              <span className={`badge badge-sm badge-outline badge-${notification.badge}`}>
                {notification.type}
              </span>
              <span className="separator" />
              <span className="title">
                {notification.title}
              </span>
            </p>
          </div>
					)}
					</div>
        </DropdownMenu>
      </Dropdown>
		)
  }
}
export default DropdownMessages

