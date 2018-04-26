import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../css/elements/dropdown-flags.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class DropdownFlags extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
		this.flags = [
			{
				"code": "br",
				"name": "Brasil",
			},
			{
				"code": "us",
				"name": "USA",
			},
			{
				"code": "es",
				"name": "España",
			},
			{
				"code": "ru",
				"name": "Россия",
			},
			{
				"code": "cn",
				"name": "China",
			},
			{
				"code": "in",
				"name": "India",
			},
			{
				"code": "ca",
				"name": "Canada",
			},
			{
				"code": "au",
				"name": "Australia",
			},
			{
				"code": "jp",
				"name": "Japan",
			},
			{
				"code": "kr",
				"name": "Korea",
			}
		]
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  render() {
    return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown-flags">
        <DropdownToggle color="default">
          <span className="flag flag-icon-background flag-icon flag-icon-gb" />
        </DropdownToggle>
				<DropdownMenu className="dropdown-menu-right animated fadeInUp">
          <DropdownItem header className="dropdown-title">Countries</DropdownItem>
					<div className="dropdown-inner">
					{this.flags.map((flag, i) =>
          <div key={i} className="dropdown-item">
            <Link to="/">
              <span className={`flag flag-icon-background flag-icon flag-icon-${flag.code}`} />
              <span className="country-name">{flag.name}</span>
            </Link>
          </div>
					)}
					</div>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
export default DropdownFlags
