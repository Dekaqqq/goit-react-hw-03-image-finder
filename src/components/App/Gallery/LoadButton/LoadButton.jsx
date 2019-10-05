import React from 'react';
import styles from './LoadButton.module.css';

const LoadButton = ({ loadMore }) => (
    <button type="button" className={styles.button} onClick={loadMore}>
        Load more
    </button>
);

export default LoadButton;
