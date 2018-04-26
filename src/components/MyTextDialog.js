import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactJson from 'react-json-view';

class JsonDialog extends Component {

    static defaultProps = {
        isLoading: PropTypes.bool,
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
            <div onClick={this.handleClick}>{this.props.label}
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>{this.props.contentKey}</h1>
                            <div>
                             <p>{this.props.contentValue}</p>
                            </div>
                        </ModalDialog>
                    </ModalContainer>
                }
            </div>
        )
    }
}

export default JsonDialog