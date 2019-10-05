import React from 'react';
import PropTypes from 'prop-types';
import styles from './PhotoCard.module.css';

const PhotoCard = ({
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    downloads,
    type,
    openModal,
}) => {
    return (
        <>
            <li className={styles.photoCard} data-img={largeImageURL}>
                <img
                    className={styles.photoCardImg}
                    src={webformatURL}
                    alt={type}
                />
                <div className={styles.stats}>
                    <p className={styles.stats}>
                        <i className="material-icons">thumb_up</i>
                        {likes}
                    </p>
                    <p className={styles.stats}>
                        <i className="material-icons">visibility</i>
                        {views}
                    </p>
                    <p className={styles.stats}>
                        <i className="material-icons">comment</i>
                        {comments}
                    </p>
                    <p className={styles.stats}>
                        <i className="material-icons">cloud_download</i>
                        {downloads}
                    </p>
                </div>
                <button
                    type="button"
                    className={styles.fullscreenButton}
                    onClick={openModal}
                >
                    <i className="material-icons">zoom_out_map</i>
                </button>
            </li>
        </>
    );
};

PhotoCard.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default PhotoCard;
