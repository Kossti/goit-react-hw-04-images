import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { FetchAPI } from './Service/Fetch-api';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    hits: [],
    page: 1,
    isLoading: false,
    error: null,
    failedRequest: false,
  };

  handleFormSubmit = async searchQuery => {
    this.setState({ isLoading: true, searchQuery });

    try {
      const response = await FetchAPI(searchQuery);
      if (response.length === 0) {
        this.setState({ failedRequest: true });
        toast.error('Nothing found!');
      } else this.setState({ hits: response, failedRequest: false });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    const { page, searchQuery } = this.state;

    this.setState({
      isLoading: true,
      page: page + 1,
    });

    try {
      const response = await FetchAPI(searchQuery, page + 1);
      this.setState(prevState => ({
        hits: [...prevState.hits, ...response],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, error, hits } = this.state;

    return (
      <>
        <div className={css.App}>
          {error && <p>something went wrong: {error.message}</p>}
          <Searchbar onSubmit={this.handleFormSubmit} />
          {isLoading && <Loader />}
          <ImageGallery imageData={hits} />
          {hits.length > 11 && <Button onClick={this.handleLoadMore} />}
          <ToastContainer />
        </div>
      </>
    );
  }
}
