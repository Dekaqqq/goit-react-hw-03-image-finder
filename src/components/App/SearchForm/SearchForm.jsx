import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
    state = {
        text: '',
    };

    handleChange = ({ target }) => {
        const { name, value } = target;

        this.setState({
            [name]: value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { text } = this.state;
        const { onSubmit } = this.props;

        onSubmit(text);

        this.setState({
            text: '',
        });
    };

    render() {
        const { text } = this.state;

        return (
            <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Search images..."
                    className={styles.searchInput}
                    value={text}
                    name="text"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
