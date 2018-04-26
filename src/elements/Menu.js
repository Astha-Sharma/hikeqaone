import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Collapse} from 'reactstrap'
class Menu extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    let items = this.props.items
    if (items.items.length === 0) {
      if(items.url.includes("//")){
          return (
              <li>
                <a href={items.url} className="btn btn-default btn-flat btn-sidebar btn-sidebar-1" target="_blank">
                  <i className={items.icon} />
                  <span className="title">{items.title}</span>
                    {items.badge &&
                    <span className={`ml-auto ${items.badge.className}`}>{items.badge.title}</span>
                    }
                </a>
              </li>
          )
      }else{
          return (
              <li>
                <Link
                    to={items.url}
                    className="btn btn-default btn-flat btn-sidebar btn-sidebar-1">
                  <i className={items.icon} />
                  <span className="title">{items.title}</span>
                    {items.badge &&
                    <span className={`ml-auto ${items.badge.className}`}>{items.badge.title}</span>
                    }
                </Link>
              </li>
          )
      }
    } else {
      return (
        <li>
          <a
            className={
              this.state.isOpen
                ? 'btn btn-default btn-flat btn-sidebar btn-sidebar-1 has-children is-open'
                : 'btn btn-default btn-flat btn-sidebar btn-sidebar-1 has-children'
            }
            onClick={this.toggle}>
            <i className={items.icon} />
            <span className="title">{items.title}</span>
						{items.badge &&
							<span className={`ml-auto ${items.badge.className}`}>{items.badge.title}</span>
						}
          </a>
          <Collapse isOpen={this.state.isOpen}>
            <ul className="list-unstyled" style={{"paddingLeft":"20px"}}>
              {items.items.map((item, k) =>
               <Menu key={k} items={item} />
                  /*<li key={k}>
                  <Link
                  to={item.url}
                  className="btn btn-default btn-flat btn-sidebar btn-sidebar-2">
                  <i className={item.icon} />
                  <span className="title">{item.title}</span>
                  </Link>
                  </li>*/
              )}
            </ul>
          </Collapse>
        </li>
      )
    }
  }
}
export default Menu
