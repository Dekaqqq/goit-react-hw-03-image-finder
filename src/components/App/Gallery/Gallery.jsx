import React from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.css';
import PhotoCard from './PhotoCard/PhotoCard';
import LoadButton from './LoadButton/LoadButton';

const Gallery = ({ gallery, loadMore, listRef, openModal }) => (
    <>
        <ul className={styles.gallery} ref={listRef}>
            {gallery.map(el => (
                <PhotoCard {...el} key={el.id} openModal={openModal} />
            ))}
        </ul>
        <LoadButton loadMore={loadMore} />
    </>
);

Gallery.defaultProps = {
    gallery: [],
};

Gallery.propTypes = {
    gallery: PropTypes.arrayOf(PropTypes.object),
    loadMore: PropTypes.func.isRequired,
    listRef: PropTypes.shape({
        current: PropTypes.object,
    }).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default Gallery;
