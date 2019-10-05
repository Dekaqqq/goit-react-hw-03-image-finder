import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
    overlayRef = createRef();

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = e => {
        if (e.code !== 'Escape') return;

        this.props.onClose();
    };

    handleOverlayClick = e => {
        const { current } = this.overlayRef;

        if (current && e.target !== current) return;

        this.props.onClose();
    };

    render() {
        const { image } = this.props;

        return (
            <div
                className={styles.overlay}
                ref={this.overlayRef}
                onClick={this.handleOverlayClick}
            >
                <div className={styles.modal}>
                    <img src={image} alt="" className={styles.image} />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
};

export default Modal;
