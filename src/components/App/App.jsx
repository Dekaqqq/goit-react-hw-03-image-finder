import React, { Component, createRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';
import SearchForm from './SearchForm/SearchForm';
import Gallery from './Gallery/Gallery';
import Modal from './Modal/Modal';

class App extends Component {
    listRef = createRef();

    state = {
        gallery: [],
        currentValue: '',
        isLoading: false,
        error: null,
        showModal: false,
        largeImgUrl: '',
    };

    page;

    handleSearchFormValue = value => {
        this.setState({ isLoading: true });
        this.setState({ currentValue: value });

        this.page = 1;

        const APIUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${this.page}&per_page=12&key=13846876-f4b9301a849f606d51ead0c00`;

        axios
            .get(APIUrl)
            .then(({ data }) =>
                this.setState({
                    gallery: data.hits,
                }),
            )
            .catch(error => {
                this.setState({ error: error.message });
                this.handleError(error.message);
            })
            .finally(() => this.setState({ isLoading: false }));
    };

    handleError = msg => {
        toast.error(msg, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    openModal = e => {
        this.setState({
            showModal: true,
            largeImgUrl: e.target.parentElement.dataset.img,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    loadMore = () => {
        const { currentValue } = this.state;

        this.page += 1;

        const APIUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${currentValue}&page=${this.page}&per_page=12&key=13846876-f4b9301a849f606d51ead0c00`;

        axios
            .get(APIUrl)
            .then(({ data }) => {
                this.setState(prev => ({
                    gallery: [...prev.gallery, ...data.hits],
                }));
                window.scrollTo({
                    top: this.listRef.current.clientHeight,
                    behavior: 'smooth',
                });
            })
            .catch(error => {
                this.setState({ error: error.message });
                this.handleError(error.message);
            })
            .finally(() => this.setState({ isLoading: false }));
    };

    render() {
        const {
            gallery,
            isLoading,
            error,
            showModal,
            largeImgUrl,
        } = this.state;

        return (
            <div className="app">
                <SearchForm onSubmit={this.handleSearchFormValue} />
                {isLoading && (
                    <Loader
                        type="Triangle"
                        color="#00BFFF"
                        style={{ textAlign: 'center' }}
                    />
                )}
                {error && <ToastContainer autoClose={1500} />}
                {gallery.length > 0 && (
                    <Gallery
                        gallery={gallery}
                        loadMore={this.loadMore}
                        listRef={this.listRef}
                        showModal={showModal}
                        openModal={this.openModal}
                    />
                )}
                {showModal && (
                    <Modal
                        showModal={showModal}
                        image={largeImgUrl}
                        onClose={this.closeModal}
                    />
                )}
            </div>
        );
    }
}

export default App;
