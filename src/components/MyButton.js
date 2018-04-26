import React, {Component} from 'react'
import PropTypes from 'prop-types';
import '../css/elements/button.css'

/*  Working example:
     <MyButton onClick={this.doAction}
         label="Submit"
         elementId = 'btn'
         theme= "blue"
         buttonType= "submit"
         className=""
         icon="glyphicon glyphicon-asterisk"
         style={{marginRight: 50}}
         />
*/
class MyButton extends React.Component{
    constructor(props){
      super(props)
      this.state={
          path: this.props.path?this.props.path+'.'+this.props.elementId:this.props.elementId
      }
    }

    handleButtonClick = (event) =>{
        this.props.onClick && this.props.onClick(this.props.elementId, event, this.state.path);
    }
    render(){
        if (!this.props.show) {
            return null;
        }
        return (
            <div className={"myButtonContainer "+(this.props.className? this.props.className:"")} style={this.props.style}>
                <button className={"btn btn-sm "+this.props.theme} onClick = {this.handleButtonClick} disabled={this.props.disabled} ref={this.props.elementId}>
                    {this.props.icon && <i className={this.props.icon}></i>}
                    {this.props.label}
                </button>
            </div>
        );
    }
}

MyButton.defaultProps = {
    theme:"",
    label:"",
    type:"MyButton",
    show: true
}


MyButton.propTypes= {
        /**
         * The type which is 'MyButton'
         */
        type:PropTypes.oneOf(['MyButton']),
        /**
         * the text to be displayed inside the button
         */
        label:PropTypes.string,
        /**
          * value which specifies whether the component should be shown or not
          */
        show: PropTypes.bool,
        /**
         * the unique elementId of the button
         */
        elementId: PropTypes.string.isRequired,
        /**
         * 'MyButton'
         */
        type: PropTypes.oneOf(['MyButton']),
        /**
         * the className, you want to give the container of button.
         */
        className: PropTypes.string,
        /**
         * this function passes the key of the clicked button to the parent along the the entire event. the function id of the form: function()(key, event)
         */
        onClick: PropTypes.func,
        /**
         * The color we want to give to the button. Example : theme="red" if we want to add a red color to the button.
         */
        theme: PropTypes.string

    }

export default MyButton;
