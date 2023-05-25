import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { FetchAPI } from './Service/Fetch-api';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [failedRequest, setFailedRequest] = useState(false);

  const handleFormSubmit = async failedRequest => {
    setIsLoading(true);
    setFailedRequest(failedRequest);

    try {
      const response = await FetchAPI(failedRequest);
      if (response.length === 0) {
        setFailedRequest(true);
        toast.error('Nothing found!');
      } else setHits(response);
      setFailedRequest(false);
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    setPage(page + 1);

    try {
      const response = await FetchAPI(failedRequest, page + 1);
      setHits([...hits, ...response]);
    } catch (error) {
      setError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  // const { isLoading, error, hits } = this.state;

  return (
    <>
      <div className={css.App}>
        {error && <p>something went wrong: {error.message}</p>}
        <Searchbar onSubmit={handleFormSubmit} />
        {isLoading && <Loader />}
        <ImageGallery imageData={hits} />
        {hits.length > 11 && <Button onClick={handleLoadMore} />}
        <ToastContainer />
      </div>
    </>
  );
}
