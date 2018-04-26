import React, {Component, PropTypes} from 'react';
import styles from '../css/elements/navbar.css';

export default class CreateBoxNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav : props.nav
    };
  }

  static propTypes = {
    nav: PropTypes.array.isRequired,
    onUpdateNav: PropTypes.func.isRequired
	}

  componentWillReceiveProps(newProps) {
    this.setState({nav: newProps.nav});
  }

  handleNavClick = (item, e) => {
    e.stopPropagation();
    e.preventDefault();
    let index = this.state.nav.findIndex((element) => {
      if (element.text === item.text) {
        return true;
      }
      return false;
    });

    if (index !== -1) {
      let nav = this.state.nav;
      nav = nav.map((it, itemIndex) => {
        if (itemIndex === index) {
          it.active = true;
        } else {
          it.active = false;
        }
        return it;
      });
      this.setState({nav});
      this.props.onUpdateNav(nav[index]);
    }
  }

  render() {
    return (<ul className="nav nav-tabs">{this.state.nav.map(item => (<li className={(item.active) ? "active" : ""} key={item.text} style={{minWidth: '100px', textAlign: 'center'}}>
              <a href={"#" + item.text} data-toggle="tab" aria-expanded="false" onClick={this.handleNavClick.bind(this, item)}>{item.text}</a>
            </li>))}</ul>);
  }
}
