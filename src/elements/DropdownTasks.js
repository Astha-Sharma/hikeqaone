import React, {Component} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {random} from '../functions'
import '../css/elements/dropdown-tasks.css'

const DropdownTask = ({title, value, color}) => {
  let style = {width: value + '%'}
  return (
    <div className="dropdown-item">
      <p>
        <span className="title">
          {title}
        </span>
        <span className="value">
          {value}{'%'}
        </span>
      </p>
      <div className="progress progress-sm">
        <div
          className={`progress-bar bg-${color}`}
          role="progressbar"
          style={style}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  )
}

class DropdownTasks extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
		this.tasksForToday = [
			{
				title: 'Mobile app development',
				color: 'secondary',
				value: random(50, 90)
			},
			{
				title: 'Deploy github project',
				color: 'info',
				value: random(50, 90)
			}
		]
		this.tasksForTomorrow = [
			{
				title: 'Customer development',
				color: 'success',
				value: random(50, 90)
			},
			{
				title: 'Database backup',
				color: 'warning',
				value: random(50, 90)
			},
			{
				title: 'Release beta version',
				color: 'danger',
				value: random(50, 90)
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
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="dropdown-tasks">
        <DropdownToggle color="default">
          <i className="sli-feed" />
        </DropdownToggle>
				<DropdownMenu className="animated fadeInUp"> 
					<div className="dropdown-inner">
          <DropdownItem header className="dropdown-title">7 pending tasks</DropdownItem>
          <h6 className="dropdown-header">Today</h6>
          {this.tasksForToday.map((task, i) =>
            <DropdownTask key={i} {...task} />
          )}
          <h6 className="dropdown-header">Tomorrow</h6>
          {this.tasksForTomorrow.map((task, i) =>
            <DropdownTask key={i} {...task} />
          )}
					</div>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
export default DropdownTasks
