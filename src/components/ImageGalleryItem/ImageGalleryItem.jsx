import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ item }) {
  const [statusModal, setStatusModal] = useState(false);
  const { id, webformatURL, largeImageURL, type } = item;

  const toggleModal = () => {
    setStatusModal(!statusModal);
  };

  return (
    <>
      <li key={id} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImage}
          // id={id}
          src={webformatURL}
          alt={type}
          onClick={toggleModal}
        />
      </li>
      {statusModal && (
        <Modal onClose={toggleModal} image={largeImageURL}>
          <img src={largeImageURL} alt="largeImage" />
        </Modal>
      )}
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
