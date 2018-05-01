import React,{Component} from 'react';
import PropTypes from 'prop-types';
import MyForm from "../components/MyForm"
import {ModalContainer, ModalDialog} from 'react-modal-dialog';


class MyFormDialog extends Component {

    static defaultProps = {
        isLoading: PropTypes.bool,
        isCloseModal: PropTypes.bool,
        label:PropTypes.string,
        contentKey:PropTypes.string,
        contentValue:PropTypes.string,
        onupdate:PropTypes.func,
    };

    state = {
        isShowingModal: false,
    }

    handleClick = () => this.setState({isShowingModal: true})
    handleClose = () => this.setState({isShowingModal: false})


    render() {
        return (
            <div onClick={this.handleClick}>{this.props.label} <i className={this.props.icon}></i>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose} >
                        <ModalDialog onClose={this.handleClose} style={{ 'width' :'700px', 'top' : '100px' }} >
                            <h3>{this.props.label}</h3>
                            <div>
                                <MyForm title="Create Jira" {...this.props.formConfig} />
                                {this.props.isCloseModal ?
                                    <div>
                                        {this.handleClose()}
                                    </div> : null
                                }
                            </div>
                        </ModalDialog>
                    </ModalContainer>
                }
            </div>
        )
    }
}

export default MyFormDialog