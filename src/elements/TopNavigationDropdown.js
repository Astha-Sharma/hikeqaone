import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';

class TopNavigationDropdown extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
		this.onMouseEnter = this.onMouseEnter.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  onMouseEnter() {
    this.setState({
      dropdownOpen: true
    })
  }
  onMouseLeave() {
    this.setState({
      dropdownOpen: false
    })
  }
  render() {
		let cols = this.props.items.length > 4 ? 2 : 1;
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle color="default" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          {this.props.title}
        </DropdownToggle>
				<DropdownMenu onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={`dropdown-menu-cols dropdown-cols-${cols}`}>
					{this.props.items.map((item, i) =>
					<Link to={item.url} key={i} className="btn btn-default dropdown-item">
						{item.title}
					</Link>
					)}
        </DropdownMenu>
      </Dropdown>
		)
  }
}

export default TopNavigationDropdown
