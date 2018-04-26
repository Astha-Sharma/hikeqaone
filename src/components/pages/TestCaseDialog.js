import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactJson from 'react-json-view';
import modalcss from "../../css/modal/modal.css"


class TestCaseDialog extends Component {

    static defaultProps = {
        isLoading: PropTypes.bool,
        label:PropTypes.string,
        contentKey1:PropTypes.string,
        contentKey2:PropTypes.string,
        contentValue:PropTypes.string,
        mainHeader:PropTypes.string,
        header1:PropTypes.string,
        header2: PropTypes.string,
        header3: PropTypes.string,
        header4: PropTypes.string,
        contentValue1: PropTypes.string,
        contentValue2: PropTypes.string,
        contentValue3: PropTypes.string,
        contentValue4: PropTypes.string,
        onupdate:PropTypes.func,
    };

    state = {
        isShowingModal: false,
    }

    handleClick = () => this.setState({isShowingModal: true})
    handleClose = () => this.setState({isShowingModal: false})


    render() {
        return (
            <div onClick={this.handleClick} >
                <a href="javascript:void(0);">
                    {this.props.label}</a>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose} >
                        <ModalDialog onClose={this.handleClose} style={{"left":"30%", "right":"5%", "top":"17%"}}>
                            <h1>{this.props.mainHeader}</h1>
                            <div>
                                <h5>{this.props.header1}</h5>
                                <p>
                                {this.props.contentValue1}
                                </p>
                                <h5>{this.props.header2}</h5>
                                <p>
                                    {this.props.contentValue2}
                                </p>
                                <h5>{this.props.header3}</h5>
                                <p>
                                    {this.props.contentValue3}
                                </p>
                                <h5>{this.props.header4}</h5>
                                <p>
                                   {this.props.contentValue4}
                                </p>
                            </div>
                        </ModalDialog>
                    </ModalContainer>
                }
            </div>
        )
    }
}

export default TestCaseDialog