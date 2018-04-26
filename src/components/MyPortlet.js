import React from 'react';
import Actions from './ActionGroup.js';
import MyAlert from './MyAlert.js';
import MyProgress from './MyProgress.js';
import PropTypes from 'prop-types';

/**
 * Portlet Component provides a box having a shadow effect at the borders. if you want to override just pass a CSS className.
 * It also takes a title and a summary.js as props plus a list of actions as actionList property. The handler to the actions can be passed as onActionClick property.
 * To apply custom style to the items rendered in action list, you may use actionClass property
 * The actionList property contains a list of objects having following attributes : id, label, icon, link
 * By default the top three actions appear alongside ellipsis button in the action bar at top right. This can be changed by setting topItems property to desired value.
 *
 * ![SmartPortlet](images/SmartPortlet.png)
 *
 * #Working example:
 * ```
 * import {SmartPortlet} from 'unity-components/react/'
 *
 * var actionList = [
 *  { id: 1, label:'Edit', icon: 'icon-cloud-upload' },
 *  { id: 2, icon: 'icon-wrench'},
 *  { id: 3, icon: 'icon-trash'},
 *  { id: 4, label: 'Option 1' },
 *  { id: 5, label: 'Option 2' },
 *  { id: 6, label: 'TSR', link: '/tsr' }
 *  ];
 *
 *   <SmartPortlet title="Buttons" summary.js="tasks summary.js..." actionList={actionList} onActionClick={this.handleActionClick}>
 *     <div>Sample</div>
 *     <div>Box</div>
 *   </SmartPortlet>
 *
 * ```
 *
 */

export default class Portlet extends React.Component {

    constructor(props){
        super(props);
        this.state = { show: true , showLoading: false, showAlert: true};
        this.handleActionClick = this.handleActionClick.bind(this);
        this.onAlertClose = this.onAlertClose.bind(this);
    }

    handleActionClick(res, event){
        this.props.onActionClick(res, event);
        if(res['elementId'] == 'close'){
            this.setState({show: false});
        }
    }

    onAlertClose(){
        this.setState({showAlert: false});
        this.props.onAlertClose && this.props.onAlertClose();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.alert===this.props.alert){
            this.setState({
                showAlert: true
            });
        }
    }

    render() {
        var noBorderClass = this.props.showBox?' ':'noBorder ';
        return (
            this.state.show ?
        <div className={'portlet light '+ noBorderClass + this.props.className}>

            {(this.props.showLoading || this.state.showLoading) && <MyProgress type="please-wait" block={true}/>}

            {((this.props.title && this.props.title.length) || (this.props.actionList && this.props.actionList.length) || this.props.showClose)?
                <div className="portlet-title">
                    <div className="caption">
                        <div className="caption-subject caption-subject font-grey-haze" style={{display:'inline-block'}}>{this.props.title && this.props.title}</div>
                        <div className="caption-helper" style={{marginLeft: 5, display:'inline-block'}}>{this.props.summary && this.props.summary}</div>
                    </div>
                    <div className="customHeaderContent">{this.props.customHeaderContent()}</div>
                    {(this.props.actionList || this.props.showClose) && <Actions className='portlet-action' {...this.props} onClick={this.handleActionClick}/>}
                </div>: null
            }

            <div className="portlet-body">
                {(this.state.showAlert && this.props.alert) ? (typeof this.props.alert == 'string' ? (<MyAlert type={this.props.alertType} onClose={this.onAlertClose}>{this.props.alert}</MyAlert>) : this.props.alert) : null}
                {typeof this.props.customContent =="function" ? this.props.customContent():null}
                {this.props.children}
            </div>
        </div> : null);

    }
};

Portlet.defaultProps = {
    onActionClick: () => {},
    className: '',
    customHeaderContent:()=>{},
    showBox:true
};

Portlet.propTypes = {
    /**
     * CSS className for any types of overrides
     */
    className: PropTypes.string,
    /**
     *  title property sets the title of the portlet which is displayed in bold in top left
     */
    title: PropTypes.string,
    /**
     *  summary.js is displayed after title in the same line
     */
    summary:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    /**
     *  Alert component to be displayed in case of alert. It can either be a string or any React component
     */
    alert: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    /**
     *  alertType property sets the type of alert which again decides the colour of alert Component
     */
    alertType: PropTypes.oneOf(['alert-info','alert-success','alert-warning','alert-danger']),
    /**
     *  customContent function can be used to pass some content which will be rendered below alert and aobe children. Just short cut to quickly add content dynamically.
     */
    customContent: PropTypes.func,

    /**
     *  showLoading property when set displays the progress component on and above the portler component. The default value is false
     */
    showLoading: PropTypes.oneOf([true, false]),
    /**
     *  The actionList property takes an array of actions which are pure objects
     */
    actionList: PropTypes.arrayOf(PropTypes.object),
    /**
     *  The onActionClick property takes the handler which is called when an item of the action list is clicked
     */
    onActionClick: PropTypes.func,
    /**
     *  The onClose property takes the handler which is called when the close button of Portlet is called
     */
    onClose: PropTypes.func,
    /**
     *  handler which allows to put some custom content next to actionbar section
     */
    customHeaderContent:PropTypes.func,
    /**
     *  callback which gets invoked when the Alert box is closed. The alert and alertType props can be set to null in this callback so that ALert doesn't appear once its closed
     */
    onAlertClose:PropTypes.func
};