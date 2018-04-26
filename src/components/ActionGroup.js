import React from 'react';
import PropTypes from 'prop-types';
var Popover = require('react-popover'); 


/**
 * ActionGroup Component will show the list of actions in top right. By default it will show first three actions in a row followed
 * by a DropDown button which again shows a list of remaining actions. It takes the list of actions as actionList property.
 * To apply custom style to the items rendered in action list, you may use actionClass property
 * The actionList property contains a list of Objects having following attributes : id, label, icon, link
 * By default the top three actions appear alongside ellipsis button in the action bar at top right. This can be changed by setting topItems property to desired value.
 *
 * For example: var actionList = [
 { id: 1, label:'Edit', icon: 'icon-cloud-upload' },
 { id: 2, icon: 'icon-wrench'},
 { id: 3, icon: 'icon-trash'},
 { id: 4, label: 'Option 1' },
 { id: 5, label: 'Option 2' },
 { id: 6, label: 'TSR', link: '/tsr' }
 ];
 * if you want to override the class of each Item rendered in list just pass a CSS className.
 *
 * ![ActionGroup](images/ActionGroup.png)
 * Example :
 *   <Actions className='btn btn-link' actionList={this.props.listOfActions} onClick={this.handleActionClick} />
 *
 */

export class Item extends React.Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.props.onClick(this.state.id, this.state.value, event);
    }

    componentWillMount() {
        this.setState({
            id: this.props.id,
            value: this.props.label,
            isOpen: false
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            value: nextProps.label
        });
    }

    render() {
        var defaultRender = <button href={this.props.link} style={{textAlign: 'left'}} {...this.props} onClick={this.onClick} >
                                    {this.props.icon && <i className={this.props.icon}></i>}
                                    {this.props.label}
        </button>;
        var doToggle = ()=> {
            this.setState({isOpen: !this.state.isOpen})
        };
        var toRender = this.props.popup ?
            <Popover isOpen={this.state.isOpen} onOuterAction={doToggle} body={this.props.popup(this)}
                {...defaultPopoverOptions} {...this.props.popupOptions}><span style={{marginLeft: 5}}
                                               className={"target " + this.state.isOpen ? 'btn-group isOpen' : 'btn-group'}
                                               onClick={doToggle}>{defaultRender}</span></Popover> : defaultRender;
        return this.props.render ?
            <div {...this.props} className={'actionItemWrapper'}>{this.props.render(this)}</div> : toRender;
    }
}

let defaultPopoverOptions = {
    preferPlace: 'below',
    enterExitTransitionDurationMs: 1000,
    offset: 0
}

Item.defaultProps = {
    className: 'btn',
    popoverOptions: {}
};

Item.PropTypes = {
    /**
     *  The css style class of Item
     */
    className: PropTypes.string,
    /**
     *  id property sets the id of the item which is then captured when onClick handler is called
     */
    id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    /**
     *  link property sets hyperlink of Item
     */
    link: PropTypes.string,
    /**
     *  icon property sets the class of Item's Icon
     */
    icon: PropTypes.string,
    /**
     *  label will be displayed with icon in the item
     */
    label: PropTypes.string,
    /**
     *  The onnClick property takes the handler which is called when the item is clicked
     */
    onClick: PropTypes.func

};

export default class ActionGroup extends React.Component {

    constructor() {
        super();
        this.state = {show: false};
        this.toggleShow = this.toggleShow.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setShow = this.setShow.bind(this);
        this.unsetShow = this.unsetShow.bind(this);
    }

    toggleShow() {
        this.setState({
            show: !this.state.show
        });
    }

    setShow() {
        this.setState({
            show: true
        })
    }

    unsetShow() {
        this.setState({
            show: false
        })
    }

    handleClick(id, data, event) {
        var result = {};
        var statusType = null;
        result['elementId'] = id;
        result['value'] = data;
        result['statusType'] = statusType;
        result['type'] = 'ActionGroup';
        this.props.onClick(result, event);
    }

    componentWillMount() {
        var actionList = this.props.actionList || [];
        var closeIcon = {id: 'close', icon: 'fa fa-close', label: 'Close', className: 'btn-link white'};
        if (this.props.showClose) {
            if (this.props.topItems == actionList.length) closeIcon.label = '';
            actionList.push(closeIcon);
        }
        this.setState({actionList: actionList})
    }

    componentWillReceiveProps(nextProps) {
        var actionList = nextProps.actionList || [];
        var closeIcon = {id: 'close', icon: 'fa fa-close', label: 'Close', className: 'btn-link white'};
        if (nextProps.showClose) {
            if (nextProps.topItems == actionList.length) closeIcon.label = '';
            actionList.push(closeIcon);
        }
        this.setState({actionList: actionList})
    }

    render() {
        var l = this.props.topItems;
        var actionBar = [], actionDropDown = [], n = this.state.actionList.length;
        if (n == l + 1) l++;

        for (var i = 0; i < n; i++) {
            var item = this.state.actionList[i];
            var itemClass = '';
            if (i < l) {
                itemClass = item.className || 'btn btn-outline ' + (i == 0 ? 'blue' : 'white');
                if (this.props.disabled){
                    actionBar.push(<Item onClick={this.handleClick} {...item} disabled={this.props.disabled} className={itemClass} key={i}/>);
                }else{
                    actionBar.push(<Item onClick={this.handleClick} {...item} className={itemClass} key={i}/>);
                }
            }
            else {
                itemClass = item.className || 'btn btn-link white';
                if (this.props.disabled){
                    actionDropDown.push(<Item onClick={this.handleClick} {...item} disabled={this.props.disabled} className={itemClass} key={i}/>);
                }else{
                    actionDropDown.push(<Item onClick={this.handleClick} {...item} className={itemClass} key={i}/>);
                }
            }
        }

        return (
            <div className={'actions ' + this.props.className} onMouseLeave={this.unsetShow} style={this.props.style}>
                 {actionBar}
                 {
                     actionDropDown && actionDropDown.length > 0 &&
                     <div className={'btn-group open drop' + this.props.dropdownDirection} style={{marginLeft: 5}} onMouseOver={this.setShow}>
                         <a className='btn-link' href='javascript:;' onClick={this.toggleShow}
                            style={{textDecoration: 'none', color: 'grey'}}>
                             &nbsp;&nbsp;<i className='fa fa-ellipsis-v'></i>&nbsp;
                         </a>
                         <ul className='dropdown-menu pull-right'>
                             {
                                 this.state.show && actionDropDown.map((action, index) => {
                                     return <li key={index}>{action}</li>
                                 })
                             }
                         </ul>
                     </div>}
            </div>
        );
    }
};

ActionGroup.defaultProps = {
    onClick: () => {
    },
    topItems: 0,
    style: {},
    dropdownDirection: "down"
};

ActionGroup.PropTypes = {
    /**
     *  className property sets the css class of ActionGroup
     */
    className: PropTypes.string,
    /**
     *  The actionList property takes an array of actions which are pure objects
     */
    actionList: PropTypes.arrayOf(PropTypes.object),
    /**
     *  The topItems property sets the number of action items that shall be displayed on the top right of portlet
     */
    topItems: PropTypes.number,
    /**
     *  The onClick property takes the handler which is called when an item of the action list is clicked
     */
    onClick: PropTypes.func,
    /**
     *  The showClose property determines if the close button is shown on top right or not
     */
    showClose: PropTypes.bool,
    /**
     * The dropDown Direction property determines if the dropdown opens up or down
     */
    dropdownDirection: PropTypes.oneOf(['up', 'down']),
}